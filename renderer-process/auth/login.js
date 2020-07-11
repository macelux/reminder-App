const { ipcRenderer } = require('electron')
const $ = require('jquery')

$('#login-btn').on('click', (e) => {
    console.log('i am here')
    e.preventDefault()
    ipcRenderer.send('authenticated')
})