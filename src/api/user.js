import request from '@/utils/request'

export function login(data) {

}

export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

export const getUserDetailById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

export const saveEmployeeBasicInformation = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

export const saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

export function logout() {

}
