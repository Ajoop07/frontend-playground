# React + Vite Setup Notes

##Documenting the errors I hit and what I learned, so I can refer back later.
#Last updated: 16 May 2025

# Frontend Playground Setup Notes

## Goal

Set up my first personal frontend project using:

- GitHub
- React
- Vite
- Node.js
- Git

Project folder structure:

```bash
frontend-playground/
   └── hello-world/
```

---

# Step 1 — Creating the Vite Project

Command used:

```bash
npm create vite@latest
```

## What this command does

- Downloads Vite starter setup
- Creates a modern frontend project quickly
- Helps bootstrap a React app with minimal configuration

## Why Vite?

Compared to older setups like Create React App:

- Faster startup
- Faster builds
- Better developer experience
- Modern tooling

---

# Step 2 — Node Version Error

## Error Seen

```bash
Vite requires Node.js version 20.19+ or 22.12+
current: v20.18.1
```

## What this meant

My installed Node.js version was slightly older than what latest Vite supports.

- packages depend on specific Node features
- compatibility issues can happen
- native modules may fail to install

---

# Step 3 — Rollup Native Binding Error

## Error Seen

```bash
Cannot find native binding
Cannot find module '@rollup/rollup-darwin-arm64'
```

## What this meant

Some dependencies inside Vite/Rollup were not installed correctly.

This usually happens because:

- npm install was interrupted
- Node version mismatch
- optional dependencies failed to install
- corrupted `node_modules`

## Important Concepts

### node_modules

A folder where all project dependencies are installed.

### package-lock.json

A file that locks exact dependency versions so installs are reproducible.

---

# Step 4 — Cleaning Broken Installation

Commands used:

```bash
rm -rf node_modules package-lock.json
```

## What these commands do

### rm

Remove/delete files.

### -rf

- `r` = recursive
- `f` = force

This completely deletes:

- all installed packages
- lock file

## Why we did this

To remove corrupted/incompatible dependencies and reinstall everything fresh.

---

# Step 5 — Installing nvm

## What is nvm?

`nvm` = Node Version Manager

It helps:

- install multiple Node versions
- switch between Node versions
- avoid compatibility issues between projects

Most frontend developers use it.

---

# Step 6 — Installing nvm with Homebrew

Command:

```bash
brew install nvm
```

## What is Homebrew?

A package manager for macOS.

Similar to:

- apt (Ubuntu)
- chocolatey (Windows)

It simplifies installing developer tools.

---

# Step 7 — "nvm: command not found"

## Error Seen

```bash
zsh: command not found: nvm
```

## What this meant

Although `nvm` was installed, the terminal did not know where to find it.

The shell needed configuration.

---

# Step 8 — Configuring .zshrc

Commands used:

```bash
touch ~/.zshrc
open -e ~/.zshrc
```

## What is .zshrc?

A configuration file for the zsh terminal.

It runs automatically whenever terminal opens.

Developers store:

- environment variables
- aliases
- tool paths
- shell configuration

inside this file.

---

# Step 9 — Adding nvm Configuration

Added:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"
```

## What this does

- tells terminal where nvm exists
- loads nvm whenever terminal starts
- enables nvm commands globally

---

# Step 10 — Reloading Shell Configuration

Command:

```bash
source ~/.zshrc
```

## What this means

Reload the shell configuration immediately without restarting terminal.

---

# Step 11 — Installing New Node Version

Commands:

```bash
nvm install 22
nvm use 22
```

## What this does

- downloads Node.js v22
- switches active Node version to v22

## Why this matters

Modern frontend tools evolve quickly.
Using supported Node versions avoids many package issues.

---

# Step 12 — Reinstalling Dependencies

Commands:

```bash
npm install
npm run dev
```

## npm install

Installs all project dependencies.

## npm run dev

Starts development server.

Usually opens app at:

```bash
http://localhost:5173
```

---
