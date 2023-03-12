import request from '@/utils/request'

// 获取角色
export const getRoles = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 删除角色
export const deleteRole = id => {
  return request({
    method: 'DELETE',
    url: ''
  })
}

// 保存或更新角色
export const createOrUpdate = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 获取角色
export const getRoleById = id => {
  return request({
    method: 'GET',
    url: ''
  })
}

// 获取所有角色
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: ''
  })
}

// 给用户分配角色
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 查询用户角色
export const getUserRoles = userId => {
  return request({
    method: 'GET',
    url: '',
    params: {
      userId
    }
  })
}
