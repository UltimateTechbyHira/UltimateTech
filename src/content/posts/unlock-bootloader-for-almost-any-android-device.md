---
title: Unlock Bootloader for Almost any Android Device
published: 2026-02-16T18:45:00
description: Unlock your Android bootloader safely with this beginner-friendly guide. Includes manufacturer methods, risks, prerequisites, and exact commands.
category: Android
tags:
  - Android
  - Bootloader
draft: false
toc: true
abbrlink: ''
pin: 0

author: Harman Singh Hira
---

So you want to unlock your Android bootloader? Maybe you're eyeing custom ROMs, thinking about rooting with Magisk, or just want full control over your device. Whatever the reason, unlocking the bootloader is your first step into proper Android customization.

I've done this on multiple devices over the years, and honestly, it's not as scary as it sounds. But it does require following steps carefully and understanding what you're getting into. Let me walk you through the entire process.

## What You'll Actually Get From This

Once your bootloader is unlocked, you can:

* Install custom recoveries like TWRP or OrangeFox
* Root your device using Magisk or KernelSU
* Flash custom ROMs (LineageOS, GrapheneOS, whatever you want)
* Modify kernels for better performance or battery life
* Make deep system modifications that locked devices can't touch

## The Stuff Nobody Tells You (But Should)

Before you start, know that unlocking your bootloader comes with trade-offs:

* OTA updates might stop working properly or fail completely
* Banking apps and payment apps often detect unlocked bootloaders and refuse to work (some can be fixed with root hiding, some can't)
* Your warranty is probably void the moment you unlock (check your manufacturer's policy)

:::warning
Unlocking your bootloader **will completely wipe your device** . Everything. Photos, apps, messages, all of it. Back up anything you care about before starting. I'm not kidding about this.
:::

## Which Manufacturers Actually Let You Do This?

Not all Android devices play nice with bootloader unlocking. Here's the reality:

| Manufacturer      | Method            | Waiting Period | Things to Know                            | Success Rate |
| ------------------- | ------------------- | ---------------- | ------------------------------------------- | -------------- |
| Google Pixel      | Fastboot command  | None           | Easiest process, no restrictions          | 99%          |
| OnePlus           | Fastboot command  | None           | Straightforward, no hassle                | 95%          |
| Nothing           | Fastboot command  | None           | Smooth process                            | 90%          |
| Xiaomi/Redmi/POCO | Mi Unlock Tool    | 7-30 days      | Need Mi Account, forced waiting period    | 85%          |
| Motorola          | Unlock code       | None           | Works but shows permanent warning on boot | 80%          |
| Samsung           | Unofficial (Odin) | None           | Only Exynos chips, trips Knox permanently | 60%          |
| Huawei            | Not possible      | N/A            | Completely blocked since 2018             | 0%           |

:::important
If you bought your phone from a US carrier (Verizon, AT&T, T-Mobile), there's a good chance your bootloader is locked permanently. Carrier models are notoriously difficult or impossible to unlock. Always verify your specific model number online before attempting this.
:::

## Prerequisites

You'll need a few things ready before starting:

* **Your Android device** with at least 50% battery (seriously, don't risk it dying mid-process)
* **A decent USB cable** that actually transfers data (not just a charging cable)
* **A computer** running Windows, macOS, or Linux
* **OEM unlocking enabled** on your device ([here&#39;s how](https://ultimatetech.org/posts/enable-oem-unlocking-on-any-android-device/))
* **USB debugging enabled** on your device ([guide here](https://ultimatetech.org/posts/enable-usb-debugging-on-any-android-device/))
* **Android SDK Platform Tools** installed on your computer ([setup guide](https://ultimatetech.org/posts/easiest-way-to-setup-android-sdk-platform-tools-windows-macos-linux/))
* **USB drivers installed** as per Android device's manufacturer for Windows only ([guide here](https://ultimatetech.org/posts/complete-guide-to-installing-android-usb-drivers-on-windows-for-all-devices/))

If you haven't enabled OEM unlocking or USB debugging yet, do that first. You can't proceed without them.

## Step 1: Get Your Device Into Fastboot Mode

First, connect your phone to your computer using the USB cable.

When you plug it in, your phone will ask what type of connection you want. Select **File Transfer** (sometimes called MTP). This is important because charging-only mode won't work.

You'll also see a popup asking to allow USB debugging. Tick the box that says "Always allow from this computer" and hit OK. This saves you hassle later.

Now open a terminal or command prompt on your computer and enter below command:

```powershell
adb reboot bootloader
```

Your phone should reboot and land in Fastboot Mode. You'll see a screen that looks different from your normal Android interface, usually with some text and maybe an Android logo.

To make sure your computer can actually see your device in Fastboot Mode, run:

```powershell
fastboot devices
```

You should see your device ID show up. If nothing appears, your drivers aren't working properly or your cable is dodgy.

## Step 2: Unlock the Bootloader

This is the main event. Run this command:

```powershell
fastboot flashing unlock
```

:::note
If you have an older device (launched before 2015), you might need this command instead:

```powershell
fastboot oem unlock
```
:::

Your phone's screen will now show a confirmation message. It usually says something about voiding your warranty and wiping all your data. This is your last chance to back out.

Use the **Volume Up/Down keys** to highlight the "Unlock the bootloader" option, then press the **Power button** to confirm.

The device will now unlock and wipe itself. This takes a minute or two. Don't panic if it seems stuck, just let it do its thing.

Once it's done, your device will reboot back to Fastboot Mode. This time, you should see "Device State: Unlocked" somewhere on the screen. That's how you know it worked.

To boot back into Android, either press the Power button once (which usually selects "Start" or "Reboot") or run this command:

```
fastboot reboot
```

Your phone will boot up like it's brand new because, well, it just wiped everything. Go through the setup process again.

## Unlock Critical Partitions (If Required)

Some devices, particularly Nothing phones and Fairphones, also lock something called "critical partitions." If you're planning to flash custom ROMs or recoveries on these devices, you need to unlock those too.

:::warning
This will wipe your device **again** , so only do this right after unlocking the bootloader (while everything is already wiped) or back up your stuff first.
:::

Boot back into Fastboot Mode:

```powershell
adb reboot bootloader
```

Then run:

```powershell
fastboot flashing unlock_critical
```

You'll get another confirmation screen. Use Volume keys to select the unlock option and Power button to confirm, just like before.

Once it finishes, reboot to Android:

```powershell
fastboot reboot
```

And that's it. Both your bootloader and critical partitions are now unlocked.

## What Happens Next?

After unlocking, your device might show a warning every time it boots. This is normal and can't be removed without relocking the bootloader (which defeats the point). Some manufacturers show a brief message, others show a full-screen warning for a few seconds.

You're now free to flash custom recoveries, root your device, or install custom ROMs. Just remember that with great power comes great responsibility (and the occasional bootloop if you flash something dodgy).

If you ever want to relock your bootloader later, you can usually do it with `fastboot flashing lock`, but be aware that this will wipe your device again and might cause issues if you have custom software installed.

Stay safe, back up regularly, and have fun modding your device 🔧
