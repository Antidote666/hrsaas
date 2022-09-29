import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const addRole = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
