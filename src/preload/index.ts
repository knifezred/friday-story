import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
// Custom APIs for renderer
const api = {
  listDir: async (dirPath: string) => {
    const fileList = [] as Array<string>
    const appPath = await ipcRenderer.invoke('app-path')
    let staticPath = path.join(appPath, 'static')
    if (dirPath != '') {
      staticPath = path.join(appPath, dirPath)
    }
    if (!dirPath.endsWith('/')) {
      dirPath = dirPath + '/'
    }
    try {
      const files = fs.readdirSync(staticPath)
      files.forEach((file) => {
        const fullPath = path.join(staticPath, file)
        if (fs.statSync(fullPath).isFile()) {
          fileList.push(dirPath + file)
        }
      })
    } catch (error) {
      console.log(error)
    }
    console.log(fileList)
    return fileList
  },
  isFileExist: async (filePath: string) => {
    try {
      const appPath = await ipcRenderer.invoke('app-path')
      const staticPath = path.join(appPath, filePath)
      fs.accessSync(staticPath, fs.constants.F_OK)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
