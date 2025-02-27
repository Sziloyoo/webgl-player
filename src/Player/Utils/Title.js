import { Text } from 'troika-three-text'
import { Color } from 'three'

export default class Title {
    constructor(labelText, labelPosition, labelColor, id, hasCustomColor, debug) {
        this.id = id
        this.text = labelText
        this.position = labelPosition
        this.hasCustomColor = hasCustomColor
        this.color = labelColor
        this.GO = this.createLabel()
        this.markers = new Map()

        this.settings = {
            string: this.text,
            color: `#${this.color?.getHexString()}`,
            position: { x: this.position.x, y: this.position.y, z: this.position.z }
        }

        if (debug.active) {
            this.debugFolder = debug.ui.addFolder({ title: this.id })
            this.createDebugSettings()
        }
    }

    createLabel() {
        const label = new Text()
        label.text = this.text
        label.anchorX = "center"
        label.anchorY = "bottom"
        label.textAlign = "center"
        label.position.copy(this.position)
        label.sync()
        return label
    }

    setStyle(params) {
        this.GO.fontSize = params.fontSize
        this.baseFontSize = params.fontSize
        this.GO.color = this.hasCustomColor ? this.color : params.fontColor
        this.GO.fontWeight = params.fontBold ? "bold" : "normal"
        this.GO.outlineWidth = params.fontStroke ? "3%" : 0
        this.GO.outlineColor = '#101010'

        if(this.markers) this.markers.forEach(marker => marker.setColor(new Color(this.hasCustomColor ? this.color : params.fontColor)))
    }

    update(cameraRef) {
        if (this.GO) {
            this.GO.lookAt(cameraRef.position)
            this.calculateTextScale(cameraRef.position)
        }
    }

    addMarker(makerId, markerRef) {
        this.markers.set(makerId, markerRef)
    }

    calculateTextScale(cameraPosition) {
        const cameraDistance = this.GO.position.distanceTo(cameraPosition)
        const baseDistance = 3
        this.GO.fontSize = this.baseFontSize * (cameraDistance / baseDistance)
        this.GO.sync()
    }

    createDebugSettings() {
        this.debugFolder.addBinding(this.settings, 'string', { title: "string", disabled: true })
        if (this.hasCustomColor) {
            this.debugFolder.addBinding(this.settings, 'color', { label: 'color' }).on('change', () => {
                this.color.set(this.settings.color)

                if (this.markers.size > 0) {
                    this.markers.forEach(marker => marker.setColor(new Color(this.settings.color)))
                }
            })
        }
        this.debugFolder.addBinding(this.settings, 'position', { label: 'position' }).on('change', () => {
            this.position.set(this.settings.position.x, this.settings.position.y, this.settings.position.z)
            this.GO.position.copy(this.position)

            if (this.markers.size > 0) {
                this.markers.forEach(marker => marker.setPositions(marker.startPosition, this.position))
            }
        })
    }
}