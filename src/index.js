'use strict'

const path = require('path')
const menubar = require('menubar')
const { ipcMain } = require('electron')
const AutoLaunch = require('auto-launch');

var mb = menubar({
  'index': path.join('file://', __dirname, '/index.html')
});

var appPath = mb.app.getPath('exe').split('.app/Content')[0] + '.app';
var appAutoLauncher = new AutoLaunch({
    name: 'Cali Surf Check Menubar',
    path: appPath
});

appAutoLauncher.enable();

mb.on('show', function () {
  mb.window.webContents.send('reload-report', 'reload');
})

ipcMain.on('quit-app', (event, args) => {
  if (args) {
    mb.app.exit()
  }
})
