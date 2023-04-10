import request from '@/utils/request'

// 修改用户信息
export function modUserInfo(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/user/',
      method: 'post',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}

//设置支付密码
export function setPayPassword(data) {
  return request({
    url: '/v1/user/set_pay_password/',
    method: 'post',
    data
  })
}

//向自己发送手机验证码
export function verifyUser(data) {
  return request({
    url: '/v1/user/request_user_vcode/',
    method: 'post',
    data
  })
}

//设置登录密码
export function setLoginPassword(data) {
  return request({
    url: '/v1/user/set_login_password/',
    method: 'post',
    data
  })
}

//重置登录密码
export function resetLoginPassword(data) {
  return request({
    url: '/v1/user/reset_login_password/',
    method: 'post',
    data
  })
}


//验证账号是否有效
export function validAccount(data) {
  return request({
    url: `/v1/user/is_valid_account/${data.accountName}/`,
    method: 'get',
    data:{}
  })
}

//29推荐用户列表
export function getShareList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/user/invite_list/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}
