const { remote } = require('electron')
const { BrowserWindow } = remote
const axios = require('axios')
const path = require('path')
const settings = require('electron-settings')


let addWindow = null
let currentWindow = null
$('#add-customer-btn').on('click', (e) => {
    e.preventDefault()
        //currentWindow = remote.getCurrentWindow()

    addWindow = new BrowserWindow({
        width: 500,
        height: 600,
        parent: currentWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    })

    addWindow.loadURL(path.join('file://', __dirname, '/src/customers/add-customer.html'))
        //addWindow.loadFile('/src/customers/add-customer.html')

})