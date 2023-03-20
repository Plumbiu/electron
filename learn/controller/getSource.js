// controller/getSource.js
const { desktopCapturer, ipcMain } = require('electron')
const getSource = (mainWindow) => {
  ipcMain.handle('desktop-capturer', async (event) => {
    desktopCapturer.getSources({
      types: ['window', 'screen'],
      thumbnailSize: {
        width: 1728,
        height: 1117
      }.then(async sources => {
        console.log(sources)
        for (const source of sources) {
          if (source.name === 'Entire screen') {
            mainWindow.webContents.send('SET_SROUCE', srouce)
            return
          }
        } 
      })
    })
  })
}
module.exports = getSource
