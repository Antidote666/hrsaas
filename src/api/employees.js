import request from '@/utils/request'

export const getEmployeeSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

export function getEmployeesInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

export function saveEmployeesInfo(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}

export function getEmployeesJobInfo(id) {
  return request({
    url: `/employess/${id}/jobs`
  })
}

export function saveEmployeesJobInfo(data) {
  return request({
    url: `/employess/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
