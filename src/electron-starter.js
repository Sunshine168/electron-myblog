const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const {ipcMain,dialog} = require('electron')
const path = require('path')
const url = require('url')
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
require('electron-debug')({showDevTools:true})
installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
// require('electron-reload')(__dirname);
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, onlineStatusWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    'web-preferences': {'web-security': false}
  })

  // dev mode load the localhost and pro load the build folder file
  const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
    });
    mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
function listenr() {}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  //监听窗体
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(path.join('file://', __dirname, '/../build/onlineStauts.html'))
  //main window
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/*file path*/
const staticPath = process.env.ELECTRON_START_URL?'./build/':path.join(__dirname, '/../build/index.html')
/*ipc demo*/
/*async event */
//loginOut confirm
ipcMain.on('loginOutConfirm', (event, arg) => {
  /* if use  custom dialog */
  // const modalPath = path.join('file://', __dirname, '/../build/loginOutDialogue.html')
  // let win = new BrowserWindow({ frame: false,width: 400, height: 320  })
  // win.on('close', function () { win = null })
  // win.loadURL(modalPath)
  // win.show()
  /* use the electron dialog*/
  const options = {
    type:'info',
    title:'注销提示',
    message:'确定要注销账号吗？',
    buttons:['yes','no']
  }
  dialog.showMessageBox(options,(index)=>{
     event.sender.send('loginOut',index);
  })
})
