import * as THREE from 'three'
import { Text } from 'troika-three-text'
import Player from './Player'

export default class TextTest {
    constructor() {
        this.player = new Player()
        /* this.debug = this.player.debug */
        this.camera = this.player.camera
        this.GO = new THREE.Group()

        this.params = {
            lineColor: '#000000',
            lineWidth: 0.1,
            fontSize: 0.5,
            fontColor: '#ffffff',
            fontText: "Text",
            fontBold: true,
            fontStroke: true
        }

        this.startPos = new THREE.Vector3(1, 2, 3)
        this.endPos = new THREE.Vector3(1, 0, 1)

        /* this.line = this.createLine(this.startPos, this.endPos, this.params.lineColor)
        this.GO.add(this.line) */

        this.text = this.createText(this.startPos)
        this.GO.add(this.text)

        // Debug mode
        /* if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Texts" })
            this.createDebug()
        } */
    }

    update() {
        this.text?.lookAt(this.camera.instance.position)
    }

    createLine(start, end, col) {
        const color = new THREE.Color(col)
        console.log(color);

        // Compute direction vector
        const direction = new THREE.Vector3().subVectors(end, start).normalize();

        // Compute perpendicular vector for thickness
        const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0).normalize().multiplyScalar(this.params.lineWidth / 2);

        // Generate quad vertices (two per point)
        const vertices = [
            start.x + perpendicular.x, start.y + perpendicular.y, start.z,
            start.x - perpendicular.x, start.y - perpendicular.y, start.z,
            end.x + perpendicular.x, end.y + perpendicular.y, end.z,
            end.x - perpendicular.x, end.y - perpendicular.y, end.z
        ];

        // Create index buffer for triangle strip (two triangles)
        const indices = [0, 1, 2, 3];

        // Create vertex colors (optional gradient)
        const colors = [
            parseFloat(color.r), parseFloat(color.g), parseFloat(color.b), 0.0,  // Start color
            parseFloat(color.r), parseFloat(color.g), parseFloat(color.b), 0.0,  
            parseFloat(color.r), parseFloat(color.g), parseFloat(color.b), 1.0,  // End color
            parseFloat(color.r), parseFloat(color.g), parseFloat(color.b), 1.0,  
        ];

        // Create BufferGeometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));
        geometry.setIndex(indices);

        // ShaderMaterial
        const material = new THREE.ShaderMaterial({
            vertexShader: `
        attribute vec4 color;
        varying vec4 vColor;

        void main() {
            vColor = color;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
            fragmentShader: `
        varying vec4 vColor;

        void main() {
            gl_FragColor = vColor;
        }
    `,
            transparent: true,
            side: THREE.DoubleSide
        });

        return new THREE.Mesh(geometry, material);
    }

    createText(start) {
        const textMesh = new Text()
        textMesh.text = this.params.fontText
        textMesh.fontSize = this.params.fontSize
        textMesh.color = this.params.fontColor
        textMesh.fontWeight = this.params.fontBold ? "bold" : "normal"
        textMesh.outlineWidth = this.params.fontStroke ? "3%" : 0
        textMesh.anchorX = "center"
        textMesh.anchorY = "bottom"
        textMesh.textAlign = "center"
        textMesh.outlineColor = '#101010'
        textMesh.position.copy(start)
        textMesh.sync()
        return textMesh
    }

    createDebug() {
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
            this.text.outlineWidth = this.params.fontStroke ? "3%" : 0
        })
    }
}