const { ipcRenderer, remote } = require('electron')
const $ = require('jquery')
const axios = require('axios')
const settings = require('electron-settings')

$(document).ready(function() {
    $('.alert-danger').hide()

    $('#login-btn').on('click', (e) => {
        e.preventDefault()

        // if authentication is successful then show main window
        let username = $('#emailaddress').val()
        let password = $('#password').val()
        let alertMessage = $('.alert-danger')

        if (username && password) {
            axios.post('http://localhost:8000/api/user_login', { username: username, password: password })
                .then(response => {
                    console.log(response.data)
                    if (response.data.login) {
                        settings.set('username', response.data.username) // set settings
                        ipcRenderer.send('authenticated') // open main window
                    } else {
                        console.log(response.data)
                        $('.alert-danger').text('invalid login details').show()
                        setTimeout(() => {
                            $('.alert-danger').fadeOut()
                        }, '10000');
                    }
                })

        } else {
            $('.alert-danger').text('Username and password is required').show()

            setTimeout(() => {
                $('.alert-danger').fadeOut()
            }, '1000');

        }

    })
})