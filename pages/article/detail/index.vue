<template>
	<view class="content">
		<nav-bar :back="1" title="文章详情" />
		<view class="title">
			{{detail.title}}
		</view>
		<view class="time">
			<text>{{detail.categoryName}}</text>
			<text>{{detail.publishTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</text>
		</view>
		<view class="detail">
			<u-parse :content="detail.content" :tag-style="style" />
		</view>
	</view>
</template>

<script>
	import {
		getArticleDetail
	} from '@/api/article/index.js';
	export default {
		data() {
			return {
				detail: {},
				style: {
					p: 'margin-top: 10rpx;'
				},
				nftList: []
			}
		},
		onLoad(e) {
			this.getDetail(e.id)
		},
		methods: {
			getDetail(e) {
				return new Promise((resolve, reject) => {
					getArticleDetail({
						id: e
					}).then(data => {
						this.detail = data
						resolve()
					}).catch(() => {
						reject()
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		position: relative;
		padding: 40rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #212121;
			line-height: 1.2;
		}

		.time {
			margin-top: 40rpx;
			font-size: 20rpx;
			color: #aaa;
			display: flex;
			justify-content: space-between;
		}

		.detail {
			margin-top: 40rpx;
			font-size: 28rpx;
			color: #212121 ;
		}
	}
</style>
