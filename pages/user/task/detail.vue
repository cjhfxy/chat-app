<template>
	<view class="task-detail">
		<nav-bar title="任务详情" :back="1" />
		<view class="desc">
			<view class="item">
				<text class="label">任务名称:</text>
				<text class="value">{{ detailData.taskName }}</text>
			</view>
			<view class="item">
				<text class="label">任务编号:</text>
				<text class="value">{{ detailData.taskNo }}</text>
				<text class="btn" @tap="copyText('taskNo')">复制</text>
			</view>
			<view class="item">
				<text class="label">完成奖励:</text>
				<text class="value price">{{ detailData.price | parseMoney }}</text>
			</view>
			<view class="item">
				<text class="label">任务状态:</text>
				<text class="value">{{ detailData.status | formatStatus }}</text>
			</view>
			<view class="item">
				<text class="label">接单时间:</text>
				<text class="value">{{ detailData.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</text>
			</view>
			<view v-if="detailData.status === 50" class="shot-wrap">
				<view class="upload-box">
					<upload v-model="shotUrlList" :max-count="1" :width="150" :height="150" />
				</view>
				<view class="btn" @tap="submitShot">
					提交反馈
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		getMyTaskDateil,
		submitShot
	} from '@/api/user/index'
	import upload from '@/components/upload/'
	export default {
		components: {
			upload
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
			}
		},
		data() {
			return {
				id: '',
				detailData: {},
				shotUrlList: [],
				shotUrl: ''
			}
		},
		watch: {
			shotUrlList: {
				handler(val) {
					if (val.length > 0) {
						this.shotUrl = val[0].url
					} else {
						this.shotUrl = ''
					}
				},
				deep: true
			},
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {
			this.getDetail()
		},
		onPullDownRefresh() {
			this.getDetail().then(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			getDetail() {
				return new Promise(resolve => {
					getMyTaskDateil({
						id: this.id
					}).then(data => {
						this.detailData = data
						resolve()
					})
				})
			},
			submitShot() {
				if (!this.shotUrl) {
					return uni.showToast({
						title: '请上传截图',
						icon: 'none'
					})
				}
				submitShot({
					myTaskId: this.item.id,
					shotUrl: this.shotUrl
				}).then(data => {
					uni.showToast({
						title: `提交成功`,
						icon: 'none',
						duration: 1500
					})
					this.getDetail()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-detail {
		min-height: 100vh;
		overflow: hidden;
		padding: 24rpx;

		.desc {
			border-radius: 12rpx;
			background-color: #fff;
			padding: 20rpx;
			color: #212121;
			overflow: hidden;

			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;

				.label {
					font-size: 24rpx;
					color: #666;
				}

				.value {
					flex: 1;
					margin-left: 20rpx;
					font-size: 28rpx;
				}

				.price {
					color: #e56000;
					font-family: 'numberFont';
				}

				.btn {
					width: 80rpx;
					height: 40rpx;
					background-color: rgba($color: $themeColor, $alpha: .1);
					border-radius: 20rpx;
					font-size: 12px;
					display: flex;
					align-items: center;
					justify-content: center;
					color: $themeColor;
				}
			}

			.shot-wrap {
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.upload-box {
					width: 300rpx;
					height: 300rpx;
				}

				.btn {
					margin-top: 80rpx;
					margin-bottom: 20rpx;
					width: 200rpx;
					height: 80rpx;
					background-color: $themeColor;
					border-radius: 20rpx;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
				}
			}
		}

	}
</style>