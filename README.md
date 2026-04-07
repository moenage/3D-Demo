# 3D Service Viewer

An interactive 3D part inspection viewer built with Three.js and Vite.

**Live demo:** https://moenage.github.io/3D-Demo/

## Features
- Load and render a high-poly GLTF/GLB model in the browser
- Click individual parts to inspect service status and maintenance data
- Hover highlighting via raycasting
- Orbit controls — drag to rotate, scroll to zoom
- Color-coded status indicators (Nominal / Inspect / Warning)

## Tech
- [Three.js](https://threejs.org/) — 3D rendering
- [Vite](https://vitejs.dev/) — dev server and build tool
- GLTF/GLB format with Draco compression support

## Model Credit
Car Concept model by Khronos Group, sourced from the
[glTF Sample Assets repository](https://github.com/KhronosGroup/glTF-Sample-Assets)
under the Creative Commons Attribution 4.0 International license.

## Run locally
```bash
npm install
npm run dev
```
