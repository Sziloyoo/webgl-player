import Player from "./Player/Player.js"

// HTML elements
const container = document.getElementById("container")
const canvas = document.getElementById("canvas")

// Config file
const config = await loadConfiguration("https://test-files.vercel.app/csiga/csiga.json")

// Text file
const text = await loadConfiguration("https://test-files.vercel.app/csiga/text/csiga_hu.json")

const player = new Player(container, canvas, config, text)

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