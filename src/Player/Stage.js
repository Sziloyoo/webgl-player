import * as THREE from 'three'
import Lighting from "./Lighting.js"
import Player from "./Player.js"
import Model from "./Model.js"
import Content from './Content.js'

export default class Stage {
    constructor(params, texts) {
        this.player = new Player()
        this.controls = this.player.controls
        this.camera = this.player.camera
        this.scene = this.player.scene
        this.loader = this.player.loader
        this.debug = this.player.debug
        this.params = params
        this.texts = texts

        // Place lights into the scene
        this.lighting = new Lighting(this.params.lighting)

        // Check if fallback is used
        if (params.source.name === "fallback") this.fallback()

        // Wait for resources and create model
        this.loader.on('ready', () => {
            this.model = new Model(this.params, this.scene)
            this.content = new Content(this.params, this.texts)
        })

        // Debug mode for Texts
        if (this.debug.active && this.params.text) {
            this.debugTextFolder = this.debug.ui.addFolder({ title: "Text" })
            this.createTextsDebug()
        }
    }

    update() {
        this.model?.update()
        this.content?.update()
    }

    createTextsDebug() {
        this.debugTextFolder.addBinding(this.params.text, 'fontSize', { label: 'Font size', min: 0.1, max: 1.0, step: 0.05 }).on('change', () => {
            this.textContainer?.forEach(text => text.setStyle(this.params.text))
        })
        this.debugTextFolder.addBinding(this.params.text, 'fontColor', { label: 'Font color' }).on('change', () => {
            this.textContainer?.forEach(text => text.setStyle(this.params.text))
        })
        this.debugTextFolder.addBinding(this.params.text, 'fontBold', { label: 'Font bold' }).on('change', () => {
            this.textContainer?.forEach(text => text.setStyle(this.params.text))
        })
        this.debugTextFolder.addBinding(this.params.text, 'fontStroke', { label: 'Font stroke' }).on('change', () => {
            this.textContainer?.forEach(text => text.setStyle(this.params.text))
        })
    }

    setParameters(params) {
        this.params = { ...params }
        if (this.fallbackObject) this.scene.remove(this.fallbackObject)
        if (this.lighting) this.lighting.setParameters(this.params.lighting)
        if (this.textContainer) this.textContainer.forEach(text => text.setStyle(this.params.text))
    }

    fallback() {
        this.fallbackObject = new THREE.AxesHelper()
        this.scene.add(this.fallbackObject)
    }
}