import { Text } from 'troika-three-text'

export default class Title {
    constructor(labelText, labelPosition, labelColor) {
        this.text = labelText
        this.position = labelPosition
        this.color = labelColor
        this.GO = this.createLabel()
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
        this.GO.color = this.color ? this.color : params.fontColor
        this.GO.fontWeight = params.fontBold ? "bold" : "normal"
        this.GO.outlineWidth = params.fontStroke ? "3%" : 0
        this.GO.outlineColor = '#101010'
    }

    setColor(color){
        this.color = color
        this.GO.color = this.color
    }

    update(cameraRef) {
        if (this.GO) {
            this.GO.lookAt(cameraRef.position)
            this.calculateTextScale(cameraRef.position)
        }
    }

    calculateTextScale(cameraPosition) {
        const cameraDistance = this.GO.position.distanceTo(cameraPosition)
        const baseDistance = 3
        this.GO.fontSize = this.baseFontSize * (cameraDistance / baseDistance)
        this.GO.sync()
    }
}