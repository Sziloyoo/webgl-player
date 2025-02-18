import { Pane } from 'tweakpane'

export default class Debug {
    constructor(source) {
        this.active = window.location.hash === '#debug'
        if (this.active) {
            this.ui = new Pane()
            this.debugFolder = this.ui.addFolder({ title: "Informations" })
            this.debugFolder.addBinding(source, 'name', { title: "Model name", disabled: true })

            // If there is no model provided, exit
            if (source.name === "fallback") return

            this.debugFolder.addBinding(source, 'type', { title: "File type", disabled: true })
            this.debugFolder.addBinding(source, 'path', { title: "File path", disabled: true })
        }
    }

    load(source) {
        // Remove current debug folder
        if (this.debugFolder) this.debugFolder.dispose()

        // Create new folder and bindings
        this.debugFolder = this.ui.addFolder({ index: 0, title: "Informations" })
        this.debugFolder.addBinding(source, 'name', { title: "Model name", disabled: true })
        this.debugFolder.addBinding(source, 'type', { title: "File type", disabled: true })
        this.debugFolder.addBinding(source, 'path', { title: "File path", disabled: true })
    }
}