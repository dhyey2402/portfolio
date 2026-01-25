# Portfolio Hosting Guide

This guide will help you host your portfolio website for free using various platforms.

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com) and sign up if you don't have an account

### Step 2: Create a New Repository
1. Click the "+" icon in the top right → "New repository"
2. Repository name: `portfolio` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 3: Push Your Code to GitHub

Run these commands in your terminal (in the Portfolio folder):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - Portfolio website"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

**Note:** It may take a few minutes for the site to go live.

---

## Option 2: Netlify (Free - Drag & Drop)

### Steps:
1. Go to [netlify.com](https://www.netlify.com) and sign up
2. Drag and drop your entire Portfolio folder onto Netlify
3. Your site will be live instantly with a random URL
4. You can customize the domain name in settings

**Advantages:**
- Instant deployment
- Free custom domain support
- Automatic HTTPS

---

## Option 3: Vercel (Free - Great Performance)

### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository (or drag & drop)
4. Deploy automatically

**Advantages:**
- Fast global CDN
- Automatic deployments on git push
- Free SSL certificate

---

## Option 4: Cloudflare Pages (Free - Fast CDN)

### Steps:
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up with Cloudflare
3. Connect your GitHub repository or upload files
4. Deploy

**Advantages:**
- Fast global network
- Free custom domains
- Great performance

---

## Quick Setup Script

If you want to use GitHub Pages, I can help you set it up right now. Just let me know your GitHub username and I'll guide you through the commands!

---

## After Hosting

### Custom Domain (Optional)
All platforms above support custom domains:
- Buy a domain from Namecheap, GoDaddy, or Google Domains
- Follow platform-specific instructions to connect it

### Updating Your Site
- **GitHub Pages**: Just push new changes with `git push`
- **Netlify/Vercel**: Auto-deploys when you push to GitHub, or drag & drop new files

---

## Need Help?

If you encounter any issues, let me know and I'll help you troubleshoot!
