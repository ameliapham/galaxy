<img width="1883" height="908" alt="Screenshot 2026-01-13 at 15 17 48" src="https://github.com/user-attachments/assets/a4d5b6c9-591f-4a7a-97b6-f400e58586cc" />

#  Galaxy Generator

This repository contains a small Three.js learning project focused on building and animating a galaxy-like particle system using BufferGeometry.

<br/>

## 🌐 Demo
For a live experience, visit my [online demo](https://amelia-galaxy.vercel.app/).

<br/>

## ⭐ What this project does

- Creates a particle system using `THREE.BufferGeometry`
- Manually manage positions and colors per vertex
- Generate a spiral galaxy structure using math-based distribution
- Animate the galaxy with smooth rotation
- Interpolate colors from the center to the edges using `lerp`
- Control parameters in real time via a GUI

<br/>

## ⭐ Core concepts

### 🌀 Galaxy Features

- Configurable number of particles
- Adjustable galaxy radius and branches
- Spin direction and speed control
- Randomness with power-based distribution (for natural-looking dispersion)
- Color gradient from inner core to outer edges
- Additive blending for a glowing, space-like effect

<br/>

### 🎛️ GUI Controls

The project includes a GUI (using lil-gui) that allows real-time tweaking of key parameters. Any change in the GUI regenerates the galaxy instantly, making experimentation fast.

<br/>

### 🎶 Audio

An ambient audio track generated with AI (Suno) is included to complement the visual experience.
The audio is not required for the galaxy to function. It is intended purely as an atmospheric enhancement. Audio playback can be enabled or disabled depending on the context

<br/>

## 🛠️ Tech stack
- ThreeJS
- TypeScript
- lil-gui
- Vite
- Yarn

<br/>


## 🛠️ Getting started

Install dependencies.
`yarn`

Start the development server.
`yarn dev`

<br/>

## 📩 Get in Touch
- **Email:** [pham@ameliart.fr](mailto:pham@ameliart.fr)
- **LinkedIn:** [My LinkedIn](https://www.linkedin.com/in/amelia-huong-pham/)

<br/>

## 📜 Licence
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
