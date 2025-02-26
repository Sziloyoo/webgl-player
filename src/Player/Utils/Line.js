import * as THREE from 'three'

export default class Marker {
    constructor(startPosition, endPosition, color) {
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.color = color

        this.geometry = this.createGeometry()
        this.material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, color: this.color })
        this.GO = new THREE.Line(this.geometry, this.material)
    }

    createGeometry() {
        const geometry = new THREE.BufferGeometry()

        const positions = new Float32Array([
            this.startPosition.x, this.startPosition.y, this.startPosition.z,
            this.endPosition.x, this.endPosition.y, this.endPosition.z
        ])
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        // Define colors with alpha (RGBA)
        const colors = new Float32Array([
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 0.0
        ])
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4))

        return geometry
    }

    redraw() {
        if(!this.GO) return

        const positions = this.geometry.attributes.position.array
        positions[0] = this.startPosition.x
        positions[1] = this.startPosition.y
        positions[2] = this.startPosition.z 
        positions[3] = this.endPosition.x 
        positions[4] = this.endPosition.y
        positions[5] = this.endPosition.z
        this.geometry.attributes.position.needsUpdate = true

        // Update color
        this.material.color.set(this.color)
    }

    setColor(color) {
        this.color = color
        this.redraw()
    }

    setPositions(start, end){
        this.startPosition = start
        this.endPosition = end
        this.redraw()
    }
}