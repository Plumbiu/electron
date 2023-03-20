const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const mainMenu = require('./mainMenu')
const path = require('path')
const createTray = require('./Tray.js')
const { sandboxed } = require('process')
const getSource = require('./controller/getSource')
let contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'editMenu' }
])
function handleTitle(event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) return
  else return filePaths[0]
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    x: 2000,
    y: 100,
    // frame: false,
    backgroundColor: '#bfa',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    }
  })
  createTray(app, win) 

  let wc = win.webContents
  // const win2 = new BrowserWindow({
  //   width: 600,
  //   height: 400,
  //   parent: win,
  //   modal: true
  // })
  // win2.loadURL('https://www.baidu.com')
  // win.loadURL('https://blog.plumbiu.club/')
  win.loadFile('index.html')
  // win.loadURL('https://blog.plumbiu.club')
  win.webContents.openDevTools()
  // 干掉所有警告
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
  win.on('ready-to-show', () => {
    win.show()
  })
  wc.on('did-finsih-load', () => {
    console.log('Conent fully loaded')
  })
  wc.on('dom-ready', () => {
    console.log('DOM ready')
  })
  wc.on('context-menu', (e, params) => {
    // console.log(1111)
    // dialog
    //   .showOpenDialog({
    //     buttonLabel: 'ok',
    //     defaultPath: app.getPath('desktop'),
    //     properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    //   })
    //   .then(result => {
    //     console.log(result)
    //   })
    getSource(win)
    contextMenu.popup()
  })
  Menu.setApplicationMenu(mainMenu('我的消息来了', (args) => {
    console.log(args)
  }))
}
app.on('before-quit', () => {
  console.log('App is quit')
})
app.on('browser-window-blur', () => {
  console.log('browser-window-blur')
})
app.on('browser-window-focus', () => {
  console.log('browser-window-focus')
})
app.whenReady().then(() => {
  ipcMain.on('set-title', handleTitle)
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
})
