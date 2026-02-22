import fs from 'node:fs'
import path from 'node:path'

function processMarkdownFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`)
    return
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)

    if (file.isDirectory()) {
      processMarkdownFiles(fullPath)
    }
    else if (file.name.endsWith('.md')) {
      processFile(fullPath)
    }
  }
}

function processFile(filePath: string) {
  console.log(`\nProcessing: ${filePath}`)
  const content = fs.readFileSync(filePath, 'utf8')

  // Check if file has frontmatter
  if (!content.startsWith('---')) {
    console.log(`  ⏭️  No frontmatter found, skipping`)
    return
  }

  const frontmatterEnd = content.indexOf('---', 3)
  if (frontmatterEnd === -1) {
    console.log(`  ⏭️  Malformed frontmatter, skipping`)
    return
  }

  const frontmatter = content.substring(3, frontmatterEnd)
  const body = content.substring(frontmatterEnd + 3)

  // Process frontmatter line by line
  const lines = frontmatter.split('\n')
  const cleanedLines: string[] = []
  let needsFix = false

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Skip empty lines at the start
    if (!trimmedLine && cleanedLines.length === 0) {
      continue
    }

    // Check for published, modDatetime, or pubDatetime fields
    const dateMatch = trimmedLine.match(/^(published|pubDatetime|modDatetime):(.*)$/)

    if (dateMatch) {
      const fieldName = dateMatch[1]
      const rawValue = dateMatch[2].trim()

      // Remove quotes if present
      const dateValue = rawValue.replace(/^['"]|['"]$/g, '')

      // Skip empty date values
      if (!dateValue || dateValue === '') {
        console.log(`  🗑️  Removing empty ${fieldName} field`)
        needsFix = true
        continue
      }

      // Check if date has timezone offset (e.g., +13:00, -05:00)
      if (dateValue.match(/[+-]\d{2}:\d{2}$/)) {
        console.log(`  🔧 Converting ${fieldName} from timezone format to UTC`)
        console.log(`     Old: ${dateValue}`)

        try {
          // Parse the date and convert to UTC
          const date = new Date(dateValue)
          const utcDate = date.toISOString()

          console.log(`     New: ${utcDate}`)
          cleanedLines.push(`${fieldName}: ${utcDate}`)
          needsFix = true
        }
        catch (e: any) {
          console.log(`     ⚠️  Error parsing date, keeping original: ${e.message}`)
          cleanedLines.push(line)
        }
      }
      else {
        // Date is already in correct format or doesn't need conversion
        cleanedLines.push(line)
      }
    }
    else {
      // Keep other fields as-is
      cleanedLines.push(line)
    }
  }

  if (needsFix) {
    console.log(`  💾 Writing date format fixes to file...`)
    const newFrontmatter = cleanedLines.join('\n').trim()
    const newContent = `---\n${newFrontmatter}\n---${body}`
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`  ✅ File updated successfully`)
  }
  else {
    console.log(`  ✅ No date format changes needed`)
  }
}

// Process content directories
const contentDirs = ['src/content/posts', 'src/content/blog']
console.log('🔍 Starting date format check...\n')
for (const dir of contentDirs) {
  console.log(`\n📂 Checking directory: ${dir}`)
  if (fs.existsSync(dir)) {
    processMarkdownFiles(dir)
  }
}

console.log('\n✨ Date format fixing complete!')
