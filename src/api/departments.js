import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

export const addDepartments = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
