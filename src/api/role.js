import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data,
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data,
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete',
  })
}
