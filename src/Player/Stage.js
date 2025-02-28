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

        this.GO = new THREE.Group()

        // Place lights into the scene
        this.lighting = new Lighting(this.params.lighting)

        // Check if fallback is used
        if (params.source.name === "fallback") this.fallback()

        // Wait for resources and create model
        this.loader.on('ready', () => {
            this.model = new Model(this.params, this.GO)
            this.content = new Content(this.params, this.texts)
        })

        this.scene.add(this.GO)
    }

    update() {
        this.model?.update()
        this.content?.update()
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