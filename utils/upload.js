import {
  md5
} from '@/utils/md5'
import config from '@/config/'

const Upload = {
  data() {
    return {
      action: config.baseUrl + '/v1/user/upload/',
      header: {}
    }
  },
  methods: {
    async beforeUpload() {
      const token = this.$store.getters.token
      const uid = this.$store.getters.uid

      const t = Date.now()
      const nonce = uni.$u.guid(36)
      const s = md5(token + md5(token + config.saltKey + t + nonce))
      this.header = {
        'X-AUTH-TOKEN-UID': uid,
        t,
        nonce,
        s
      }
    }
  }
}

export default Upload
