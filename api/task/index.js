import request from '@/utils/request'

//  获取分类列表
export function getCategories(data) {
	return request({
		url: '/v1/p/categories/',
		method: 'get',
		data: {}
	})
}

//  获取任务列表
export function getTaskList(data) {
	return request({
		url: '/v1/p/task_list/',
		method: 'post',
		data
	})
}

//  根据分类ID获取任务列表
export function getTaskListByCategory(data) {
	return request({
		url: '/v1/p/task_list_by_category/',
		method: 'post',
		data
	})
}

//  获取忽略的任务
export function getIgnoreTaskList(data) {
	return request({
		url: '/v1/p/ignore_task_list/',
		method: 'get',
		data: {}
	})
}


// 忽略任务
export function ignoreTask(data) {
	return request({
		url: '/v1/p/ignore_task/',
		method: 'post',
		data
	})
}


// 恢复忽略任务
export function addIgnoreTask(data) {
	return request({
		url: '/v1/p/add_ignored_task/',
		method: 'post',
		data
	})
}


// 接单
export function attendTask(data) {
	return request({
		url: '/v1/p/attend_task/',
		method: 'post',
		data
	})
}

//吃单反馈
export function onFeedbackLost(data) {
	return request({
		url: '/v1/p/feedback_lost/',
		method: 'post',
		data
	})
}

