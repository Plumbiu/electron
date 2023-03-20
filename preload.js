const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('myApi', {
  platform: process.platform
})
// console.log('ipcMain', ipcMain)
// // 主进程
// ipcMain.handle('send-event', (event, msg) => {
//   console.log(msg)
// })
// 上下文隔离禁用的情况下使用预加载
window.myAPI = {
  doAThing: () => {}
}
contextBridge.exposeInMainWorld('electronApi', {
  setTitle: title => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
