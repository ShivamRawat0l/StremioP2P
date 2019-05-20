// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    
    width: 400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    },
    frame:false,
    transparent: true,
  })
  mainWindow.loadFile('index.html')
mainWindow.setMenuBarVisibility(false) 

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
