import request from '@/utils/request'


// 注册
export function getCardList(data) {
  return request({
    url: `/v1/p/wallet_list/`,
    method: 'get',
    data
  })
}

export function addCard(data) {
  return request({
    url: '/v1/p/wallet/new/',
    method: 'post',
    data
  })
}

export function editCard(data) {
  return request({
    url: `/v1/p/wallet/${data.id}/`,
    method: 'post',
    data
  })
}

export function delCard(data) {
  return request({
    url: '/v1/p/wallet/',
    method: 'post',
    data
  })
}
//根据卡号判断银行
export function getBankByCard(data) {
  return request({
    url: `/v1/p/get_bank_by_card_no/`,
    method: 'get',
    data
  })
}
export function getBankList(data) {
  return request({
    url: '/v1/p/support_bank_list/',
    method: 'get',
    data
  })
}

//提现 
export function withdraw(data) {
  return request({
    url: '/v1/user/withdraw/',
    method: 'post',
    data
  })
}

//充值 
export function depositStep1(data) {
  return request({
    url: '/v1/o/deposit_step1/',
    method: 'post',
    data
  })
}


//充值 
export function depositStep2(data) {
  return request({
    url: '/v1/o/deposit_step2/',
    method: 'post',
    data
  })
}

//提现记录
export function getWithdrawLogs(data) {
  return request({
    url: '/v1/user/withdraw_logs/',
    method: 'get',
    data
  })
}

//01我的钱包列表
export function getWalletList(data) {
  return request({
    url: '/v1/p/wallet_list/',
    method: 'get',
    data
  })
}

// 02添加钱包
export function addWallet(data) {
  return request({
    url: '/v1/p/wallet/new/',
    method: 'post',
    data
  })
}