# WebGL Player

```
npm install
npm run dev
```

# Setup the Player
A player object has three parameters:
- canvas container (div)
- HTML canvas
- configuration file (a JSON file, with the required values as seen in the example above)

```js
const config = await loadConfiguration("https://test-files.vercel.app/elefant.json")
const container = document.querySelector('.canvas-container')
const canvas = document.querySelector('canvas.webgl')

const player = new Player(container, canvas, config)
```

When the JSON file fail to fetch, the application will use a fallback configuration.

# Structure of a JSON config file

```JSON
{
    "source": {
        "name": "sziv",
        "type": "gltfModel",
        "path": "https://test-files.vercel.app/sziv.glb"
    },
    "camera": {
        "fov": 35,
        "position": { "x": 0, "y": 20, "z": 32 },
        "target": { "x": 0, "y": 9.5, "z": 0 },
        "canZoom": false,
        "canRotate": true,
        "autoRotate": true,
        "autoRotateSpeed": 2.0
    },
    "renderer": {
        "toneMapping": "ACESFilmic",
        "toneMappingExposure": 1.75,
        "alpha": true,
        "background": "#222222"
    },
    "lighting": {
        "directionalLightColor": "#ffffff",
        "directionalLightIntensity": 1.0,
        "ambientLightColor": "#ffffff",
        "ambientLightIntensity": 1.0
    },
    "model": {
        "playAnimation": true,
        "animationSpeed": 1.0
    }
}
```

# Debug mode
It can be actived with the hash `#debug`

With the debug menu, all parameters can be tweaked using a Tweakpane UI.

## Examples:

### sziv

```
https://test-files.vercel.app/sziv.json
```

### elefant

```
https://test-files.vercel.app/elefant.json
```

### sisak

```
https://test-files.vercel.app/sisak.json
```

### roka

```
https://test-files.vercel.app/roka.json
```
