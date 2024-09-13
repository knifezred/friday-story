import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      listDir(dirPath: string): Promise<Array<string>>
      readFile(filePath: string): Promise<string>
      isFileExist(filePath: string): Promise<boolean>
    }
  }
}
