const { Tray, Menu } = require('electron')

function createTray(app, win) {
  const tray = new Tray('1.png')
  tray.setToolTip('我的应用')
  // tray.setContextMenu()
  tray.on('click', (e) => {
    if(e.shiftKey) {
      app.quit()
    }
  })
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'item 1' },
    { label: 'item 2', click: () => {
      win.isVisible() ? win.hide() : win.show()
    } }
  ]))
}

module.exports = createTray