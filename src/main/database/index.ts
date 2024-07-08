import logger from 'electron-log'
import { AppDataSource } from './data-source'
import { initArchiveApi } from './repository/archive'
import { initStorageApi } from './repository/storage'
// 绑定api接口
export function setupServerApi(server) {
  // 连接 Sqlite 数据库
  AppDataSource.initialize()
    .then(() => {
      initArchiveApi(server)
      initStorageApi(server)
    })
    .catch((err) => {
      logger.error(err)
    })
}
