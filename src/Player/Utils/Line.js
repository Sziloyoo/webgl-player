import * as THREE from 'three'

export default class Marker {
    constructor(startPosition, endPosition, color) {
        this.startPosition = startPosition
        this.endPosition = endPosition
        this.color = color
        this.lineWidth = 1.0

        this.GO = this.createMarker(this.startPosition, this.endPosition, this.color)
    }

    update() {

    }

    createMarker(start, end, color) {

        // Create geometry
        const geometry = new THREE.BufferGeometry();

        // Define the two points
        const positions = new Float32Array([
            start.x, start.y, start.z,  // Start point (fully visible)
            end.x, end.y, end.z   // End point (transparent)
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Define colors with alpha (RGBA)
        const colors = new Float32Array([
            color.r, color.g, color.b, 1.0,
            color.r, color.g, color.b, 0.0
        ]);
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));

        // Create material
        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true
        });

        // Create line
        return new THREE.Line(geometry, material);
    }
}