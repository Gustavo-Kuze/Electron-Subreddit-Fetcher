const electron = require('electron');
const ipcMain = electron.ipcMain
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let imageWindow;
let aboutWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { webSecurity: false }, show: false });
  imageWindow = new BrowserWindow({ width: 700, height: 700, parent: mainWindow, show: false });
  aboutWindow = new BrowserWindow({ width: 700, height: 700, parent: mainWindow, show: false });

  imageWindow.setMenu(null)
  aboutWindow.setMenu(null)

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html')}`);
  aboutWindow.loadURL(isDev ? 'http://localhost:3000/about' : `file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.show();
  })

  mainWindow.on('closed', () => mainWindow = null);
  imageWindow.on('close', (e) => {
    e.preventDefault()
    imageWindow.hide()
  });
  aboutWindow.on('close', (e) => {
    e.preventDefault()
    aboutWindow.hide()
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('toggle-image', (event, args) => {
  imageWindow.show()
  imageWindow.webContents.send('image', args)
})

ipcMain.on('toggle-about', () => {
  aboutWindow.isVisible() ? aboutWindow.hide() : aboutWindow.show()
})