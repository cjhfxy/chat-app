const Mixin = {
  data() {
    return {
      currentPage: 1,
      loadMore: false,
      noMore: false,
      isEmpty: false
    }
  },
  onPullDownRefresh() {
    this.triggerDown().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    this.triggerUp()
  },
  methods: {
    triggerInit() {
      return new Promise(resolve => {
        this.currentPage = 1
        this.loadMore = true
        this.isEmpty = this.noMore = false
        this.downCallback().then(res => {
			
          if (!Array.isArray(res)) {
            res = [res, res]
          }
          this.loadMore = false
          this.noMore = !res[0]
          this.isEmpty = !res[1]
          resolve()
        })
      })
    },
    resetUp() {
      return new Promise(resolve => {
        this.currentPage = 1
        this.loadMore = true
        this.isEmpty = this.noMore = false
        this.upCallback().then(res => {
          if (!Array.isArray(res)) {
            res = [res, res]
          }
          this.loadMore = false
          this.noMore = !res[0]
          this.isEmpty = !res[1]
          resolve()
        })
      })
    },
    triggerDown() {
      return new Promise(resolve => {
        this.currentPage = 1
        this.loadMore = true
        this.downCallback().then(res => {
          if (!Array.isArray(res)) {
            res = [res, res]
          }
          this.loadMore = false
          this.noMore = !res[0]
          this.isEmpty = !res[1]
          resolve()
        })
      })
    },
    triggerUp() {
      return new Promise(resolve => {
        if (this.noMore) return
        this.loadMore = true
        const page = this.currentPage + 1
        this.upCallback(page).then(res => {
          if (!Array.isArray(res)) {
            res = [res, res]
          }
          this.loadMore = false
          this.noMore = !res[0]
          this.currentPage = page
          resolve()
        })
      })
    }
  }
}

export default Mixin
