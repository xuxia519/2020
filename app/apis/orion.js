import request from '@utils/request'

export function fetchUser() {
  return request({
    url: '/orion/users/admin/list',
    method: 'get'
  })
}
