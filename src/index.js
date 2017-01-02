'use strict'

const path = require('path')
const menubar = require('menubar')
const { ipcMain } = require('electron')

var mb = menubar({
  'index': path.join('file://', __dirname, '/index.html')
});

mb.on('show', function () {
  mb.window.webContents.send('reload-report', 'reload');
})

ipcMain.on('quit-app', (event, args) => {
  if (args) {
    mb.app.exit()
  }
})
