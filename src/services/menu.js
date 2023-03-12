import request from '@/utils/request'

// 获取编辑菜单页面信息
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    // url: `/xxx/xxx?id=${id}`
    url: '',
    params: {
      id
    }
  })
}

// 添加菜单接口
export const createOrUpdateMenu = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 获取所有菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: ''
  })
}

// 删除菜单接口
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: '',
    params: {
      id
    }
  })
}

// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: ''
  })
}

// 给角色分配菜单
export const allocateRoleMenus = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 获取当前角色拥有的菜单列表接口
export const getRoleMenus = roleId => {
  return request({
    method: 'GET',
    url: '',
    params: {
      roleId
    }
  })
}
