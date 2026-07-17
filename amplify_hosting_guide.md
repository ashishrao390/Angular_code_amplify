# AWS Amplify Hosting Guide for Angular SPAs

AWS Amplify Hosting provides a fully managed hosting service for static website frontends. This guide explains how to host this Angular application using **Continuous Deployment (Git-based)** or **Manual Upload (Drag & Drop)**.

---

## Method A: Continuous Deployment (Git-based) - RECOMMENDED
This method automatically builds and deploys your website every time you push code to your Git repository.

### Step 1: Push your project to GitHub, GitLab, or Bitbucket
If you haven't already initialized git:
1. Open a terminal in the project root directory.
2. Initialize and commit your code:
   ```bash
   git add .
   git commit -m "feat: initial commit of sample angular app"
   ```
3. Create a repository on GitHub (or your preferred host).
4. Connect and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to AWS Amplify
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Search for and open **AWS Amplify**.
3. Under the **Hosting** section, click **Create new app** or **Get Started**.
4. Select your Git provider (e.g., **GitHub**) and click **Next**.
5. Authorize AWS Amplify to access your repositories and choose your repository and branch (`main`). Click **Next**.

### Step 3: Configure Build Settings
Amplify will auto-detect your project settings. Make sure they match the following configuration:
* **App name**: `sample-amplify-app` (or your choice)
* **Environment**: `dev` (or your choice)
* **Build settings**: Click **Edit** on the build configuration if it does not match this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    # Important: Point to the compiled static assets
    baseDirectory: dist/sample-amplify-app/browser
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

> [!IMPORTANT]
> The `baseDirectory` is `dist/sample-amplify-app/browser`. Double-check this field so Amplify finds the index.html and Javascript bundles.

6. Click **Next**, review the configuration, and click **Save and deploy**.
7. AWS Amplify will provision, build, and deploy your site. Once complete, you will receive a public `amplifyapp.com` URL!

---

## Method B: Manual Deployment (Drag & Drop)
If you don't want to use Git, you can deploy a build folder directly from your local computer.

### Step 1: Create a local production build
1. Run the build command in your local project folder:
   ```bash
   npm run build
   ```
2. This creates the production-ready static files in:
   `dist/sample-amplify-app/browser`

### Step 2: Compress the output files
1. Open the output directory `dist/sample-amplify-app/browser` in your file explorer.
2. Select **all files inside** the `browser` folder (including `index.html`, `main-*.js`, `styles-*.css`, etc.).
3. Compress them into a `.zip` archive (e.g., `archive.zip`).
   > [!WARNING]
   > Make sure you zip the **contents** of the `browser` folder, not the `browser` folder itself. The file `index.html` must be at the root of the ZIP file.

### Step 3: Deploy to AWS Amplify
1. Open the **AWS Amplify Console**.
2. Click **Create new app** or **Get Started**.
3. Select **Deploy without Git provider** (or "Manual deployment") and click **Next**.
4. Enter an **App name** and **Branch/Environment name** (e.g., `prod`).
5. Choose **Drag and drop** or upload your `.zip` archive.
6. Click **Save**. Your site will be deployed instantly!

---

## Crucial SPA Redirect Configuration (For Client-Side Routing)
Since Angular is a Single Page Application (SPA), routing is handled client-side in the browser. If a user accesses a subpage directly (e.g., typing `yoursite.com/features` in the address bar or refreshing the page), the CDN will look for a physical file `/features` and return a **404 Not Found** error.

To fix this:
1. In the AWS Amplify Console sidebar, go to **App settings** > **Rewrites and redirects**.
2. Click **Manage** or **Edit**.
3. Click **Add rule** or update the existing rule to match:
   * **Source address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   * **Target address**: `/index.html`
   * **Type**: `200 (Rewrite)`
4. Click **Save**.

This tells Amplify's CDN to rewrite all page requests that don't match static file extensions back to `index.html`, letting the Angular router take over and display the correct route!
