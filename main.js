/*
author David Sherlock
*/

const {app, BrowserWindow, dialog, ipcMain} = require('electron')
const fs = require('fs');

const url = require('url')
const path = require('path')
const assetPath = path.join(__dirname, 'assets')
var files = []


app.on('ready', createWindow)


function createWindow () {
    // Create the browser window.
    console.log("opening window")
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  
    // Open the DevTools if you want to expect the page
    //win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }


  fs.readdir(assetPath, function(err,list){
    if(err) throw err;
    for(var i=0; i<list.length; i++)
    {
      
            files.push(list[i]); //store the file name into the array files


    }
    });

  ipcMain.on('resize', function (e, x, y) {
    win.setSize(x, y)
  })

  ipcMain.on('save', function (e, saveData) {
    //do something with save data
  })

  ipcMain.on('directory-list', (e) => {

      e.returnValue =  files //should send a random element - save which has been sent so no two are sent

  })