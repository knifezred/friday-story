import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserView, BrowserWindow, app, ipcMain, session, shell } from 'electron'
import fs from 'fs'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    resizable: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createNewWindow(partition, url = ''): BrowserView {
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false, // 根据需要设置是否启用 Node.js 集成
      contextIsolation: false, // 如果 nodeIntegration 为 true，则无需设置此选项
      partition: partition
    }
  })

  view.setAutoResize({ width: true, height: true })
  view.setBounds({ x: 240, y: 0, width: 1680, height: 1080 })
  if (url != '') {
    view.webContents.loadURL(url)
  }
  return view
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('create-new-window', (event, arg) => {
  console.log(event.processId)
  const view = createNewWindow(arg.partition, arg.url)
  mainWindow.addBrowserView(view)
  const bvSession = session.fromPartition(arg.partition)
  bvSession.cookies.on('changed', (event, cookie, cause, removed) => {
    if (cause == 'explicit') {
      if (cookie.name == 'sessionid' && arg.url.indexOf('douyin.com') > -1) {
        console.log('Cookie changed:', event, cookie, cause, removed)
        bvSession.cookies.get({}).then((cookies) => {
          fs.writeFile(filePath, JSON.stringify(cookies), 'utf8', (err) => {
            if (err) throw err
            console.log('cookies has been saved to ' + filePath)
          })
        })
      }
      if (cookie.name == 'BDUSS' && arg.url.indexOf('baidu.com') > -1) {
        console.log('Cookie changed:', event, cookie, cause, removed)
        bvSession.cookies.get({ name: 'BDUSS' }).then((cookies) => {
          fs.writeFile(filePath, JSON.stringify(cookies), 'utf8', (err) => {
            if (err) throw err
            console.log('cookies has been saved to ' + filePath)
          })
        })
      }
    }
    // cookie 是一个包含 cookie 信息的对象
    // cause 是一个字符串，表示 cookie 变化的原因（例如 "explicit" 表示由 set 方法设置的，"overwrite" 表示被另一个 cookie 覆盖，"expire" 表示过期等）
    // removed 是一个布尔值，如果 cookie 被移除了则为 true，否则为 false

    // 你可以根据需要在这里处理 cookie 的变化
  })

  const filePath = path.join(app.getPath('documents'), 'data' + arg.partition + '.json')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }
    if (data != null) {
      const cookies = JSON.parse(data)
      cookies.forEach((cookie) => {
        console.log('cookie set: ' + cookie.name)
        const url = new URL(arg.url)
        bvSession.cookies.set({
          url: 'https://' + url.host,
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          sameSite: cookie.sameSite
        })
      })
      view.webContents.reload()
    }
  })
})
ipcMain.on('set-cookies', (event, arg) => {
  console.log(event.processId)
  const mySession = session.fromPartition(arg.partition)
  arg.cookies.forEach((cookie) => {
    mySession.cookies.set(cookie).then(/* 处理成功 */).catch(/* 处理错误 */)
  })
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
