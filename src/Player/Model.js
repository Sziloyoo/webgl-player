import * as THREE from "three"
import Player from "./Player.js"

export default class Model {
    constructor(params) {
        this.player = new Player()
        this.loader = this.player.loader
        this.time = this.player.time
        this.scene = this.player.scene
        this.debug = this.player.debug

        this.params = params

        this.initModel(this.params.source.name)
        this.displayModel()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Model" })
            this.createDebugSettings()
        }
    }

    initModel(modelName) {
        this.modelGLTF = this.loader.items[modelName]
        if (this.hasAnimation(this.modelGLTF)) {
            this.animMixer = new THREE.AnimationMixer(this.modelGLTF.scene)
            this.modelAction = this.animMixer.clipAction(this.modelGLTF.animations[0])
        }
    }

    displayModel() {
        // Add loaded model to the scene
        if (this.modelGLTF) this.scene.add(this.modelGLTF.scene)
        else console.error("There is no reference for the GLTF file.")

        // Playing animation if there is one
        if (this.animMixer && this.modelAction) this.modelAction.play()
        else console.warn("Can't find animation in the GLTF file.")
    }

    update() {
        if (this.animMixer && this.params.model.playAnimation) this.animMixer.update(this.time.getDeltaTime())
    }

    createDebugSettings() {
        this.debugFolder.addBinding(this.params.model, 'playAnimation', { label: 'Play animation' })
        this.debugFolder.addBinding(this.params.model, 'animationSpeed', { label: 'Animation speed', min: 0.25, max: 4.0, step: 0.05 }).on('change', () => {
            if (this.modelAction) this.modelAction.timeScale = this.params.model.animationSpeed
        })
    }

    hasAnimation(gltf) {
        return gltf.animations.length > 0
    }
}