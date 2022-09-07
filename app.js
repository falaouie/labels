const { app, BrowserWindow } = require('electron');

const platform = process.platform;
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    backgroundColor: '#eceeee',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    // kiosk: true,
  });

  mainWindow.loadFile('labels.html');

  // show index.html when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
    // open dev tools Remove for production
    // mainWindow.webContents.openDevTools();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createMainWindow);

// ipcMain example
// ipcMain.on('login-channel', (e, args) => {
//   console.log(args);
//   mainWindow.loadFile('dashboard.html');
// });

// Cleanup before exit sync stuff log users out etc...
let canQuitNow = false;
app.on('before-quit', async (e) => {
  // createTempWindow();
  mainWindow.loadFile('loading.html');
  if (!canQuitNow) {
    e.preventDefault();
    await doClean();
    canQuitNow = true;
    app.quit();
  }
});
async function doClean() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // ... heavy operation THINK how to remove timeout and wait for operation end instead
      resolve();
    }, 1);
  });
}

// window focussed or unfoccued
// app.on('browser-window-blur', (e) => {
//   console.log('app is unfoccused');
// });

// app.on('browser-window-focus', (e) => {
//   console.log('app is foccused');
// });

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createMainWindow();
});
