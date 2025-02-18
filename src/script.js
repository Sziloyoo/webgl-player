import Player from "./Player/Player.js"

const config = undefined
const config2 = await loadConfiguration("https://test-files.vercel.app/elefant.json")
const container = document.getElementById('con-1')
const canvas = document.getElementById('c1')

const container2 = document.getElementById('con-2')
const canvas2 = document.getElementById('c2')

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
