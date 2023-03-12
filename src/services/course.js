import request from '@/utils/request'

// 分页查询课程信息
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 课程上下架接口
export const changeState = params => {
  return request({
    method: 'GET',
    url: '',
    params
  })
}

// 保存或更改课程信息的接口
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 上传图片接口
export const uploadCourseImage = (data, onUploadProgress) => {
  // data应当为FormData对象
  return request({
    method: 'POST',
    url: '',
    data,
    // axios属性onUploadProgress用于检测上传进度
    onUploadProgress
  })
}

// 通过课程ID获取课程信息的接口
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '',
    params: {
      courseId
    }
  })
}
