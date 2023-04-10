import request from '@/utils/request'

export function getCarousels(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/carousels/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}

// 38归集列表
export function getClassifys(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/classify_list/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}

//获取所有参数配置
export function getParamConfigList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/param_config_list/',
      method: 'get',
      data
    }).then(data => {
      let list = {}
			data.list.forEach(item=>{
				list[item.k] = item.v;
			})
      resolve(list)
    }).catch(() => {
      reject()
    })
  })
}
// 获取参数配置
export function getParamConfig(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/param_config/',
      method: 'get',
      data
    }).then(data => {
      data.value = data.value.replace(/\\n/g, '<br>')
      data.value = data.value.replace(/[\n\r]/g, '<br>')
      resolve(data.value)
    }).catch(() => {
      reject()
    })
  })
}


export function checkUpdate(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/user/check_update/',
      method: 'post',
      data
    }).then(data => {
      resolve(data)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 搜索关键字
export function getSearchKey(data) {
	return request({
		url:'/v1/p/search_keywords/',
		method: 'get',
		data
	})
}