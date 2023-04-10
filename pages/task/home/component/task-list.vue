<template>
	<view class="task-item bx-f-ac" :class="[`${style}`]">
		<view class="item-left bx-fd">
			<view class="task-name">
				{{item.taskName}}
			</view>
			<view class="task-status">
				<image class="status-icon" :src="status | formatStatusIcon" /> {{status | formatStatus}}
			</view>
			<!-- 商户取号读秒 -->
			<view class="seconds" v-if="leftSecond>0&&status==10">
				等待商户取号<u-count-down :time="leftSecond * 1000" format="ss" @finish="finishTime('leftSecond')"></u-count-down>s
			</view>
			<view v-else-if="leftSecond<=0&&status==10" class="seconds">
				商户取号超时
			</view>
			<!-- 输入验证码读秒 -->
			<view class="seconds" v-if="status==20&&leftVCode<=0">
				用户上传超时
			</view>
			<view class="seconds" v-else-if="status==20&&leftVCode>0">
				已取号,请上传验证码<u-count-down :time="leftVCode * 1000" format="ss" @finish="finishTime('leftVCode')"></u-count-down>s
			</view>
		</view>
		<view class="item-right bx-f" v-show="status==20">
			<input class="vcode" v-model="vcode" placeholder="请输入验证码" placeholder-class="placeholder"></input>
			<view class="btn bx-f-c" @tap="submit(item.maxVCodeLength)">提交</view>
		</view>
		<view class="item-right bx-f" v-show="status==50">
			<view class="upload">
				<upload v-model="images" :max-count="3" :width="40" :height="40" />
			</view>
			<view class="btn bx-f-c" @tap="onFeedback(item.id)">反馈</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
	</view>
</template>

<script>
	import {
		submitVcode
	} from '@/api/user/index.js'
	import {
		suggestion
	} from '@/api/user/index.js'
	import {
		onFeedbackLost
	} from '@/api/task/index.js'
	import upload from '@/components/upload/'
	export default {
		components: {
			upload
		},
		props: {
			item: {
				type: Object,
				default () {
					return {}
				},
			},
			// 商户取号读秒
			seconds: {
				type: String
			},
			// 上传验证码读秒
			vCodeSeconds: {
				type: String
			},
			nowTime: {
				type: Number
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
						statusName = '成功'
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
				status: 10,
				images: [],
				leftSecond: 0,
				leftVCode: 0

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
					default:
						style = 'lose'
						break
				}
				return style
			},
		},
		mounted() {
			this.leftSecondTime()
			this.leftVCodeTime()
		},
		methods: {
			// 商户取号剩余时间
			leftSecondTime() {
				this.leftSecond = Math.floor(this.item.createTime - this.nowTime + this.seconds * 1)
			},
			// 验证码剩余时间
			leftVCodeTime() {
				this.leftVCode = Math.floor(this.item.takeTime - this.nowTime + this.vCodeSeconds * 1)
			},
			finishTime(type) {
				if (type = 'leftSecond') {
					this.leftSecond = 0
				} else {
					this.leftVCode = 0
				}
			},
			// 吃单反馈
			onFeedback(taskId) {
				if (!this.images.length) {
					return uni.showToast({
						title: '请上传截图',
						icon: 'none'
					})
				}
				onFeedbackLost({
					myTaskId: taskId,
					shotUrl: JSON.stringify(this.images)
				}).then(() => {
					this.$refs.uToast.show({
						message: '已提交'
					})
				})
			},
			// 提交
			submit(e) {
				if (this.status == 10) {
					return uni.showToast({
						title: '等待商家取号',
						icon: 'none'
					})
				}
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

			.task-name {
				font-size: 28rpx;
				font-weight: bold;
			}

			.seconds {
				display: flex;
				font-size: 24rpx;
				margin-top: 8rpx;
				align-items: center;

				/deep/.u-count-down {
					&__text {
						color: #2D9A4A;
						font-size: 28rpx;
						line-height: 28rpx;
					}
				}
			}

			.task-status {
				margin-top: 8rpx;
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
			align-items: center;

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