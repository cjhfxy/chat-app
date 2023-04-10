<template>
	<view class="task-detail">
		<view class="desc">
			<view class="item">
				<text class="label">任务ID:</text>
				<text class="value">{{ detailData.myTaskId }}</text>
			</view>
			<view class="item">
				<text class="label">任务名字:</text>
				<text class="value price">{{ detailData.taskName }}</text>
			</view>
			<view class="item">
				<text class="label">截图:</text>
				<u-album :urls="shotUrl" keyName='url' multipleSize='70' singleSize='70'></u-album>
			</view>
			<view class="item">
				<text class="label">任务状态:</text>
				<text class="value">{{ detailData.status | formatStatus }}</text>
			</view>
			<view class="item">
				<text class="label">提交时间:</text>
				<text class="value">{{ detailData.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</text>
			</view>
			<view class="item">
				<text class="label">处理时间:</text>
				<text class="value">{{ detailData.updateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		getMyFeedbackList,
	} from '@/api/user/index'
	export default {
		props: {
			detailData: Object
		},
		filters: {
			formatStatus(status) {
				let statusName = ''
				switch (status) {
					case 10:
						statusName = '待处理'
						break
					case 20:
						statusName = '已同意'
						break
					case -1:
						statusName = '已驳回'
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
				shotUrl: JSON.parse(this.detailData.images)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.task-detail {
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