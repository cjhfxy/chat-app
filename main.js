import App from './App'
import Vue from 'vue'
import store from './store'
import request from './utils/request'
import * as filters from './utils/filters'
import config from '@/config/'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


Vue.prototype.$request = request
Object.keys(filters).forEach(key => {
  Vue.prototype[`$${key}`] = filters[key]
  Vue.filter(key, filters[key])
})

Vue.prototype.$tabList = config.tabList

import NavBar from '@/components/nav-bar/'
Vue.component('nav-bar', NavBar)

// 路由跳转
Vue.prototype.$jumpPage = (e, type = 'navigate') => {
  if (typeof e === 'number') {
    uni.navigateBack({
      delta: e
    })
  } else if (typeof e === 'string') {
    if (config.tabList.some(item => item === e)) {
      uni.switchTab({
        url: e
      })
    } else {
      if (type === 'navigate') {
        uni.navigateTo({
          url: e
        })
      } else {
        uni.redirectTo({
          url: e
        })
      }
    }
  }
}

Vue.prototype.$openMap = (longitude, latitude, name, address) => {
  uni.openLocation({
    longitude,
    latitude,
    name,
    address
  })
}

Vue.prototype.$callPhone = e => {
  uni.makePhoneCall({
    phoneNumber: e
  })
}

Vue.prototype.$sacnCode = () => {
  uni.scanCode({
    success: res => {
      const resultStr = res.result
    }
  })
}

Promise.allSettled = Promise.allSettled || function(iterable) {
  return new Promise(resolve => {
    let index = 0
    for (const promise of iterable) {
      const current = index++
      promise.then(
        value => addResToResults(
          current, {
            status: 'fulfilled',
            value
          }
        ),
        reason => addResToResults(
          current, {
            status: 'rejected',
            reason
          }
        )
      )
    }
    if (index === 0) {
      resolve([])
      return
    }
    const results = []
    let count = 0

    function addResToResults(i, res) {
      results[i] = res
      if (++count === index) {
        resolve(results)
      }
    }
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()

