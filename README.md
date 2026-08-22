# MIT App Inventor i18n — GSoC 2026

GitHub Pages-ready source for the GSoC final work product and technical handoff.

## Publish on GitHub Pages

1. Create a new public GitHub repository, for example `appinventor-i18n-gsoc-2026`.
2. Upload every file and directory from this folder to the repository root, including `.github`.
3. Open **Settings → Pages** in the GitHub repository.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to the `main` branch or run the workflow from the **Actions** tab.
6. After the workflow succeeds, GitHub displays the site URL in the deployment summary.

The included workflow installs dependencies, builds the static website, and publishes the `dist` directory automatically.

## Run locally

```bash
npm install
npm run dev
```

## Build locally

```bash
npm install
npm run build
```

The final static website is generated in `dist/`.

## Special repository name

The workflow assumes a normal project site URL:

```text
https://USERNAME.github.io/REPOSITORY/
```

If the repository itself is named `USERNAME.github.io`, change `VITE_SITE_URL` in `.github/workflows/deploy-pages.yml` to:

```yaml
VITE_SITE_URL: https://${{ github.repository_owner }}.github.io
```
