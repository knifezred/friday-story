import { AppDataSource } from '../data-source'
import { Archive } from '../entity/archive'

export function initArchiveApi(server) {
  const repository = AppDataSource.getRepository(Archive)
  server.get('/api/archive/:id', async (req, res) => {
    try {
      const result = await repository.findOneBy({ id: req.params.id })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.post('/api/archive/', async (req, res) => {
    try {
      const result = await repository.save(req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.get('/api/archive/latest', async (_req, res) => {
    try {
      const result = (await repository.find()).sort((a, b) => a.saveTime - b.saveTime)
      if (result.length > 0) {
        res.status(200).json(result[0])
      } else {
        res.status(200).json(null)
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.post('/api/archive/:id', async (req, res) => {
    try {
      const result = await repository.update(req.params.id, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.delete('/api/archive/:id', async (req, res) => {
    try {
      const result = await repository.delete(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.delete('/api/archive/batch-delete', async (req, res) => {
    try {
      const result = await repository.delete(req.data.ids)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  server.post('/api/archive/list', async (_req, res) => {
    try {
      const result = repository.find()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  })
}
