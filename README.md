# Global Chrono static site

A standalone React + Vite static site for testing NEO App automatic builds. It has the same root-level deployment shape as a typical Vite repository and reproduces the Global Chrono interface from `demo-app-2`.

## Local verification

```bash
npm ci
npm run build
npm run preview
```

## NEO App settings

- App type: Web Service / static site detected automatically
- Repository root: this directory (leave Root Directory blank when it is the repository root)
- Build method: Automatic / Railpack
- Build command: leave blank (detected as `npm run build`)
- Publish/output directory: leave blank if auto-detected; otherwise use `dist`
- Environment variables: none
- Health-check path: `/`

The build output is static and does not require a database, queue, object storage, secrets, or a runtime port setting.
