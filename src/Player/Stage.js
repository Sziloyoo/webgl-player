import * as THREE from 'three'
import Lighting from "./Lighting.js"
import Player from "./Player.js"
import Model from "./Model.js"
import Title from './Utils/Title.js'

export default class Stage {
    constructor(params, text) {
        this.player = new Player()
        this.controls = this.player.controls
        this.scene = this.player.scene
        this.loader = this.player.loader
        this.debug = this.player.debug
        this.params = params

        if(text) this.labels = new Map(Object.entries(text.labels))

        // Place lights into the scene
        this.lighting = new Lighting(this.params.lighting)

        // Check if fallback is used
        if (params.source.name === "fallback") this.fallback()

        // Wait for resources and create model
        this.loader.on('ready', () => {
            this.model = new Model(this.params)
            if(this.params.text) this.createTexts(this.params.source.name)
        })

        // Debug mode for Texts
        if (this.debug.active && this.params.text) {
            this.debugTextFolder = this.debug.ui.addFolder({ title: "Text" })
            this.createTextsDebug()
        }
    }

    update() {
        this.model?.update()
        this.textContainer?.forEach(text => text.update(this.player.camera.instance))
    }

    createTexts(modelName) {
        // Check if text file has labels
        if(!this.labels || this.labels.size == 0){
            console.warn("Can't find labels in text file.")
            return
        }

        // Get text IDs and Positions from glTF file
        const glTF = this.loader.items[modelName]

        // Check if model has label positions
        if(!glTF.scene.children.find(obj => obj.name === "text")){
            console.warn("Can't find text positions in glTF file.")
            return
        }

        // Create set for the texts
        this.textContainer = new Set()

        const textObjects = glTF.scene.children.find(obj => obj.name === "text").children

        for (const { name, position } of textObjects) {

            const labelText = this.labels ? this.labels.get(name) : "string not found"
            const text = new Title(labelText, position)
            text.setStyle(this.params.text)
            this.scene.add(text.label)

            // Put text into the map
            this.textContainer.add(text)
        }
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