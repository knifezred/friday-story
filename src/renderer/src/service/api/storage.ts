import { request } from '../request'

export function fetchStorageListByKey(key: string) {
  return request<Dto.DbStorageList>({
    url: '/storage/list',
    method: 'post',
    data: { key: key }
  })
}

export function findStorage(key: string) {
  return request<Dto.DbStorage>({
    url: `/storage/filter-key`,
    method: 'get',
    params: { key: key }
  })
}

export function createStorage(params: Dto.DbStorage) {
  return request<boolean>({
    url: '/storage',
    method: 'post',
    data: params
  })
}

export function updateStorage(params: Dto.DbStorage) {
  return request<boolean>({
    url: `/storage/${params.key}`,
    method: 'post',
    data: params
  })
}

export function deleteStorage(ids: number | number[]) {
  return request<boolean>({
    url: `/storage/`,
    method: 'delete',
    data: ids
  })
}
