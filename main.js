const path = require('path')
const glob = require('glob')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')

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
                nodeIntegration: true
            }
        }

        // create main window
        mainWindow = new BrowserWindow(windowOptions)

        // and load the index.html of the app.cle
        mainWindow.loadFile('index.html')

        // Open the DevTools. 
        mainWindow.webContents.openDevTools()

        mainWindow.on('closed', () => {
            mainWindow = null
        })

        // create login window
        loginWindow = new BrowserWindow({ width: 400, height: 500, alwaysOnTop: true, autoHideMenuBar: true, maximizable: false, show: false, webPreferences: { nodeIntegration: true } })
        splash = new BrowserWindow({ width: 600, height: 400, transparent: true, frame: false, alwaysOnTop: true });
        loginWindow.loadFile('src/auth/login.html')
        splash.loadFile('src/splashScreen.html')
            // show splash
        splash.show()

        setTimeout(() => {
            splash.destroy()
            loginWindow.show()
            loginWindow.webContents.openDevTools()
        }, 1000);

        loginWindow.on('closed', () => {
            //loginWindow = null
            app.quit()
        })

        ipcMain.on("unauthenticated", (event) => {
            loginWindow.show()
        })

        ipcMain.on("authenticated", (event) => {
            // show main window when ready
            mainWindow.once('ready-to-show', () => {
                mainWindow.show()
                loginWindow.hide();
            })

        })
    }


    // This method will be called when Electron has finished
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