import * as THREE from 'three'
import Player from './Player'

export default class Renderer {
    constructor(params) {
        this.player = new Player()
        this.canvas = this.player.canvas
        this.sizes = this.player.sizes
        this.scene = this.player.scene
        this.camera = this.player.camera
        this.debug = this.player.debug

        this.params = params

        this.toneMappingOptions = this.createToneMappingOptions()

        this.setInstance()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Renderer" })
            this.createDebugSettings()
        }
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: this.params.alpha
        })
        this.instance.toneMapping = this.toneMappingOptions[this.params.toneMapping]
        this.instance.toneMappingExposure = this.params.toneMappingExposure
        if (!this.params.alpha) this.instance.setClearColor(this.params.background)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }

    setParameters(params) {
        this.params = {...params}
        this.instance.toneMapping = this.toneMappingOptions[this.params.toneMapping]
        this.instance.toneMappingExposure = this.params.toneMappingExposure

        this.params.alpha ? this.enableTransparency() : this.disableTransparency()

        // Update debug
        if (this.debug.active) {
            // Remove current debug folder
            if (this.debugFolder) this.debugFolder.dispose()

            // Create new folder and bindings
            this.debugFolder = this.debug.ui.addFolder({ index: 2, title: "Renderer" })
            this.createDebugSettings()
        }
    }

    enableTransparency() {
        this.scene.background = null
        this.instance.setClearAlpha(0)
    }

    disableTransparency() {
        this.instance.setClearColor(this.params.background)
        this.instance.setClearAlpha(1)
    }

    createToneMappingOptions() {
        const toneMappingOptions = {
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
            AgX: THREE.AgXToneMapping,
            Neutral: THREE.NeutralToneMapping
        }
        return toneMappingOptions
    }

    createDebugSettings() {
        this.debugFolder.addBinding(this.params, 'toneMapping', { label: 'Tonemapping', options: this.toneMappingOptions }).on('change', (event) => {
            this.instance.toneMapping = event.value;
        })
        this.debugFolder.addBinding(this.instance, 'toneMappingExposure', { label: 'Exposure', min: 0, max: 3, step: 0.05 })
        this.debugFolder.addBinding(this.params, 'alpha', { label: 'Transparent canvas' }).on('change', (event) => {
            event.value ? this.enableTransparency() : this.disableTransparency()
        })
        this.debugFolder.addBinding(this.params, 'background', { label: 'Background' }).on('change', () => {
            if (!this.params.alpha) this.instance.setClearColor(this.params.background)
        })
    }
}