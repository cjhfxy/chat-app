import request from '@/utils/request'


//文章列表
export function getArticleList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/articles/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch((e) => {
      reject(e)
    })
  })
}


// 根据分类ID获取文章
export function getArticleById(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/articles_by_category_id/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}


// 获取文章详情
export function getArticleDetail(data) {
  return new Promise((resolve, reject) => {
    request({
      url: `/v1/p/articles/${data.id}/`,
      method: 'get',
      data: {}
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}


// 获取文章分类列表
export function getCategroyList(data) {
  return new Promise((resolve, reject) => {
    request({
      url: '/v1/p/article_categories/',
      method: 'get',
      data
    }).then(data => {
      resolve(data)
    }).catch(() => {
      reject()
    })
  })
}
