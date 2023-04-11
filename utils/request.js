import {
	md5
} from '@/utils/md5'
import store from '@/store'
import config from '@/config'

let isConnected = false
let networkType = 'none'
uni.onNetworkStatusChange((a, b) => {
	isConnected = a
	networkType = b
})
export {
	isConnected,
	networkType
}

function request({
	url,
	method,
	data
}) {
	return new Promise((resolve, reject) => {
		const token = store.getters.token
		const uid = store.getters.uid

		const t = Date.now()
		const nonce = uni.$u.guid(36)
		const s = md5(token + md5(token + config.saltKey + t + nonce))

		url = config.baseUrl + url
		uni.request({
			url,
			method,
			data,
			header: {
				'X-AUTH-TOKEN-UID': uid,
				t,
				nonce,
				s,
				'X-Requested-With': '*',
				'Csrf-Token': 'nocheck'
			},
			success: response => {
				const res = response.data
				if (res.code !== 200) {
					if (res.code === 403 || res.code === -1) {
						// 清空登录状态
						store.dispatch('user/reset')
						// 获取当前页面
						const pages = getCurrentPages()
						const current = pages[pages.length - 1]
						let path = '/' + current.route
						const param = current.options || (current.$route ? current.$route.query :
							[])
						for (const key in param) {
							if (path.indexOf('?') === -1) {
								path += `?${key}=${param[key]}`
							} else {
								path += `&${key}=${param[key]}`
							}
						}
						// path = encodeURIComponent(path)
						// if (current.route.indexOf('pages/user/login/index') === -1) {
						// 	if (config.tabList.some(item => item === current.route === item)) {
						// 		uni.navigateTo({
						// 			url: `/pages/user/login/index?redirect=${path}`
						// 		})
						// 	} else {
						// 		uni.redirectTo({
						// 			url: `/pages/user/login/index?redirect=${path}`
						// 		})
						// 	}
						// }
						reject('暂未登录!')
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.reason || '请求错误,请稍后重试!',
							icon: 'none',
							duration: 3000
						})
						reject(res.reason || '请求错误,请稍后重试!')
					}
				} else {
					resolve(res)
				}
			},
			fail: () => {
				uni.hideLoading()
				if (isConnected) {
					uni.showToast({
						title: '请求超时,请稍后重试!',
						icon: 'none'
					})
					reject('请求超时,请稍后重试!')
				} else {
					uni.showToast({
						title: '当前没有联网,请检查网络后重试!',
						icon: 'none'
					})
					reject('当前没有联网,请检查网络后重试!')
				}
			}
		})
	})
}

export default request