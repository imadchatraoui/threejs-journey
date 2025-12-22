# ✦ Three.js Journey

![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000?style=for-the-badge&logo=vercel&logoColor=white) ![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

## 🎓 Lesson 13: Go Live

This lesson focuses on taking our WebGL experiences from a local environment to the production web, allowing the world to interact with our 3D scenes.

> **Source:** [Three.js Journey — Lesson 13: Go Live](https://threejs-journey.com/lessons/go-live)  
> **Instructor:** [Bruno Simon](https://bruno-simon.com)

### 📌 Key Takeaways
- **Build Process**: Understanding how to compile the project (HTML, CSS, JS assets) for production using `npm run build`.
- **Modern Hosting**: Utilizing **Vercel** for seamless deployment and continuous integration, as opposed to traditional FTP methods.
- **CLI Deployment**: Setting up the Vercel CLI locally to deploy updates with a single command (`npm run deploy`).
- **Alternative Platforms**: Mentions of other robust static hosting solutions like Netlify and GitHub Pages.

## 🚀 Deployment Instructions

To deploy this project using Vercel (as recommended in the lesson):

1. **Install Vercel CLI**
   ```bash
   npm install vercel
   
2. **Add Deploy Script Update your package.json to include**
   ```bash
   "scripts": {
   "deploy": "vercel --prod"
   ...
   }
3. **Deploy to Production**
   ```bash
    npm run deploy
  
