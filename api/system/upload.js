import {
  md5
} from '@/utils/md5'
import store from '@/store'
import config from '@/config'

export default function upload() {
  return new Promise((resolve, reject) => {
    const token = store.getters.token
    const uid = store.getters.uid

    const t = Date.now()
    const nonce = uni.$u.guid(36)
    const s = md5(token + md5(token + config.saltKey + t + nonce))

    uni.chooseImage({
      count: 1,
      success: res => {
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        const uploadType = res.type
        uni.uploadFile({
          url: config.baseUrl + '/v1/user/upload/',
          name: 'file',
          filePath: res.tempFilePaths[0],
          header: {
            'X-AUTH-TOKEN-UID': uid,
            t,
            nonce,
            s
          },
          success: res => {
            const data = JSON.parse(res.data)
            data.type = uploadType
            if (data.code === 200) {
              resolve(data)
            } else {
              uni.showToast({
                title: '上传失败,请稍后重试!',
                icon: 'none'
              })
              reject()
            }
          },
          complete() {
            uni.hideLoading()
          }
        })
      }
    })
  })
}
