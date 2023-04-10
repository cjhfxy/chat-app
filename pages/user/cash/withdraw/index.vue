<template>
	<view class="content">
		<nav-bar :back="1" title="提现">
			<view slot="right" class="nav-right" @click="$jumpPage('/pages/user/cash/withdrawLog/index')">提现记录</view>
		</nav-bar>
		<view class="info">
			<view class="title">
				选择到账钱包
			</view>
			<view v-if="cardList.length" class="middle">
				<view class="middle-left">
					<view class="top">
						<u-radio-group v-model="address" iconPlacement="right" placement="column">
							<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item,index) in cardList" :key="index" activeColor="blue"
								:label="item.address" :name="item.address" @change="changeCard(item)"></u-radio>
						</u-radio-group>
					</view>
					<view class="bottom">
						到账时间：T+1
					</view>
				</view>
			</view>
			<view v-else class="middle" @tap="$jumpPage('/pages/user/card/bind/index')">
				<view class="middle-left">
					<view class="top">
						请先添加钱包
					</view>
				</view>
				<u-icon name="arrow-right" color="#6CDBEE" size="20"></u-icon>
			</view>
		</view>
		<view class="inp">
			<view class="top">
				提现金额
				<view v-if="withdrawFee" class="tip">
					(提现收取{{ withdrawFee }}%手续费)
				</view>
			</view>
			<view class="inp-num">
				<view class="sign">￥</view>
				<input type="number" v-model="money" @input="oninput" />
				<view v-if="commission>0" class="commission">手续费：{{ commission }}</view>
			</view>
			<view class="line">
				<p>当前余额为{{balance}}元，</p>
				<p class="all" @click="all">全部提现</p>
			</view>
			<view class="button" @tap="withdrawal">
				立即提现
			</view>
		</view>
	</view>
</template>

<script>
	import BigNumber from 'bignumber.js'
	import {
		getCardList,
		withdraw
	} from '@/api/wallet/index.js'
	export default {

		data() {
			return {
				balance: 0,
				money: '',
				now: 0,
				handingFee: '',
				commission: 0,
				cardList: [],
				currentCard: {},
				address: '0'
			}
		},
		onShow() {
			this.getBalance()
			this.getCardList()
		},
		computed: {
			withdrawFee() {
				return this.$store.getters.parmeConifg.WITHDRAW_FEE || 0
			}
		},
		methods: {
			getBalance() {
				return new Promise((resolve, reject) => {
					this.$store.dispatch('user/getUserInfo').then(res => {
						res.balances.forEach(item => {
							if (item.itemId === 1) {
								const balance = new BigNumber(item.leftBalance).dividedBy(100)
								this.balance = Number(balance)
							}
						})
					})
				})
			},
			changeCard(e) {
				this.currentCard = e
				console.log(this.currentCard);
			},
			getCardList() {
				return new Promise((resolve, reject) => {
					getCardList().then(data => {
						this.cardList = data.list
						if (data.list.length) {
							this.currentCard = data.list[0]
						}
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			all() {
				this.money = this.balance
				this.now = this.money
				const withdrawFee = new BigNumber(this.withdrawFee).dividedBy(100)
				this.commission = (new BigNumber(this.money).multipliedBy(withdrawFee)).toFixed(2)
			},
			oninput(e) {
				// 通过正则过滤小数点后两位
				e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				this.now = e.target.value
				const withdrawFee = new BigNumber(this.withdrawFee).dividedBy(100)
				this.commission = (new BigNumber(e.target.value).multipliedBy(withdrawFee)).toFixed(2)
			},
			withdrawal() {
				if (!this.money) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					})
					return
				}
				if (Number(this.money) !== Number(this.now)) {
					uni.showToast({
						title: '输入的提现金额有误,金额最多2位小数',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '处理中'
				})
				withdraw({
					amount: Math.round(this.money * 100),
					walletId: this.currentCard.id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '提现申请成功'
					})
					setTimeout(() => {
						this.$jumpPage(1)
					}, 500);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;

		.nav-right {
			color: #aaa;
			font-size: 34rpx;
		}

		.info {
			display: flex;
			margin: 24rpx;
			flex-direction: column;

			.title {
				font-size: 30rpx;
				margin-bottom: 24rpx;
			}

			.middle {
				flex: 1;
				display: flex;
				background-color: #fff;

				.middle-left {
					flex: 1;
					font-size: 36rpx;
					padding: 24rpx;

					.bottom {
						color: #aaa;
						font-size: 28rpx;
					}
				}
			}
		}

		.inp {
			margin: 24rpx;
			border-radius: 30rpx;
			background-color: #fff;
			padding: 40rpx;

			.top {
				font-size: 28rpx;
				color: #000;
				display: flex;
				align-items: center;

				.tip {
					font-size: 24rpx;
				}
			}

			.inp-num {
				height: 100rpx;
				width: 100%;
				border-bottom: 2rpx solid #aaa;
				display: flex;
				align-items: center;
				position: relative;

				.sign {
					font-size: 60rpx;
					font-weight: bold;
					color: #000;
				}

				input {
					font-size: 50rpx;
					color: #000;
				}

				.commission {
					position: absolute;
					color: #fff;
					right: 0;
					font-size: 24rpx;
				}
			}

			.line {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				font-size: 28rpx;
				color: #999;

				.all {
					color: #999;
				}
			}

			.button {
				margin-top: 80rpx;
				width: 100%;
				height: 80rpx;
				background: #F2C826;
				border-radius: 15rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				line-height: 44rpx;
				color: #171531;
			}
		}
	}
</style>
