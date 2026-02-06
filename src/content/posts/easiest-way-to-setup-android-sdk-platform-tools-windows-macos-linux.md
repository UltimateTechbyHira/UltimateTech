---
title: Easiest Way to Setup Android SDK Platform Tools [Windows/MacOS/Linux]
published: 2026-02-06T23:19:00
description: Install Android SDK Platform Tools on Windows, Linux & MacOS using easiest methods. A beginner-friendly ADB and Fastboot setup guide with tips and warnings.
draft: false
toc: true
pin: 0
---

If you have ever messed around with Android beyond just tapping apps, chances are you have heard of ADB. I finally sat down and set up Android SDK Platform Tools properly on my own Windows, and honestly it is way easier than most guides make it sound 😌

In this post, I will walk you through exactly how I installed Android SDK Platform Tools step by step, what each step does, and what can go wrong if you rush it. No fluff, no dev-bro energy, just practical stuff that actually works.

This is beginner-safe, but still solid enough if you plan to flash ROMs, unbrick devices, or just yeet bloatware off your phone.

### Prerequisites

Before we start, make sure you have the following sorted.

* A Windows PC, Linux or MacOS
* Stable internet connection
* If MacOS (or Linux), then [Homebrew](https://brew.sh/).
* Basic idea of using Terminal or Command Prompt
* A bit of patience. Grab a chai or flat white ☕

That is it. No Android Studio needed, no sketchy third-party tools.

### What are Android SDK Platform Tools? (quick context)

Platform Tools is the official Google package that includes:

* `adb` (Android Debug Bridge)
* `fastboot`

These tools let you do things like:

* Boot into recovery or fastboot mode
* Flash firmware, ROMs, or recoveries
* Sideload updates
* Run shell commands and remove system apps

> [!NOTE]
> If you ever plan to root, flash, or debug Android, this tool is non-negotiable.

### Install Android SDK Platform Tools on Windows

Open up **Terminal** (Command Prompt window) and Paste below command

```bash
winget install -e --id Google.PlatformTools
```

That's it. **Restart PC** so that ADB can be updated in the System's Environment Variables.

That is it. Platform Tools is installed on Windows.

### Install Android SDK Platform Tools on MacOS

Open Terminal and run:

```bash
brew install android-platform-tools
```

That’s it. No ZIP files. No PATH drama.

If the command is not found, close and reopen Terminal, or reload your shell config. A system restart is rarely needed.

> [!NOTE]
> If Homebrew is not installed then install using:
> `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

That is it. Platform Tools is installed on MacOS.

### Install Android SDK Platform Tools on Linux

Now, installing Android SDK Platform Tools on Linux system depends on distro. Easiest is again is Homebrew (the same package manager from macOS) works on Linux too via Linuxbrew.

#### Install using Homebrew

```bash
brew install --cask android-platform-tools
```

:::warning
Homebrew on Linux (aka Linuxbrew) **does not support every Linux distro**. Homebrew works best on:

* Ubuntu (most LTS versions)
* Debian
* Fedora
* CentOS / Rocky Linux / AlmaLinux
* Arch Linux
  :::

#### For Debian/Ubuntu-based Linux:

Open up terminal and paste below command:

```bash
sudo apt update && sudo apt install android-tools-adb android-tools-fastboot
```

#### Fedora based Linux:

Open up terminal and paste below command:

```bash
sudo dnf install android-tools
```

#### For Arch Linux:

Open up terminal and paste below command:

```bash
sudo pacman -S android-tools
```

#### For OpenSUSE Linux:

Open up terminal and paste below command:

```bash
sudo zypper install android-tools
```

#### For NixOS Linux:

Open up terminal and paste below command:

```bash
nix-env -iA nixos.androidsdkplatformtools
```

#### Install via Snapcraft:

Open up terminal and paste below command:

```bash
sudo snap install android-platform-tools
```

In order to enable the full featureset you will have to grant permissions to this Snap:

```bash
sudo snap connect android-platform-tools:adb-support

sudo snap connect android-platform-tools:block-devices

sudo snap connect android-platform-tools:raw-usb

sudo snap connect android-platform-tools:removable-media
```

Creating system-wide aliases is also possible:

```bash
sudo snap alias android-platform-tools.adb adb

sudo snap alias android-platform-tools.fastboot fastboot
```

:::warning
Snap packages are **sandboxed**. ADB needs low-level USB access, and sandboxing can break that in subtle ways.
:::

### Verify if ADB & Fastboot is working

Once you are done with the installation, you can check the installed version of adb using the following command:

```bash
adb --version
fastboot version
```

If everything is set up correctly, you will see the ADB version info.
