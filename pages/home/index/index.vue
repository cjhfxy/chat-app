<template>
	<view class="container">
		<view v-if="isLogin">
			<carousel :list="carouselList" />
			<notice :list="noticeList" :interval="3000" />
			<view class="content">
				<article-list :list="noticeList" />
			</view>
		</view>
		<view v-else>
			<image style="width: 750rpx; height: 100vh;" src="/static/images/down_bg.jpg"></image>
		</view>
	</view>
</template>

<script>
	import {
		getCarousels
	} from '@/api/system/index.js'
	import {
		getArticleById,
		getArticleList
	} from '@/api/article/index.js'
	import carousel from './component/carousel/'
	import notice from './component/notice/'
	import articleList from './component/article-list/'
	export default {
		components: {
			carousel,
			notice,
			articleList
		},
		data() {
			return {
				carouselList: [],
				noticeList: [],
				isLogin: false
			}
		},
		onLoad() {
			this.getCarousels()
			this.getNoticeList()
		},
		onShow() {
			this.getUserData()
		},
		onPullDownRefresh() {
			return new Promise(resolve => {
				Promise.allSettled([
					this.getCarousels(),
					this.getNoticeList(),
				]).then(results => {
					uni.stopPullDownRefresh()
					resolve()
				})
			})
		},
		methods: {
			getUserData() {
				return new Promise(resolve => {
					this.$store.dispatch('user/getIsLogin').then(data => {
						this.isLogin = data
						resolve()
					})
				})
			},
			getCarousels() {
				return new Promise((resolve, reject) => {
					getCarousels().then(data => {
						this.carouselList = data.list.filter(item => item.clientType === 2 && item
							.bizType === 1)
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			getNoticeList() {
				return new Promise((resolve, reject) => {
					getArticleById({
						categoryId: 1012
					}).then(data => {
						this.noticeList = data.list.slice(0, 3)
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		position: relative;

		.content {
			width: 100%;
			position: absolute;
			top: 830rpx;
			padding-bottom: 120rpx;
		}
	}
</style>
