import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Loader from './Utils/Loader.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Stage from './Stage.js'

let instance = null

export default class Player {
    constructor(container, canvas, config = Player.getFallback()) {
        // Singelton
        if (instance) return instance
        instance = this

        // Canvas
        this.canvas = canvas

        // Test config
        this.source = config.source

        // Setup
        this.debug = new Debug(config.source)
        this.sizes = new Sizes(container)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.loader = new Loader(config.source)
        this.camera = new Camera(config.camera)
        this.renderer = new Renderer(config.renderer)
        this.stage = new Stage(config)

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        // Debug mode
        /* if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Player" })
            this.debugFolder.addButton({ title: "Function" }).on('click', () => console.log("defun"))
        } */
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.stage.update()
        this.renderer.update()
    }

    load(config) {
        if(this.debug.active) this.debug.load(config.source)
        this.loader.startLoading(config.source)
        this.camera.setParameters(config.camera)
        this.renderer.setParameters(config.renderer)
        this.stage.setParameters(config)
    }

    static getFallback() {
        return {
            source: {
                name: "fallback"
            },
            camera: {
                fov: 35,
                position: { x: 5, y: 3, z: 5 },
                target: { x: 0, y: 0, z: 0 },
                canZoom: false,
                canRotate: true,
                autoRotate: false,
                autoRotateSpeed: 2.0
            },
            renderer: {
                toneMapping: "Linear",
                toneMappingExposure: 1.0,
                alpha: false,
                background: "#222222"
            },
            lighting: {
                directionalLightColor: "#ffffff",
                directionalLightIntensity: 1.0,
                ambientLightColor: "#ffffff",
                ambientLightIntensity: 1.0
            },
            model: {
                playAnimation: false,
                animationSpeed: 1.0
            }
        }
    }
}