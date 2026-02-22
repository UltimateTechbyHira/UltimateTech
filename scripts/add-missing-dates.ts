import { execSync } from 'node:child_process'
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

  // Get Git creation date (first commit) in ISO 8601 format
  let creationDate: string
  try {
    const gitDate = execSync(
      `git log --follow --format=%aI --reverse "${filePath}" | head -1`,
      { encoding: 'utf8' },
    ).trim()
    creationDate = gitDate || new Date().toISOString()
  }
  catch {
    creationDate = new Date().toISOString()
  }

  console.log(`  📅 Git creation date: ${creationDate}`)

  // Parse frontmatter into lines and build a clean version
  const lines = frontmatter.split('\n')
  const cleanedLines: string[] = []
  let hasPublished = false
  let hasPubDatetime = false
  let hasAuthor = false
  let needsFix = false

  for (const line of lines) {
    const trimmedLine = line.trim()

    // Skip empty lines at the start
    if (!trimmedLine && cleanedLines.length === 0) {
      continue
    }

    // Check for 'published' field
    const publishedValue = trimmedLine.startsWith('published:') ? trimmedLine.slice(10).trim() : null
    const pubDatetimeValue = trimmedLine.startsWith('pubDatetime:') ? trimmedLine.slice(12).trim() : null
    const authorValue = trimmedLine.startsWith('author:') ? trimmedLine.slice(7).trim() : null

    if (publishedValue !== null) {
      console.log(`  🔍 Found 'published' field`)

      if (hasPublished) {
        console.log(`  ❌ Removing duplicate 'published' field`)
        needsFix = true
        continue
      }

      const existingDate = publishedValue.replace(/^['"]|['"]$/g, '')

      if (!existingDate.includes('T') || publishedValue.startsWith('\'') || publishedValue.startsWith('"')) {
        console.log(`  🔧 Fixing published date format: ${publishedValue} -> ${creationDate}`)
        cleanedLines.push(`published: ${creationDate}`)
        needsFix = true
      }
      else {
        console.log(`  ✅ Date format is correct`)
        cleanedLines.push(line)
      }

      hasPublished = true
    }
    else if (pubDatetimeValue !== null) {
      console.log(`  🔍 Found 'pubDatetime' field`)

      if (hasPubDatetime) {
        console.log(`  ❌ Removing duplicate 'pubDatetime' field`)
        needsFix = true
        continue
      }

      const existingDate = pubDatetimeValue.replace(/^['"]|['"]$/g, '')

      if (!existingDate.includes('T') || pubDatetimeValue.startsWith('\'') || pubDatetimeValue.startsWith('"')) {
        console.log(`  🔧 Fixing pubDatetime date format: ${pubDatetimeValue} -> ${creationDate}`)
        cleanedLines.push(`pubDatetime: ${creationDate}`)
        needsFix = true
      }
      else {
        console.log(`  ✅ Date format is correct`)
        cleanedLines.push(line)
      }

      hasPubDatetime = true
    }
    else if (authorValue !== null) {
      console.log(`  👤 Found 'author' field`)
      cleanedLines.push(line)
      hasAuthor = true
    }
    else {
      // Keep other fields as-is
      cleanedLines.push(line)
    }
  }

  // Add 'published' if it doesn't exist (and pubDatetime doesn't exist either)
  if (!hasPublished && !hasPubDatetime) {
    console.log(`  ➕ Adding missing 'published' field`)
    cleanedLines.push(`published: ${creationDate}`)
    needsFix = true
  }

  // Add 'author' if it doesn't exist
  if (!hasAuthor) {
    console.log(`  ➕ Adding missing 'author' field`)
    cleanedLines.push(`author: Harman Singh Hira`)
    needsFix = true
  }

  if (needsFix) {
    console.log(`  💾 Writing fixes to file...`)
    // Rebuild frontmatter ensuring no extra blank lines at start
    const newFrontmatter = cleanedLines.join('\n').trim()
    const newContent = `---\n${newFrontmatter}\n---${body}`
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`  ✅ File updated successfully`)
  }
  else {
    console.log(`  ✅ No changes needed`)
  }
}

// Process content directory
const contentDirs = ['src/content/posts', 'src/content/blog']
console.log('🔍 Starting to scan for markdown files...\n')
for (const dir of contentDirs) {
  console.log(`\n📁 Checking directory: ${dir}`)
  if (fs.existsSync(dir)) {
    processMarkdownFiles(dir)
  }
}

console.log('\n✨ Date adding process complete!')
