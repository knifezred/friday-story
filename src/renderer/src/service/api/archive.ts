import { request } from '../request'
export function fetchArchiveList() {
  return request<Dto.DbArchiveList>({
    url: '/archive/list',
    method: 'post'
  })
}
export function findLatestArchive() {
  return request<Dto.DbArchive>({
    url: '/archive/latest',
    method: 'post'
  })
}

export function findArchive(id: number) {
  return request<Dto.DbArchive>({
    url: `/archive/${id}`,
    method: 'get'
  })
}

export function createArchive(params: Dto.DbArchive) {
  return request<Dto.DbArchive>({
    url: '/archive',
    method: 'post',
    data: params
  })
}

export function updateArchive(params: Dto.DbArchive) {
  return request<boolean>({
    url: `/archive/${params.id}`,
    method: 'post',
    data: params
  })
}

export function deleteArchive(id: number) {
  return request<boolean>({
    url: `/archive/${id}`,
    method: 'delete'
  })
}

export function batchDeleteArchive(ids: number[]) {
  return request<boolean>({
    url: `/archive/batch-delete`,
    method: 'delete',
    data: { ids }
  })
}
