import * as THREE from 'three'
import Title from './Utils/Title.js'
import Line from './Utils/Line.js'
import Player from './Player.js'

export default class Content{
    constructor(params, texts){
        // Player objects
        this.player = new Player()
        this.scene = this.player.scene
        this.camera = this.player.camera
        // Loaded resources
        this.styles = params.styles
        this.labels = params.labels
        this.markers = params.markers
        this.texts = texts.labels

        // Containers
        this.labelContainer = new Map()
        this.markerContainer = new Map()

        // Check if there are any labels available
        if (this.labels && Object.keys(this.labels).length > 0) {
            this.createLabels()
        } else {
            console.warn("The loaded config file does not contain Labels.");
        }

        // Check if there are any markers available
        if (this.markers && Object.keys(this.markers).length > 0) {
            this.createMarkers()
        } else {
            console.warn("The loaded config file does not contain Markers.");
        }
    }

    update(){
        this.labelContainer.forEach((label) => label.update(this.camera.instance))
    }

    createLabels(){
        const labels = new Map(Object.entries(this.labels))
        labels.forEach((value, key) => {
            const labelId = key
            const labelPosition = new THREE.Vector3(value.position.x, value.position.y, value.position.z)
            const labelColor = value.color ? new THREE.Color(value.color) : new THREE.Color(this.styles.fontColor)
            const labelText = this.texts[labelId]

            const label = new Title(labelText, labelPosition, labelColor)
            label.setStyle(this.styles)

            this.labelContainer.set(labelId, label)
            this.scene.add(label.GO)
        })
    }

    createMarkers(){
        const markers = new Map(Object.entries(this.markers))
        markers.forEach((value, key) => {
            const markerId = key
            const markerPosition = value.position
            const labelId = value.label
            const markerLabel = this.labelContainer.get(labelId)
            const markerColor = markerLabel.color ? markerLabel.color : this.styles.lineColor

            const marker = new Line(markerPosition, markerLabel.position, markerColor)

            this.markerContainer.set(markerId, marker)
            this.scene.add(marker.GO)
        })
    }
}