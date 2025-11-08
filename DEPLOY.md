# Deployment Guide for GitHub Pages

Follow these steps to deploy your Creature Builder game to GitHub Pages:

## Step 1: Initialize Git Repository (if not done)

```bash
git init
git add .
git commit -m "Initial commit: Creature Builder game"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, select "New repository"
3. Name it `kidgame` (or any name you prefer)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/kidgame.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Enable GitHub Pages

### Option A: Using GitHub Actions (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source", select **"GitHub Actions"**
5. Save the settings

The workflow will automatically deploy when you push to the `main` branch.

### Option B: Using Static Site (Alternative)

If GitHub Actions doesn't work:

1. Go to **Settings** → **Pages**
2. Under "Source", select **"Deploy from a branch"**
3. Select branch: **main** (or **master**)
4. Select folder: **/ (root)**
5. Click **Save**

## Step 5: Verify Deployment

1. After pushing, wait 1-2 minutes for GitHub Actions to run
2. Go to **Settings** → **Pages**
3. Your site will be available at: `https://YOUR_USERNAME.github.io/kidgame/`

## Troubleshooting

### If you get "Pages site not found" error:

1. **Check repository visibility**: Make sure the repository is public (or you have GitHub Pro for private repos)
2. **Enable Pages manually**: Go to Settings → Pages and enable it
3. **Check workflow**: Go to the "Actions" tab and see if the workflow ran successfully
4. **Wait a few minutes**: First deployment can take 5-10 minutes

### If GitHub Actions fails:

1. Go to the **Actions** tab in your repository
2. Click on the failed workflow
3. Check the error message
4. Common issues:
   - Pages not enabled: Enable it in Settings → Pages
   - Wrong branch name: Make sure you're using `main` or `master`
   - Permissions: Make sure the workflow has the right permissions

### Manual Deployment (if Actions don't work):

1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Choose `main` branch and `/ (root)` folder
4. Click Save

## Quick Commands Reference

```bash
# Initialize and commit
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kidgame.git
git branch -M main
git push -u origin main

# For future updates
git add .
git commit -m "Update game"
git push
```

## Your Game URL

Once deployed, your game will be available at:
- `https://YOUR_USERNAME.github.io/kidgame/`
- Or if repository name is different: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`

