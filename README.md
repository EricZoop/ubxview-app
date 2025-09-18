<h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="ubxview/frontend/public/assets/dot-launch.png" alt="Logo" height="32">
  UBXView
</h1>

*Model real-time kinematic (RTK) GNSS mounted sensors for radar calibration workflows, powered by u-center.*

## Dependencies
> [Rust](https://www.rust-lang.org/) - Backend, Tauri .exe compiler<br>
> [Node.js](https://nodejs.org/) - three.js render engine, I/O<br>
> [Vite](https://vite.dev/) - Frontend <br>
> [xyzservices](https://pypi.org/project/xyzservices/) - Satellite images <br>
> [u-center](https://www.u-blox.com/en/product/u-center) - GPS utility<br>

## Get Running

```bash
git clone https://github.com/EricZoop/ubxview-app
cd ubxview-app

cd ubxview
npm install 

cd frontend
npm install

cd ..
npm run tauri dev

npm run tauri build
```

## Directory Glance
```rs
ubxview-app/
    ├── README.md
    ├── data/
    │   ├── drone/
    │   │   ├── dronerun123.ubx           # Captures
    │   │   ├── output.ubx
    │   │   ├── trackstat.py              # Python parser
    │   │   ├── simulate.py               # File playback
    │   └── satellite/
    │       ├── compress.py
    │       └── satellite.py              # Fetch Earth images
    └── ubxview/
        ├── package.json                  # Tauri requirements
        ├── frontend/
        │   ├── index.html                # Frontend UI
        │   ├── package.json
        │   ├── vite.config.js
        │   └── src/                      # three.js render engine 
        │       ├── main.js               # Init 3D Scene
        │       ├── parser.js             # .ubx reader & stats
        │       └── tileManager.js        # Map API
        └── src-tauri/
            ├── build.rs
            ├── Cargo.toml
            ├── tauri.conf.json
            ├── capabilities/
            │   └── default.json
            └── src/
                ├── lib.rs
                └── main.rs               # Backend runtime
```

<h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="flightgrimoire/icon.ico" alt="Logo" height="32">
  FlightGrimoire
</h1>

*Serial COM Reader + GPS Track Translator*