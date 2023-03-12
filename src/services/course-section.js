import request from '@/utils/request'

// 获取章节和课时
export const getSectionAndLesson = courseId => {
  return request({
    method: 'GET',
    url: '',
    params: {
      courseId
    }
  })
}

// 新增或更新章节
export const saveOrUpdateSection = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 新增或更新课时
export const saveOrUpdateLesson = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}
