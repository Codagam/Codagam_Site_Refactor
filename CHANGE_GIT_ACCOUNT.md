# How to Change Git Account

## Method 1: Change Git User Identity (user.name and user.email)

### For Global (All Repositories):

```powershell
git config --global user.name "Your New Name"
git config --global user.email "your.new.email@example.com"
```

### For This Repository Only:

```powershell
git config user.name "Your New Name"
git config user.email "your.new.email@example.com"
```

### Verify Changes:

```powershell
git config --global user.name
git config --global user.email
```

---

## Method 2: Change GitHub Credentials (Windows)

### Step 1: Remove Old GitHub Credentials from Windows Credential Manager

1. Open **Windows Credential Manager**:

   - Press `Win + R`
   - Type: `control /name Microsoft.CredentialManager`
   - Or search "Credential Manager" in Start Menu

2. Go to **Windows Credentials** tab

3. Find entries like:

   - `git:https://github.com`
   - `github.com`

4. Click on each and select **Remove**

### Step 2: Remove Credentials via Command Line

```powershell
# List all credentials
cmdkey /list

# Remove GitHub credentials (replace with actual credential name)
cmdkey /delete:git:https://github.com
```

### Step 3: Next Push Will Prompt for New Credentials

When you push next time, Git will prompt for:

- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

### Step 4: Create Personal Access Token (if needed)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use this token as your password when pushing

---

## Method 3: Use SSH Instead of HTTPS

### Step 1: Generate SSH Key

```powershell
ssh-keygen -t ed25519 -C "your.email@example.com"
```

### Step 2: Add SSH Key to GitHub

1. Copy public key: `cat ~/.ssh/id_ed25519.pub`
2. GitHub → Settings → SSH and GPG keys → New SSH key
3. Paste the key

### Step 3: Change Remote URL to SSH

```powershell
git remote set-url origin git@github.com:username/repository.git
```

---

## Quick Fix for Current Issue

To change to a different GitHub account right now:

```powershell
# 1. Set your git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Remove old credentials
cmdkey /delete:git:https://github.com

# 3. Change remote URL (if needed)
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 4. Next push will ask for new credentials
git push -u origin main
```

---

## Verify Current Configuration

```powershell
# Check git user info
git config --global user.name
git config --global user.email

# Check remote URL
git remote -v

# Check stored credentials
cmdkey /list | Select-String "git"
```
