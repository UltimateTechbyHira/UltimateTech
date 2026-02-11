---
title: Enable Hidden EU Privacy Settings on Windows 11 Using a Simple PowerShell Script
published: 2026-02-11T19:16:00
description: Step by step guide to unlocking EU-only privacy controls in Windows 11, based on a real setup I use on my own machine.
category: Windows
tags:
  - Windows 11
  - PowerShell
draft: false
toc: true
abbrlink: ''
pin: 0

author: Your Name
---

I ran into this because I noticed my Windows 11 privacy settings looked… incomplete. Some toggles I saw online just weren’t there for me. Turns out Windows hides certain privacy options based on your region.

This guide walks through exactly how I unlocked those EU privacy controls safely, using a PowerShell script I built after testing it myself. Nothing fancy, no guesswork, just a clean step by step flow.

### Prerequisites

Before you start, make sure you have the following:

* A Windows 11 machine (any edition)
* An internet connection
* Administrator access on your PC
* PowerShell 5.1 or newer (this is already installed on Windows 11 tho)

That’s it. No extra tools needed upfront.

### Understand what this actually does

Windows uses a registry key called `DeviceRegion` to decide which privacy options to show. If this key exists and points to a non-EU region, Windows hides GDPR-related privacy toggles.

The script does four things, in this order:

* Temporarily switches your Windows region to an EU country
* Removes the `DeviceRegion` registry key
* Restores your original region
* Opens Privacy Settings so that `DeviceRegion` registry can be added back but with EU key
* Also, you can see the unlocked options in Privacy Settings.

Nothing permanent, no background services, no data collection.

### Special thanks to: ThioJoe

I watched his video and he's the one who gave me this idea to create.

::youtube{id=MfBNxGw_5J8}

### How to do it?

#### Step 1: Open PowerShell as Administrator

This part matters. Without admin rights, the script will fail.

Do this:

1. Press `Win + X`
2. Click `Terminal (Admin)` or `Windows PowerShell (Admin)`
3. Approve the UAC prompt

You should now see a PowerShell window with admin privileges.

#### Step 2: Run the script

In the admin PowerShell window, paste this command and press Enter:

```powershell
irm https://wineu.hsinghhira.me | iex
```

What this does:

* `irm` downloads the script
* `iex` executes it directly in memory

Nothing is saved permanently unless you choose the automatic mode later.

:::tip
If this feels scary, you can inspect the script source first on GitHub before running it.
:::

#### Step 3: Choose your mode

Once the script starts, you’ll see two options.

1. Option 1: Manual Mode
2. Option 2: Automatic Mode

Here’s how I decide.

**Manual Mode:**

* Best if it’s your first time
* No antivirus issues
* You delete the registry key yourself with guidance

**Automatic Mode:**

* Faster
* Uses a trusted open source privilege tool
* Windows Defender may complain

:::tip
If you just want zero drama, pick Manual Mode.
:::

#### Step 4: Follow the on screen instructions

**Manual Mode flow:**

1. The script switches your region to Ireland
2. Registry Editor opens automatically
3. You navigate to the `DeviceRegion` key
4. You delete the key or its values
5. You return to PowerShell and continue

**Automatic Mode flow:**

1. The script handles permissions for you
2. Deletes the registry values automatically
3. Restores your original region
4. Cleans up downloaded files

:::warning
In Automatic Mode, Windows Defender may block the tool. If that happens, follow the prompts exactly and re-enable protection afterward.
:::

#### Step 5: Restart Windows

This step is technically optional, but I recommend it.

Restarting ensures:

* Windows refreshes privacy settings
* All toggles appear correctly
* No cached region data sticks around

#### Step 6: Verify the result

Things I usually check:

* Diagnostic data options are expanded
* App permission controls look more detailed
* Extra privacy toggles are available

:::note
Your region will still show your original country. That’s expected.
:::

### What to do if something fails?

If the registry key won’t delete in Manual Mode:

* Right-click the key
* Open Permissions
* Change the owner to your user
* Try again

Alternative:

* Delete all values inside `DeviceRegion` instead of the key itself

If antivirus blocks Automatic Mode:

* Temporarily disable real-time protection
* Allow the blocked file
* Re-enable protection immediately after

:::tip
If this feels annoying, switch back to Manual Mode. Same result, less stress.
:::

That’s the full process.

### To conclude

This started as a random experiment after watching a YouTube video, and now it’s part of my regular Windows setup. It’s not a hacky workaround, it’s just Windows being very region-opinionated.

If Windows updates undo it someday, I’ll just rerun the script and move on. No big deal.
