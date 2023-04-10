<template>
  <u-upload
    :file-list="fileList"
    multiple
    :max-count="maxCount"
    :width="width"
    :height="height"
    @afterRead="afterRead"
    @delete="deletePic"
  >
    <image
      v-if="customImg"
      :src="customImg"
      mode="widthFix"
      style="width: 250px;height: 150px;"
      :style="{ width: width + 'px' }"
    />
  </u-upload>
</template>

<script>
import {
  md5
} from '@/utils/md5'
import config from '@/config/'
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    maxCount: {
      type: Number,
      default: 1
    },
    customImg: {
      type: String,
      default: '/static/images/upload_files.png'
    },
    width: {
      type: Number,
      default: 80
    },
    height: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 图片数组数据
    fileList: {
      get() {
        return this.value
      }
    }
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1)
      this.$emit('input', this.fileList)
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      const lists = [].concat(event.file)
      let fileListLen = this.fileList.length
      lists.map((item) => {
        this.fileList.push({
          url: '',
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        const item = this.fileList[fileListLen]
        this.fileList.splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result.url
        }))
        fileListLen++
      }
      this.$emit('input', this.fileList)
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        const token = this.$store.getters.token
        const uid = this.$store.getters.uid

        const t = Date.now()
        const nonce = uni.$u.guid(36)
        const s = md5(token + md5(token + config.saltKey + t + nonce))
        uni.uploadFile({
          url: config.baseUrl + '/v1/user/upload/',
          filePath: url,
          name: 'file',
          header: {
            'X-AUTH-TOKEN-UID': uid,
            t,
            nonce,
            s,
            'X-Requested-With': '*',
            'Csrf-Token': 'nocheck'
          },
          success: (res) => {
            const data = JSON.parse(res.data)
            if (data.code === 200) {
              resolve(data)
            } else {
              uni.showToast({
                title: '上传失败,请稍后重试!',
                icon: 'none'
              })
              reject()
            }
          }
        })
      })
    }
  }

}
</script>

<style>
</style>
