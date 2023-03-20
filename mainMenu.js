const { Menu, dialog } = require('electron')
const mainMenu = (args, cb) => {
  return Menu.buildFromTemplate([
    {
      label: 'Electron',
      submenu: [{ label: 'Item 1' }, { label: 'Item 1', submenu: [{ label: 'Sub Item 1' }] }, { label: 'Item 1' }]
    },
    {
      label: 'Edit',
      submenu: [{ label: 'undo' }, { label: 'redo' }, { label: 'copy' }, { label: 'paste' }]
    },
    {
      label: 'Actions',
      submenu: [
        { label: 'DevTools', role: 'toggleDevTools' },
        { role: 'toggleFullScreen' },
        {
          label: 'Greet',
          click: () => {
            // const answers = ['Yes', 'No', 'Maybe']
            // dialog.showMessageBox({
            //     title: 'Message Box',
            //     message: args,
            //     detail: 'Message details',
            //     buttons: answers
            //   }).then(({ response }) => {
            //     console.log(`User selected: ${answers[response]}`)
            //   })
            cb('Hello electron')
          },
          accelerator: 'Shi'
        }
      ]
    }
  ])
}
module.exports = mainMenu
