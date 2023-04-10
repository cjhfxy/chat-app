import request from '@/utils/request'


// 注册
export function register(data) {
  return request({
    url: '/v1/user/new/',
    method: 'post',
    data
  })
}


// 手机号码登录
export function loginByPhone(data) {
  return request({
    url: '/v1/user/login_app/',
    method: 'post',
    data
  })
}


// 判断用户是否已登录
export function getIsLogin(data) {
  return new Promise(resolve => {
    return request({
      url: '/v1/user/is_login/',
      method: 'get',
      data
    }).then(data => {
      resolve(data.login)
    }).catch(() => {
      resolve(false)
    })
  })
}

// 获取用户信息
export function getUserInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/user/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}

// 注销
export function logout() {
  return request({
    url: '/v1/user/logout/',
    method: 'post',
    data: {}
  })
}

//获取短信验证码
export function getVcode(data) {
  return request({
    url: '/v1/user/request_sms/',
    method: 'post',
    data
  })
}

//余额明细
export function getBalanceLog(data) {
  return request({
    url: '/v1/user/balance_logs/',
    method: 'get',
    data
  })
}


// 获取验证码图片
export function getCaptcha(data) {
  return request({
    url: '/v1/p/captcha/gen/',
    method: 'get',
    data
  })
}

//请求验证
export function checkCaptcha(data) {
  return request({
    url: '/v1/p/captcha/check/',
    method: 'post',
    data
  })
}


//获取我的任务
export function getMyTaskList(data){
	return request({
		url:'/v1/p/my_tasks/',
		method:'get',
		data
	})
}



//获取我的任务详情
export function getMyTaskDateil(data){
	return request({
		url:`/v1/p/my_tasks/${data.id}/`,
		method:'get',
		data:{}
	})
}

//获取我的待完成任务数
export function myTaskStat(data){
	return request({
		url:'/v1/p/my_task_stat/',
		method:'get',
		data:{}
	})
}


//用户手机号码库
export function getPhoneList(data){
	return request({
		url:'/v1/p/my_phone_number_list/',
		method:'get',
		data:{}
	})
}

//提交验证码
export function submitVcode(data) {
  return request({
    url: '/v1/p/submit_vcode/',
    method: 'post',
    data
  })
}

// 多级客户列表
export function getInviteList(data) {
  return request({
    url: '/v1/user/invite_list/',
    method: 'GET',
    data: data
  })
}

// 奖励列表
export function getAwardList(data) {
  return request({
    url: '/v1/user/deal_awards/',
    method: 'GET',
    data: data
  })
}

// 月结记录列表
export function getAwardMonth(data) {
  return request({
    url: '/v1/user/deal_month_awards/',
    method: 'GET',
    data: data
  })
}

export function getHistoryAwardStat(data) {
  return request({
    url: '/v1/user/deal_award_month_stat/',
    method: 'GET',
    data: data
  })
}

// 本月提成
export function getAwardCommission(data) {
  return request({
    url: '/v1/user/award_stat/',
    method: 'GET',
    data: data
  })
}

// 查询手机号码归属地
export function getPhoneGeo(data) {
  return request({
    url: `/v1/p/phone_number_geo/${data.phoneNumber}/`,
    method: 'GET',
    data: data
  })
}


// 提交反馈
export function submitShot(data) {
	return request({
		url: '/v1/p/submit_shot/',
		method: 'post',
		data
	})
}

// 今日收益预测
export function getTodayIncomePredict(data) {
  return request({
    url: `/v1/user/today_income_predict/`,
    method: 'GET',
    data: data
  })
}

// 提交建议
export function suggestion(data) {
  return request({
    url: `/v1/user/suggestion/`,
    method: 'post',
    data: data
  })
}

// 美元汇率
export function getCnyUsd() {
  return request({
    url: `/v1/user/cny_usd/`,
    method: 'get'
  })
}

// 吃单反馈列表
export function getMyFeedbackList() {
  return request({
    url: '/v1/p/my_feedback_list/',
    method: 'get'
  })
}