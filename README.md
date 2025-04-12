# Setup the Player
A player object has four parameters:
- canvas container (div)
- HTML canvas
- configuration file (a JSON file, with the required values as seen in the example below)
- a text file, where labels are translated to a given language

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

When the JSON file fails to fetch, the application will use a fallback configuration.

# Structure of a JSON config file

```JSON
{
    "source": {
        "name": "camera",
        "type": "gltfModel",
        "path": "./models/camera.glb"
    },
    "camera": {
        "fov": 35,
        "height": 0.4,
        "distance": 5.0,
        "offset": { "x": 0.2, "y": 0 },
        "canZoom": false,
        "zoomSpeed": 1.0,
        "zoomMin": 2.0,
        "zoomMax": 4.0,
        "canRotate": true,
        "sensitivity": 0.5,
        "orbitHorizontal": { "x": 180, "y": 180 },
        "orbitVertical": { "x": 30, "y": 90 },
        "autoRotate": true,
        "autoRotateSpeed": 1.5
    },
    "renderer": {
        "toneMapping": "Linear",
        "toneMappingExposure": 1.5,
        "alpha": true,
        "background": "#222222"
    },
    "lighting": {
        "directionalLightColor": "#ffffff",
        "directionalLightIntensity": 2.0,
        "ambientLightColor": "#ffffff",
        "ambientLightIntensity": 1.0
    },
    "model": {
        "playAnimation": true,
        "animationSpeed": 1.0,
        "orientation": 0.0
    },
    "styles": {
        "fontColor": "#ffffff",
        "fontSize": 0.1,
        "fontBold": true,
        "fontStroke": true
    },
    "labels": {
        "text_01": {
            "position": { "x": 1.2, "y": 0.8, "z": 0.5 }
        },
        "text_02": {
            "position": { "x": 0.6, "y": 1.2, "z": -0.3 },
            "color": "#8888ff"
        },
        "text_03": {
            "position": { "x": -0.2, "y": 1.2, "z": 0.0 }
        },
        "text_04": {
            "position": { "x": -1.3, "y": 1.0, "z": 0.1 },
            "color": "#d03636"
        }
    },
    "markers": {
        "marker_01": {
            "position": { "x": 0.3, "y": 0.3, "z": 0.6 },
            "label": "text_01"
        },
        "marker_02": {
            "position": { "x": 0.46, "y": 0.75, "z": -0.18 },
            "label": "text_02"
        },
        "marker_03": {
            "position": { "x": -0.18, "y": 0.77, "z": 0.02 },
            "label": "text_03"
        },
        "marker_04": {
            "position": { "x": -1.27, "y": 0.1, "z": 0.21 },
            "label": "text_04"
        }
    }
}
```

# Displaying text
Text positions are loaded from the config file.
When loading the scene, 3D labels are generated at the given positions.

```
config file => IDs, positions
text file => IDs, translated labels
```

Example of a text file `camera_en.json`:
```JSON
{
    "labels": {
        "text_01": "lens",
        "text_02": "viewfinder",
        "text_03": "dial",
        "text_04": "strap"
    }
}
```

# Debug mode
It can be actived with the hash `#debug`
With the debug menu, all parameters can be tweaked using a Tweakpane UI.
