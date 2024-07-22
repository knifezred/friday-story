import fs from 'fs'
import path from 'node:path'

export function traverseDir(dirPath, fileList: Array<string>) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err)
      return
    }

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file)

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          return console.error('Error getting stats: ', err)
        }

        if (stats.isDirectory()) {
          console.log(`${fullPath} is a directory`)
          // 递归遍历子目录
          traverseDir(fullPath, fileList)
        } else {
          fileList.push(
            '/static/' + fullPath.split('/static/')[fullPath.split('/static/').length - 1]
          )
          console.log(`${fullPath} is a file`)
        }
      })
    })
  })
}
