<template>
	<view class="order-list">
		<nav-bar title="任务台" :back="1" />
		<view class="header">
			<head-box @search="search" />
			<view class="tabs">
				<view v-for="(item, index) in tabList" :key="index" class="item" @tap="select(item.value)">
					<text :class="['text', {active: item.value === current}]">{{ item.label }}</text>
				</view>
			</view>
		</view>
		<view v-if="!taskList.length" class="empty">
			<wl-empty text="暂无记录" icon="/static/empty/order.png"></wl-empty>
		</view>
		<view v-else class="list">
			<view v-show="show" class="fade">
				<task-item v-for="(item, index) in taskList" :key="index" :item="item" />
			</view>
		</view>
	</view>
</template>

<script>
	import headBox from './component/head-box'
	import taskItem from './component/task-item'
	import Mixin from '@/utils/mixin.js'
	import {
		getMyTaskList
	} from '@/api/user/index'
	export default {
		components: {
			headBox,
			taskItem
		},
		mixins: [Mixin],
		data() {
			return {
				current: 1,
				phoneNumber: '',
				show: true,
				tabList: [{
					label: '未完成',
					value: 20,
				}, {
					label: '已完成',
					value: 110,
				}],
				taskList: [],
			}
		},
		onLoad(e) {
			if (e.current) {
				this.current = +e.current
			}
		},
		onShow() {
			this.triggerInit()
		},
		methods: {
			search(e) {
				this.phoneNumber = e
				this.triggerInit()
			},
			getList(page = 1) {
				return new Promise((resolve, reject) => {
					getMyTaskList({
						status: this.current,
						phoneNumber: this.phoneNumber,
						page
					}).then(data => {
						if (page === 1) {
							this.taskList = data.list
						} else {
							this.taskList = this.taskList.concat(data.list)
						}
						resolve([data.hasNext, data.list.length])
					}).catch(() => {
						reject()
					})
				})
			},
			select(e) {
				this.show = false
				this.taskList = []
				this.current = e
				this.triggerInit().then(() => {
					this.show = true
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
	.order-list {
		min-height: 100vh;

		.header {
			position: fixed;
			width: 100%;
			z-index: 999;
			height: 260rpx;
			background: #f6f6f6;

			.tabs {
				width: 100%;
				height: 80rpx;
				display: flex;

				.item {
					flex: 1;
					display: flex;
					justify-content: center;
					position: relative;

					.text {
						margin-top: 10rpx;
						font-size: 32rpx;
						font-weight: 400;
						color: #9F9E9C;

						&.active {
							font-weight: 600;
							color: $themeColor;
						}

						&.active::after {
							content: '';
							position: absolute;
							bottom: 0rpx;
							left: 50%;
							transform: translateX(-50%);
							width: 64rpx;
							height: 12rpx;
							background: $themeColor;
							border-radius: 6px;
						}
					}
				}
			}
		}

		.list {
			overflow: hidden;
			padding-top: 280rpx;
			margin: 0 20rpx;
		}

	}
</style>
