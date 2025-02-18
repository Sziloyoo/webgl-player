import * as THREE from 'three'
import Lighting from "./Lighting.js"
import Player from "./Player.js"
import Model from "./Model.js"
import TextTest from './TextTest.js'

export default class Stage {
    constructor(params) {
        this.player = new Player()
        this.scene = this.player.scene
        this.loader = this.player.loader
        this.debug = this.player.debug

        this.params = params

        this.lighting = new Lighting(this.params.lighting)

        /* Testing */
        this.test = new TextTest()
        this.scene.add(this.test.GO)

        // Check if fallback is used
        if(params.source.name === "fallback") this.fallback()

        // Wait for resources
        this.loader.on('ready', () => {
            this.model = new Model(this.params)
        })
    }

    update() {
        this.model?.update()
        this.test?.update()
    }

    setParameters(params) {
        this.params = {...params}
        if(this.fallbackObject) this.scene.remove(this.fallbackObject)
        if(this.lighting) this.lighting.setParameters(this.params.lighting)
    }

    fallback() {
        this.fallbackObject = new THREE.AxesHelper()
        this.scene.add(this.fallbackObject)
    }
}