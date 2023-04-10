<template>
	<view class="task-item bx-f-ac" :class="[`${style}`]">
		<view class="item-left bx-fd" @tap="$jumpPage(`/pages/user/task/detail?id=${item.id}`)">
			<view class="task-name">
				{{item.taskName}}
			</view>
			<view class="task-status">
				<image class="status-icon" :src="status | formatStatusIcon" /> {{status | formatStatus}}
			</view>
		</view>
		<view v-if="status === 20 || status === 50" class="item-right bx-f">
			<input class="vcode" v-model="vcode" placeholder="请输入验证码" placeholder-class="placeholder"></input>
			<view class="btn bx-f-c" @tap="submit(item.maxVCodeLength)">提交</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		submitVcode
	} from '@/api/user/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				},
			}
		},
		filters: {
			formatStatus(status) {
				let statusName = ''
				switch (status) {
					case 10:
						statusName = '已接单'
						break
					case 20:
						statusName = '已发送'
						break
					case 30:
						statusName = '已提交'
						break
					case 40:
						statusName = '已接收'
						break
					case 50:
						statusName = '验证码有误'
						break
					case 60:
						statusName = '老号'
						break
					case 100:
						statusName = '成功'
						break
					case 110:
						statusName = '已结算'
						break
					case -1:
						statusName = '已失效'
						break
					case -4:
						statusName = '已取消'
						break
					default:
						statusName = '未知'
						break
				}
				return statusName
			},
			formatStatusIcon(status) {
				let statusIcon = ''
				switch (status) {
					case 10:
						statusIcon = '/static/icons/task_status2.png'
						break
					case 20:
						statusIcon = '/static/icons/task_status1.png'
						break
					case 30:
						statusIcon = '/static/icons/task_status1.png'
						break
					case 40:
						statusIcon = '/static/icons/task_status1.png'
						break
					case 50:
						statusIcon = '/static/icons/task_status4.png'
						break
					case 60:
						statusIcon = '/static/icons/task_status1.png'
						break
					case 100:
						statusIcon = '/static/icons/task_status5.png'
						break
					case 110:
						statusIcon = '/static/icons/task_status5.png'
						break
					case -1:
						statusIcon = '/static/icons/task_status1.png'
						break
					case -4:
						statusIcon = '/static/icons/task_status1.png'
						break
					default:
						statusIcon = '/static/icons/task_status1.png'
						break
				}
				return statusIcon
			}
		},
		data() {
			return {
				vcode: '',
				status: 1,
			}
		},
		created() {
			this.vcode = this.item.vcode
			this.status = this.item.status
		},
		computed: {
			style() {
				let style;
				switch (this.status) {
					case 10:
						style = ''
						break
					case 20:
						style = ''
						break
					case 30:
						style = ''
						break
					case 50:
						style = 'error'
						break
					case 100:
						style = 'finish'
						break
					case 110:
						style = 'finish'
						break
					default:
						style = 'lose'
						break
				}
				return style
			},
		},
		methods: {
			submit(e) {
				if (this.status !== 20) return
				if (!this.vcode) {
					return uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
				}
				if (this.vcode.length !== e) {
					return uni.showToast({
						title: `验证码位数为${e}位`,
						icon: 'none'
					})
				}
				submitVcode({
					myTaskId: this.item.id,
					vcode: this.vcode
				}).then(data => {
					this.status = 30
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-item {
		margin-bottom: 20rpx;
		background: #CAE6D1;
		border-radius: 14rpx;
		padding: 28rpx 16rpx;
		overflow: hidden;
		color: #2D9A4A;

		.item-left {
			flex: 1;
			font-size: 24rpx;

			.task-name {
				font-size: 28rpx;
				font-weight: bold;
			}

			.task-status {
				margin: 8rpx 0;
				font-size: 24rpx;
				display: flex;
				align-items: center;

				.status-icon {
					margin-right: 5rpx;
					width: 20rpx;
					height: 30rpx;
				}
			}
		}

		.item-right {
			margin-left: 20rpx;

			.placeholder {
				font-size: 24rpx;
				text-align: center;
			}
		}

		.vcode {
			width: 160rpx;
			height: 60rpx;
			border-radius: 10rpx;
			border: 2rpx solid rgba(45, 154, 74, 0.86);
		}

		.btn {
			margin-left: 28rpx;
			width: 140rpx;
			height: 60rpx;
			background: linear-gradient(180deg, rgba(45, 154, 74, 0.5) 0%, #2D9A4A 100%);
			border-radius: 14rpx;
			color: #fff;
			font-size: 28rpx;
		}

		&.lose {
			background: #D8D8D8;
			color: #7D7A7A;
		}

		&.finish {
			background: #95be9f;
			color: #1d6d33;
		}

		&.error {
			background: #E6CAD4;
			color: #9A2D64;

			.vcode {
				border: 2rpx solid rgba(154, 45, 100, 0.86);
			}

			.btn {
				background: linear-gradient(180deg, rgba(154, 45, 100, 0.5) 0%, #9A2D64 100%);
			}
		}
	}
</style>