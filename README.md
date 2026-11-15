# Prashant Gothankar — Portfolio Website

A responsive, cinematic portfolio website built with HTML, CSS and JavaScript. GSAP + ScrollTrigger power reveal animations; Lenis provides smooth scrolling when its CDN is available. The site still works without those animation libraries.

## 1. Add your images

Put the following files inside the `assets` folder:

- `prashant-cutout.png` — transparent-background portrait used in the opening intro.
- `portfolio-images-01.jpg` through `portfolio-images-18.jpg` — your 18 portfolio images.

Keep the filenames exactly as written. The portfolio images can have different dimensions; they are cropped to fit the editorial grid and open at full size in the lightbox.

## 2. Run locally

Open `index.html` in a modern browser. For best results, use VS Code with the **Live Server** extension and click **Go Live**.

## 3. Deploy with GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the complete `assets` folder.
3. Open **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to publish the site.

## 4. Personalise

- Replace `assets/prashant-cutout.png` with your transparent PNG portrait.
- Replace the 18 JPGs with your own work, preserving the filenames.
- Update the About section copy in `index.html` if you want a different bio.
- Instagram and WhatsApp links are already configured. The WhatsApp link includes a pre-filled English inquiry message.

## Notes

- External fonts and animation libraries load from CDNs, so an internet connection is needed for those enhancements.
- The provided Google Drive folder could not be inspected for individual image files in this build. Add the image files locally as described above.
- For a fast, reliable portfolio, export web-ready JPGs (roughly 1600–2200px on the long edge, quality 80–88) and compress the transparent portrait PNG.
