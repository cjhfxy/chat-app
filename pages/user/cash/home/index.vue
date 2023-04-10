<template>
	<view class="content">
		<nav-bar :back="1" title="账户余额">
			<view slot="right" class="log" @tap="$jumpPage('/pages/user/cash/log/index')">
				余额名细
			</view>
		</nav-bar>
		<view class="box">
			<view class="withdrawals">
				<view class="txt">
					我的余额
				</view>
				<view class="value">￥{{balance | parseMoney}}</view>
				<view class="btn" @click="$jumpPage('/pages/user/cash/withdraw/index')">
					提现
				</view>
			</view>
			<view class="log-wrap">
				<view class="title">
					最近余额记录
				</view>
				<log-item v-for="(item,index) in balanceLog" :key="index" :item="item"></log-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBalanceLog
	} from '@/api/user/index.js'
	import logItem from '../component/log-item.vue';
	export default {
		components: {
			logItem
		},
		data() {
			return {
				balance: 0,
				balanceLog: []
			}
		},
		onShow() {
			this.getBalance()
			this.getBalanceLog()
		},
		methods: {
			getBalance() {
				return new Promise((resolve, reject) => {
					this.$store.dispatch('user/getUserInfo').then(res => {
						res.balances.forEach(item => {
							if (item.itemId === 1) {
								this.balance = item.leftBalance
							}
						})
					})
				})
			},
			getBalanceLog() {
				return new Promise((resolve, reject) => {
				  getBalanceLog({
						page:1,
						itemId:1
					}).then(data => {
						this.balanceLog = data.list
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
	.content {
		min-height: 100vh;
		.log{
			font-size: 28rpx;
		}
		.box {
			display: flex;
			align-items: center;
			flex-direction: column;

			.withdrawals {
				margin-top: 20rpx;
				width: 702rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.txt {
					margin-top: 40rpx;
					height: 32rpx;
					font-size: 28rpx;
					color: #000000;
				}

				.value {
					margin-top: 20rpx;
					font-size: 60rpx;
					font-family: 'numberFont';
					color: #212121;
				}

				.tip {
					height: 32rpx;
					font-size: 24rpx;
					color: #757575;
				}

				.btn {
					margin-top: 44rpx;
					width: 702rpx;
					height: 82rpx;
					background: #014C94;

					font-size: 36rpx;
					font-family: PingFangSC-Medium-, PingFangSC-Medium;
					color: #FFFFFF;
					line-height: 82rpx;

					text-align: center;
				}
			}
		}
		.log-wrap{
			margin: 16rpx auto;
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			padding-bottom: 50rpx;
			.title {
				font-size: 24rpx;
				color: #000000;
				text-align: center;
				padding-top: 24rpx;
				padding-bottom: 30rpx;
			}
			
			.list {
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid #F6F6F8;
				margin: 16rpx 32rpx 0 24rpx;
				padding-bottom: 12rpx;
				}
		}
	}
</style>
