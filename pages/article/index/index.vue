<template>
	<view class="container">
		<nav-bar title="文章列表" :back="1" />
		<view v-if="isEmpty" class="empty">
			<wl-empty text="暂无文章" icon="/static/empty/order.png"></wl-empty>
		</view>
		<view v-else class="list">
			<article-item v-for="(item, index) in list" :key="index" :item="item" />
			<u-loadmore :status="noMore || loadMore ? 'nomore' : 'loading'" bg-color="transparent" margin-top="24"
				margin-bottom="48" />
		</view>
	</view>
</template>

<script>
	import Mixin from '@/utils/mixin.js'
	import articleItem from '../component/article-item.vue'
	import {
		getArticleList
	} from '@/api/article/index.js'
	export default {
		components:{
			articleItem
		},
		mixins: [Mixin],
		data() {
			return {
				list: []
			}
		},
		onLoad(e) {
			
		},
		onShow() {
			this.triggerInit()
		},
		methods: {
			getList(page = 1) {
				return new Promise((resolve, reject) => {
					getArticleList({
						page
					}).then(data => {
						if (page === 1) {
							this.list = data.list
						} else {
							this.list = this.list.concat(data.list)
						}
						resolve([data.hasNext, data.list.length])
					}).catch(() => {
						reject()
					})
				})
			},
			downCallback() {
				return new Promise(resolve => {
					Promise.allSettled([
						this.getList()
					]).then(results => {
						resolve(results[0].value)
					})
				})
			},
			upCallback(page) {
				return new Promise(resolve => {
					this.getList(page).then(length => {
						resolve(length)
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #fff;
		.list {
			overflow: hidden;
			padding: 0 20rpx;
		}
	}
</style>
