import { getParamConfigList,checkUpdate } from '@/api/system'


const state = {
  navBarInfo: {},
	parmeConifg:{},
}

const mutations = {
  SET_NAV_BAR_INFO: (state, navBarInfo) => {
    state.navBarInfo = navBarInfo
  },
	SET_PARAME_CONFIG: (state, parmeConifg) => {
    state.parmeConifg = parmeConifg
  },
	SET_VERSION: (state, version) => {
	  state.version = version
	},
	SET_PROGRESS: (state, progress) => {
	  state.progress = progress
	},
}

const actions = {
  getNavBarInfo({ commit }) {
    return new Promise(resolve => {
      let menuButtonInfo = {}
      // #ifdef MP-WEIXIN
      menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      // #endif
      const top = menuButtonInfo.top
      const bottom = menuButtonInfo.bottom
      const navBarTop = top - 8
      const navBarHeight = bottom + 8
      const navBarInfo = {
        top: navBarTop,
        height: navBarHeight
      }
      commit('SET_NAV_BAR_INFO', navBarInfo)
      resolve(navBarInfo)
    })
  },
	getParamConfig({ commit }) {
	  return new Promise((resolve, reject) => {
	    getParamConfigList().then(data => {
	      commit('SET_PARAME_CONFIG', data)
	      resolve(data)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	getVersion({
	  commit
	}) {
	  return new Promise(resolve => {
	    plus.runtime.getProperty(plus.runtime.appid, info => {
	      commit('SET_VERSION', info.versionCode)
	      resolve(info)
	    })
	  })
	},
	checkUpdate({
	  commit,
	  dispatch
	}) {
	  return new Promise(resolve => {
	    dispatch('getVersion').then(version => {
	      const code = version.versionCode
	      const info = uni.getSystemInfoSync()
	      const platform = info.platform.toLowerCase()
	      const system = info.system
	      const brand = info.brand
	      const model = info.model
				console.log(version.versionCode)
	      checkUpdate({
	        deviceId: plus.device.uuid,
	        versionNumber: code,
	        platform,
	        system,
	        brand,
	        model
	      }).then(data => {
	        if (!data.needUpdate) return resolve(false)
					resolve(true)
	      })
	    })
	  })
	}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
