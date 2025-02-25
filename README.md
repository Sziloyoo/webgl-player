# WebGL Player

```
npm install
npm run dev
```

# Setup the Player
A player object has four parameters:
- canvas container (div)
- HTML canvas
- configuration file (a JSON file, with the required values as seen in the example below)
- a text file, where labels translated to a given language

```js
import Player from "./Player/Player.js"

// HTML elements
const container = document.getElementById("container")
const canvas = document.getElementById("canvas")

// Config file
const config = await loadConfiguration("https://test-files.vercel.app/csiga/csiga.json")

// Text file
const text = await loadConfiguration("https://test-files.vercel.app/csiga/text/csiga_hu.json")

const player = new Player(container, canvas, config, text)
```

When the JSON file fail to fetch, the application will use a fallback configuration.

# Structure of a JSON config file

```JSON
{
    "source": {
        "name": "csiga",
        "type": "gltfModel",
        "path": "https://test-files.vercel.app/csiga/csiga.glb"
    },
    "camera": {
        "fov": 35,
        "position": { "x": 0.2, "y": 0.4, "z": 3 },
        "target": { "x": 0.2, "y": 0.4, "z": 0 },
        "canZoom": false,
        "canRotate": true,
        "sensitivity": 0.5,
        "orbitHorizontal": { "x": 180, "y": 180 },
        "orbitVertical": { "x": 30, "y": 90 },
        "autoRotate": false,
        "autoRotateSpeed": 2.0
    },
    "renderer": {
        "toneMapping": "Linear",
        "toneMappingExposure": 1.5,
        "alpha": true,
        "background": "#a59858"
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
    },
    "text": {
        "fontColor": "#c3b883",
        "fontSize": 0.1,
        "fontBold": true,
        "fontStroke": true,
        "lineColor": "#ffffff",
        "lineWidth": 0.1
    }
}
```

# Displaying text
Text position are loaded from the glTF file. In the glTF root a `text` object contains all label positons.
When loading the scene, 3D labels are generated to the given positions.

```
glTF file => IDs, positions
text file => IDs, translated labels
```

Example of a text file `csiga_hu.json`:
```JSON
{
    "labels": {
        "haslab": "hasláb",
        "haziko": "ház",
        "szemek": "szemek",
        "tapogatok": "tapogatók"
    }
}
```

# Debug mode
It can be actived with the hash `#debug`

With the debug menu, all parameters can be tweaked using a Tweakpane UI.

## Examples:

### sziv

```
https://test-files.vercel.app/csiga/csiga.json
```

### elefant

```
https://test-files.vercel.app/elefant/elefant.json
```

### sisak

```
https://test-files.vercel.app/sziv/sziv.json
```

### roka

```
https://test-files.vercel.app/sisak/sisak.json
```
