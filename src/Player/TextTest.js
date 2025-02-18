import * as THREE from 'three'
import { Text } from 'troika-three-text'
import Player from './Player'

import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'

export default class TextTest {
    constructor() {
        this.player = new Player()
        this.debug = this.player.debug
        this.time = this.player.time
        this.camera = this.player.camera
        this.GO = new THREE.Group()

        // Debug mode
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Texts" })
        }

        this.params = {
            lineColor: '#ffffff',
            lineWidth: 3.0,
            lineOpacity: 1.0,
            fontSize: 0.5,
            fontColor: '#ffffff',
            fontText: "Hello",
            fontBold: true,
            fontStroke: false
        }

        this.startPos = new THREE.Vector3(0, 0, 0)
        this.endPos = new THREE.Vector3(1, 1, 1)

        this.line = this.createLine(this.startPos, this.endPos)
        this.GO.add(this.line)

        this.text = this.createText(this.endPos)
        this.GO.add(this.text)

        this.createDebug()
    }

    update() {
        this.text.lookAt(this.camera.instance.position)
    }

    createLine(start, end) {
        // Create material for the line
        this.material = new LineMaterial({
            color: this.params.lineColor,
            linewidth: this.params.lineWidth,
            transparent: true,
            opacity: 1.0
        })

        // Create geometry
        const geometry = new LineGeometry();
        geometry.setPositions([start.x, start.y, start.z, end.x, end.y, end.z])

        // Create Line2 object
        const line = new Line2(geometry, this.material)
        line.computeLineDistances()
        return line;
    }

    createText(end) {
        const textMesh = new Text()
        textMesh.text = this.params.fontText
        textMesh.fontSize = this.params.fontSize
        textMesh.color = this.params.fontColor
        textMesh.fontWeight = this.params.fontBold ? "bold" : "normal"
        textMesh.strokeWidth = this.params.fontStroke ? "2%" : 0
        textMesh.anchorX = "left"
        textMesh.anchorY = "middle"
        textMesh.textAlign = "center"
        textMesh.strokeColor = '#101010'
        textMesh.position.copy(end)
        textMesh.sync()
        return textMesh
    }

    createDebug() {
        this.debugFolder.addBinding(this.params, 'lineColor', { label: 'Line color' }).on('change', () => {
            this.material.color.set(this.params.lineColor)
        })
        this.debugFolder.addBinding(this.params, 'lineWidth', { label: 'Line width', min: 1.0, max: 10.0, step: 0.1 }).on('change', () => {
            this.material.linewidth = this.params.lineWidth
        })
        this.debugFolder.addBinding(this.params, 'lineOpacity', { label: 'Line opacity', min: 0.0, max: 1.0, step: 0.05 }).on('change', () => {
            this.material.opacity = this.params.lineOpacity
        })
        this.debugFolder.addBinding(this.params, 'fontSize', { label: 'Font size', min: 0.1, max: 1.0, step: 0.05 }).on('change', () => {
            this.text.fontSize = this.params.fontSize
        })
        this.debugFolder.addBinding(this.params, 'fontColor', { label: 'Font color' }).on('change', () => {
            this.text.color = this.params.fontColor
        })
        this.debugFolder.addBinding(this.params, 'fontBold', { label: 'Font bold' }).on('change', () => {
            this.text.fontWeight = this.params.fontBold ? "bold" : "normal"
        })
        this.debugFolder.addBinding(this.params, 'fontStroke', { label: 'Font stroke' }).on('change', () => {
            this.text.strokeWidth = this.params.fontStroke ? "2%" : 0
        })
    }
}