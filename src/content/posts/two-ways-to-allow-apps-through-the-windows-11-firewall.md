---
title: Two Ways to Allow Apps Through the Windows 11 Firewall
published: 2026-01-28T00:00:00.000Z
tags:
- Windows 11
- Firewall
- Privacy
category: Windows
description: "Windows 11 firewall blocking your app? Here’s a real tutorial with
  clicks and PowerShell commands that actually work. No fluff, just fixes."
draft: false
toc: true
pin: 0

author: Your Name
---
Let me be honest. If you Googled “Windows 11 firewall blocked my app”, you’re probably already annoyed 😤 The app is legit. Your internet is fine. But Windows is acting like an overprotective desi uncle at a wedding.

So yeah, this post is a proper tutorial. Not vibes-only. Not theory. Actual steps that help you unblock apps properly, including PowerShell commands that save your sanity. I’ve used all of this myself, for dev tools, servers, games, Zoom, random apps that Windows randomly hates.

Let’s get into it 👇

***

## First, Why Windows Firewall Blocks Apps in the First Place 🤔

Quick context, because it matters. Windows Defender Firewall controls which apps can send or receive network traffic. If an app doesn’t already have a rule, Windows blocks it by default.

This usually hits when:

* You install a new app&#x20;
* You run a local server&#x20;
* You use dev tools&#x20;
* You move an app to a new folder&#x20;
* Windows updates and forgets everything (classic)&#x20;

Now, here’s how I fix it.

***

## Method 1: Allow an App Through Firewall Using the UI

This is the fastest way for most people.

1. Open **Windows Security.** Just search it in Start.&#x20;
2. Click **Firewall & network protection.**
3. Click **Allow an app through firewall.**
4. Click **Change settings.**  Admin permission popup will appear, let it cook.&#x20;
5. Find your app in the list and tick it. If it’s not there, click **Allow another app** and browse to the app’s `.exe` file.&#x20;
6. Choose where the app is allowed:&#x20;

   * **Private** for home or work WiFi&#x20;
   * **Public** only if you really trust the app&#x20;
7. Click **OK**&#x20;

Restart the app after this. Seriously, do not skip that. For most normal apps, this is enough. Sweet as. Job done.

***

## Method 2: Allow an App Through Firewall Using PowerShell

Now we’re getting into the good stuff. I use this when:

* The app doesn’t show in the firewall list&#x20;
* I’m running dev tools or servers&#x20;
* I want a clean, explicit firewall rule&#x20;
* Windows is being stubborn&#x20;

### Step 1: Open PowerShell as Admin

* Press Start&#x20;
* Search **PowerShell**&#x20;
* Right click&#x20;
* Click **Run as administrator**&#x20;

If it’s not admin, the command won’t work. No shortcuts here.

### Step 2: Create a Firewall Rule (This Is the Key Command)

Here’s a real example using Zoom 👇

```
New-NetFirewallRule -DisplayName "Zoom" -Direction Inbound -Program "C:\Users\UserProfile\AppData\Roaming\Zoom\bin\Zoom.exe" -Action Allow -Profile Private,Public
```

What this does, in human language:

* Creates a new firewall rule&#x20;
* Allows inbound network traffic&#x20;
* Targets the exact app executable&#x20;
* Allows it on Private and Public networks&#x20;

Important tip, make sure the app path is correct. If the path is wrong, Windows will happily create a useless rule.

### Step 3: Check If the Rule Exists (Always Verify)

I always run this next.

```
Get-NetFirewallRule -DisplayName "Zoom"
```

If the rule exists, PowerShell will show it. If nothing shows up, something went wrong. Double check the name and try again.

### Step 4: Remove the Rule (If You Messed Up or Changed Your Mind)

Yep, you can clean it up too.

```
Remove-NetFirewallRule -DisplayName "Zoom"
```

This deletes the rule completely. Handy if you added the wrong path or want to lock the app down again.

***

## Private vs Public Profiles, Real Talk 🛜

This bit actually matters.

* **Private** is for home WiFi, work WiFi, personal hotspots&#x20;
* **Public** is for cafés, airports, libraries, dodgy free WiFi&#x20;

If you’re unsure, start with Private only. You can always add Public later.

I usually allow dev tools on Private only. No need to go full YOLO.

***

## Things That Have Tripped Me Up Before 😵

Learn from my pain.

* Firewall changes don’t always apply until the app restarts&#x20;
* Some apps need both inbound and outbound rules&#x20;
* Antivirus can block apps separately from the firewall&#x20;
* Windows updates sometimes reset rules quietly&#x20;

If something randomly stops working after an update, firewall is always my first suspect.

***

## Final Thoughts, From One Windows User to Another 🤝

Windows 11 firewall isn’t bad, it’s just badly explained. Once you know both methods, the UI for quick fixes and PowerShell for full control, you’re sorted. No more reinstalling apps. No more blaming your router. No more yelling “bro it worked yesterday”.

Save this post. Future you will thank you. Now go unblock your app, grab a chai or a flat white, and get back to building stuff 🚀
