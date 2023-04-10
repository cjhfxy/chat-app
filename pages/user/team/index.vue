<template>
	<view class="container">
		<nav-bar title="我的团队" :back="1" />
		<u-tabs :itemStyle="{
							padding:'26rpx 0 28rpx 0',
							borderBottom: '2rpx solid #E6E6E6',
							marginBottom:'1rpx',
							width:'375rpx'
						}" :bold="false" active-color="#212121" inactive-color="#BDBDBD" :list="tabList" :is-scroll="false"
			:current="current" lineWidth="375rpx" lineHeight="4rpx" @change="setLevel" />
		<view class="top">
			<view class="item">
				<view class="title">
					成员总数
				</view>
				<view class="content">
					{{ totalMembers }}
				</view>
			</view>
		</view>
		<view class="list">
			<item v-for="(item, index) in list" :key="index" :item="item" />
		</view>
		<view v-if="!list.length && load" class="no">
			暂无成员
		</view>
	</view>
</template>

<script>
	import item from './components/item/index.vue'
	import Mixin from '@/utils/mixin.js'
	import {
		getInviteList
	} from '@/api/user/index.js'
	export default {
		components: {
			item
		},
		mixins: [Mixin],
		data() {
			return {
				list: [],
				load: false,
				level: 1,
				totalMembers:0,
				tabList: [{
					name: '主队',
					value: 1
				}, {
					name: '副队',
					value: 2
				}],
				current: 0
			}
		},
		onLoad() {
			this.triggerInit()
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			}
		},
		methods: {
			setLevel(e) {
				this.current = e.index
				this.level = e.value
				this.triggerInit()
			},
			downCallback() {
				return new Promise(resolve => {
					Promise.allSettled([
						this.getList(1)
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
			},
			getList(page = 1) {
				return new Promise((resolve, reject) => {
					getInviteList({
						page: page,
						level: this.level
					}).then(data => {
						const tempList = data.list.map(item => {
							return item
						})
						if (page === 1) {
							this.totalMembers = data.totalMembers
							this.list = tempList
						} else {
							this.list = this.list.concat(tempList)
						}
						this.load = true
						resolve([data.hasNext, data.list.length])
					}).catch(() => {
						reject()
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #FFFFFF;

		.top {
			width: 702rpx;
			height: 184rpx;
			background: linear-gradient(270deg, #014C94 0%, #3E96E9 100%);
			border-radius: 12rpx;
			margin: 24rpx auto 0 auto;
			display: flex;
			justify-content: center;

			.item {
				width: 33%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.title {
					font-size: 12px;
					color: #FFFFFF;
				}

				.content {
					font-size: 24px;
					color: #FFFFFF;
				}
			}
		}

		.list {
			overflow: hidden;
		}

		.no {
			height: 80vh;
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #757575;
			font-size: 14px;
		}
	}
</style>
