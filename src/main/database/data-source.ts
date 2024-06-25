import { is } from '@electron-toolkit/utils'
import { app } from 'electron'
import { DataSource } from 'typeorm'
import { Archive } from './entity/archive'
import { Storage } from './entity/storage'
import { User } from './entity/user'

const dbPath = app.getPath('documents') + 'friday-story/saves/db.sqlite'
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [Storage, User, Archive],
  synchronize: is.dev,
  logger: 'file',
  logging: true
})
