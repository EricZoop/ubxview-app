<h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="ubxview/frontend/public/assets/dot.png" alt="Logo" height="32">
  UBXView
</h1>

*Model real-time kinematic (RTK) drone-mounted sensors for radar calibration workflows, powered by u-center.* 

## Dependencies
> [Rust](https://www.rust-lang.org/) - Backend, Tauri .exe compiler<br>
> [Node.js](https://nodejs.org/) - three.js render engine, I/O<br>
> [Vite](https://vite.dev/) - Frontend <br>
> [xyzservices](https://pypi.org/project/xyzservices/) - Satellite images <br>
> [u-center](https://www.u-blox.com/en/product/u-center) - GPS utility<br>

## Get Running

```ps1
git clone https://github.com/EricZoop/ubxview-app.git
cd ubxview-app

cd ubxview
npm install 

cd frontend
npm install

cd ..
npm run tauri dev

npm run tauri build
```

### Directory Structure
```txt
ubxview-app/
    ├── README.md
    ├── data/
    │   ├── drone/
    │   │   ├── dronerun123.ubx
    │   │   ├── output.ubx
    │   │   ├── trackstat.py
    │   │   ├── simulate.py
    │   └── satellite/
    │       ├── compress.py
    │       └── satellite.py
    └── ubxview/
        ├── package.json
        ├── frontend/
        │   ├── index.html
        │   ├── package.json
        │   ├── vite.config.js
        │   └── src/
        │       ├── cameraControls.js
        │       ├── compassRose.js
        │       ├── fileManager.js
        │       ├── gridSetup.js
        │       ├── imagePlane.js
        │       ├── main.js
        │       ├── parser.js
        │       ├── planeData.js
        │       ├── plotManager.js
        │       ├── style.css
        │       ├── trailControls.js
        │       └── ui.js
        └── src-tauri/
            ├── build.rs
            ├── Cargo.toml
            ├── tauri.conf.json
            ├── capabilities/
            │   └── default.json
            └── src/
                ├── lib.rs
                └── main.rs
```
