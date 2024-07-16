import { localStg } from '@renderer/utils/storage'

/** Get token */
export function getToken() {
  return localStg.get('token') || ''
}

/** Get user info */
export function getUserInfo() {
  const emptyInfo: Dto.Auth.UserInfo = {
    userId: 0,
    userName: 'guest',
    roles: ['NormalPlayer'],
    buttons: [],
    archive: {
      id: 0,
      name: '',
      cover: '',
      saveTime: 0,
      totalTime: 0,
      place: 0,
      data: ''
    }
  }
  const userInfo = localStg.get('userInfo') || emptyInfo

  // fix new property: buttons, this will be removed in the next version `1.1.0`
  if (!userInfo.buttons) {
    userInfo.buttons = []
  }

  return userInfo
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('token')
  localStg.remove('refreshToken')
  localStg.remove('userInfo')
}
