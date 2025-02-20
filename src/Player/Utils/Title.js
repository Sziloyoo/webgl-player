import { Text } from 'troika-three-text'

export default class Title{
    constructor(labelText, labelPosition){
        this.label = this.createLabel(labelText, labelPosition)
    }

    createLabel(text, position){
        const label = new Text()
        label.text = text
        label.anchorX = "center"
        label.anchorY = "bottom"
        label.textAlign = "center"
        label.position.copy(position)
        label.sync()
        return label
    }

    setStyle(params){
        this.label.fontSize = params.fontSize
        this.label.color = params.fontColor
        this.label.fontWeight = params.fontBold ? "bold" : "normal"
        this.label.outlineWidth = params.fontStroke ? "3%" : 0
        this.label.outlineColor = '#101010'
    }

    update(cameraRef){
        this.label?.lookAt(cameraRef.position)
    }
}