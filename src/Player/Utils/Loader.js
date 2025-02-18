import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from './EventEmitter.js'

/**
 * The Loader expects a source object.
 *  {
        name: 'sziv',
        type: 'gltfModel',
        path: 'models/sziv.glb'
    }
 */

export default class Loader extends EventEmitter {
    constructor(source) {
        super()

        this.items = {}

        this.setLoaders()

        if (source) this.startLoading(source)
        else console.warn("Loader: No source provided!")
    }

    setLoaders() {
        this.loaders = {}

        // Draco
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')
        dracoLoader.setDecoderConfig({ type: 'js' })

        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader)
    }

    startLoading(source) {
        if (source.type === 'gltfModel') {
            this.loaders.gltfLoader.load(
                source.path,
                (file) => {
                    this.sourceLoaded(source, file)
                },
                undefined, // This called while loading is progressing (unused)
                (error) => {
                    console.error("Loader error: Can't load gltf file: ", error)
                }
            )
        }
        else console.error("Loader error: No gltf file type provided in the source object.")
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.trigger('ready')
    }
}