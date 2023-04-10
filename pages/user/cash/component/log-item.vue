<template>
	<view class="log-item">
		<view class="item">
			<image class="icon" :src="item.changeAmount > 0 ? '/static/icons/balance_income.png' : '/static/icons/balance_pay.png'" mode="">
			<view class="left">
				<view class="note">
					{{item.note}}
				</view>
				<view class="data">
					{{ item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
				</view>
			</view>
			<view class="right">
				<view class="top">
					{{item.changeAmount | parseMoney}}
				</view>
				<view class="bottom">
					余额： {{item.leftBalance | parseMoney}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {};
				}
			},
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.log-item {
		overflow: hidden;
		border-bottom: 2rpx solid #ededed;
		.item {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;
			color: $themeColor;
			background-color: #fff;
			.icon{
				width: 50rpx;
				height: 50rpx;
			}
			.left {
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				.note{
					font-size: 24rpx;
					margin-bottom: 20rpx;
				}
				.data{
					font-size: 24rpx;
					color: #aaa;
				}
			}

			.right {
				text-align: right;
				.top{
					color: #e56000;
					font-size: 32rpx;
					font-family: 'numberFont';
				}
				.bottom {
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}
		.item-desc{
			border-top: 2rpx solid #171531;
			font-size: 12rpx;
			padding: 40rpx;
			color: #fff;
		}
	}
</style>
