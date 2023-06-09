import request from '@/utils/request'

// 获取阿里云图片上传凭证和地址
export const aliyunImageUploadAddressAndAuth = () => {
  return request({
    method: 'GET',
    url: ''
  })
}

// 获取阿里云视频上传凭证和地址
export const aliyunVideoUploadAddressAndAuth = params => {
  return request({
    method: 'GET',
    url: '',
    params
  })
}

// 阿里云转码请求
export const aliyunVideoTranscode = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}

// 阿里云转码进度
export const getAliyunTranscodePercent = lessonId => {
  return request({
    method: 'GET',
    url: '',
    params: {
      lessonId
    }
  })
}
