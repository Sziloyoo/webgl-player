import Player from "./Player/Player.js"

// Config files
const config_empty = undefined
const config_sisak = await loadConfiguration("https://test-files.vercel.app/sisak.json")
const config_elefant = await loadConfiguration("https://test-files.vercel.app/elefant.json")
const config_roka = await loadConfiguration("https://test-files.vercel.app/roka.json")
const config_sziv = await loadConfiguration("https://test-files.vercel.app/sziv.json")

// HTML elements
const container = document.getElementById('con-1')
const canvas = document.getElementById('c1')

const player = new Player(container, canvas, config_elefant)

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
