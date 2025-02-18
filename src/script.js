import Player from "./Player/Player.js"

const config = await loadConfiguration("https://test-files.vercel.app/elefant.json")
const container = document.querySelector('.canvas-container')
const canvas = document.querySelector('canvas.webgl')

const player = new Player(container, canvas, config)

async function loadConfiguration(url) {
    let data = undefined
    try {
        const resp = await fetch(url)
        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
        }
        data = await resp.json()
    } catch (error) {
        console.error("Error occurred while loading the JSON file: ", error)
    }
    return data
}