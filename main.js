const path = require('path')
const glob = require('glob')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const settings = require('electron-settings')


let mainWindow = null
let loginWindow = null
let splash = null

function initialize() {
    makeSingleInstance()

    loadDemos()

    function createWindow() {
        // Create the browser window.
        const windowOptions = {
            width: 1280,
            minWidth: 680,
            height: 840,
            show: false,
            title: app.getName(),
            webPreferences: {
                DevTools: true,
                nodeIntegration: true
            }
        }

        // create main window
        mainWindow = new BrowserWindow(windowOptions)

        // and load the index.html of the app
        mainWindow.loadFile('index.html')

        // Open the DevTools. 
        //mainWindow.webContents.openDevTools()

        // set Menu
        initMenu()

        mainWindow.on('closed', () => {
            settings.set('logout', false)
            mainWindow = null
        })

        // create login window
        createLoginWindow()

        // create splash window
        splash = new BrowserWindow({
            width: 600,
            height: 400,
            transparent: true,
            frame: false,
            alwaysOnTop: true
        });

        splash.loadFile('src/splashScreen.html')
        splash.show() // show splash

        setTimeout(() => {
            splash.destroy()
            createLoginWindow
            loginWindow.show()
                //loginWindow.webContents.openDevTools()
        }, 1000);

        loginWindow.on('closed', () => {
            settings.set('logout', false)
            loginWindow = null
        })

        ipcMain.on("unauthenticated", (event) => {
            console.log('logged out')

            mainWindow.hide()

            createLoginWindow()
            loginWindow.once('ready-to-show', () => {
                loginWindow.show()
            })
        })

        ipcMain.on("authenticated", (event) => {
            console.log('logged in')
            mainWindow.show()

            // check if logged out
            if (settings.get('logout')) {
                mainWindow.show()
                loginWindow.close()
            }

            // show main window when ready
            mainWindow.once('ready-to-show', () => {
                mainWindow.show()
                loginWindow.close()
            })
        })

        function createLoginWindow() {
            loginWindow = new BrowserWindow({
                width: 400,
                height: 600,
                alwaysOnTop: true,
                maximizable: false,
                resizable: false,
                autoHideMenuBar: true,
                show: false,
                webPreferences: {
                    devTools: false,
                    nodeIntegration: true
                }
            })

            loginWindow.loadFile('src/auth/login.html')
        }

        function initMenu() {
            const menu = Menu.buildFromTemplate([{
                label: 'File',
                submenu: [
                    { label: 'Application Info' },
                    {
                        label: 'settings',
                        accelerator: 'CmdOrCtrl+,'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'CmdOrCtrl+Q',
                        click: () => {
                            app.quit()
                        }

                    }
                ]
            }])

            Menu.setApplicationMenu(menu)
        }
    }


    // This method will be called when Electron ha$(document).ready(() => {
    //     let setiing = settings.get('username')
    //     $('.username').text(setting)
    // })s finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(
        createWindow
    )


    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

}



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) win.restore()
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos() {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
    console.log(files)
    files.forEach((file) => { require(file) })
}



initialize()