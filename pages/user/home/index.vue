<template>
	<view class="container">
		<view class="header-wrap">
			<image class="bg" src="/static/images/user_bg.png" />
			<view class="header-box">
				<view class="user-info bx-f-ac">
					<view class="info">
						<img class="avatar" :src="userInfo.avatar ? userInfo.avatar : '/static/images/avatar.png'">
						<view v-if="isLogin" class="info-centent bx-fd" @tap="$jumpPage('/pages/user/info/index')">
							<view class="nickname">
								{{userInfo.nickName}}
							</view>
							<view class="nickid">
								ID:{{userInfo.id}}
							</view>
						</view>
						<view v-else class="info-centent bx-fd" @tap="$jumpPage('/pages/user/login/index')">
							<view class="nickname">
								请登录
							</view>
						</view>
					</view>
					<view v-if="isLogin" class="setting" @tap="$jumpPage('/pages/user/setting/index')">
						<u-icon name="setting" color="#fff" size="20"></u-icon>
					</view>
				</view>
				<view class="user-stat bx-fd">
					<view class="stat-predict bx-f-ac">
						<view class="bx-fd-c" @tap="$jumpPage('/pages/user/cash/home/index')">
							<text class="value">{{ balance | parseMoney}}</text>
							<text class="tip">余额</text>
							<text>(点击提现)</text>
						</view>
						<view class="bx-fd-c">
							<text class="value">{{income | parseMoney}}</text>
							<text class="tip">今日预估收益</text>
						</view>
					</view>
					<view class="stat-count bx-f-ac">
						<view class="stat-count-right">
							余额折算: {{ converted }} USDT
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 其他功能列表 -->
		<other :listData="listData"></other>
	</view>
</template>

<script>
	import {
		myTaskStat,
		getTodayIncomePredict,
		getCnyUsd
	} from '@/api/user/index.js'
	import other from './component/other.vue'
	export default {
		components: {
			other
		},
		filters: {
			levelFilter(level) {
				let levelIcon = ''
				switch (level) {
					case 0:
						levelIcon = '/static/icons/icon_vip_not.png'
						break
					case 10:
						levelIcon = '/static/icons/icon_vip_normal.png'
						break
					case 11:
						levelIcon = '/static/icons/icon_vip1.png'
						break
					case 12:
						levelIcon = '/static/icons/icon_vip2.png'
						break
					case 13:
						levelIcon = '/static/icons/icon_vip3.png'
						break
					default:
						levelIcon = '/static/icons/icon_vip_not.png'
						break
				}
				return levelIcon
			}
		},
		data() {
			return {
				converted: 0,
				cnyUsd: 0,
				isLogin: false,
				userInfo: {},
				balance: 0,
				income: 0,
				totalIncome: 0,
				listData: [{
						icons: '/static/icons/icon_pending.png',
						text: '未完成',
						path: '/pages/user/task/index?current=20'
					}, {
						icons: '/static/icons/icon_finish.png',
						text: '已完成',
						path: '/pages/user/task/index?current=110'
					}, {
						icons: '/static/icons/tuandui.png',
						text: '我的团队',
						path: '/pages/user/team/index'
					}, {
						icons: '/static/icons/yongjin.png',
						text: '佣金明细',
						path: '/pages/user/reward/index'
					}, {
						icons: '/static/icons/fenxiang.png',
						text: '我的宣传码',
						path: '/pages/user/share/home/index'
					},
					{
						icons: '/static/icons/daifukuan.png',
						text: '我的钱包',
						path: '/pages/user/card/choice/index'
					},
					{
						icons: '/static/icons/gerenzhongxin.png',
						text: '个人中心',
						path: '/pages/user/info/index'
					},
					{
						icons: '/static/icons/daifukuan.png',
						text: '申请提现',
						path: '/pages/user/cash/withdraw/index'
					},
					{
						icons: '/static/icons/shezhi.png',
						text: '设置',
						path: '/pages/user/setting/index'
					}, {
						icons: '/static/icons/kefu.png',
						text: '意见反馈',
						path: '/pages/user/advice/index'
					},
					{
						icons: '/static/icons/icon_feedback.png',
						text: '吃单反馈',
						path: '/pages/user/feedbackList/index'
					}
				]
			}
		},
		onShow() {
			this.getUserData()
			this.getTodayIncomePredict()
		},
		methods: {
			getCnyUsd() {
				getCnyUsd().then(data => {
					this.converted = ((this.balance / 100) / data.rate).toFixed(4)
				})
			},
			getUserData() {
				return new Promise(resolve => {
					this.$store.dispatch('user/getIsLogin').then(data => {
						this.isLogin = data
						if (data) {
							this.$store.dispatch('user/getUserInfo').then(res => {
								this.userInfo = res
								res.balances.forEach(item => {
									if (item.itemId === 1) {
										this.balance = item.leftBalance
									}
									if (item.itemId === 100) {
										this.totalIncome = item.leftBalance
									}
									this.getCnyUsd()
								})
							})
						} else {

						}
						resolve()
					})
				})
			},
			getTodayIncomePredict() {
				return new Promise((resolve, reject) => {
					getTodayIncomePredict().then(data => {
						this.income = data.todayIncomePredict
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
	.container {
		min-height: 100vh;
		position: relative;
		padding-bottom: 100rpx;

		.header-wrap {
			width: 100%;
			height: 570rpx;
			position: relative;

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 526rpx;
				z-index: 1;
			}

			.header-box {
				position: absolute;
				top: 120rpx;
				left: 0;
				width: 100%;
				z-index: 2;
				padding: 0 24rpx;

				.user-info {
					justify-content: space-between;

					.info {
						display: flex;
						align-items: center;

						.avatar {
							width: 104rpx;
							height: 104rpx;
							border-radius: 50%;
						}

						.info-centent {
							margin-left: 24rpx;

							.nickname {
								color: #fff;
								font-size: 32rpx;
							}

							.nickid {
								color: #fff;
								font-size: 28rpx;
							}

							.user-level {
								margin-top: 8rpx;
								width: 144rpx;
								height: 48rpx;
							}
						}

					}

					.setting {
						padding: 10rpx;
					}
				}

				.user-stat {
					margin-top: 24rpx;
					color: #fff;
					background-image: url(/static/images/user_balance.png);
					background-size: 100%;
					width: 690rpx;
					height: 316rpx;
					justify-content: space-evenly;

					.stat-predict {
						margin-top: 50rpx;
						padding: 0 42rpx;
						justify-content: space-between;

						.tip {
							font-size: 32rpx;
						}

						.label {
							flex: 1;
							font-size: 58rpx;
							font-weight: 400;
							color: #FFFFFF;
							font-family: 'numberFont';
							text-align: center;
							width: 302rpx;
						}

						.value {
							text-align: center;
							width: 304rpx;
							flex: 1;
							font-size: 58rpx;
							font-family: 'numberFont';
							color: #FFEFC2;
						}
					}
					

					.stat-count {
						padding: 24rpx;
						font-size: 32rpx;

						&-right {
							flex: 1;
							text-align: right;
							
						}
					}
				}


			}
		}

		.task-box {
			margin: 24rpx;
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 8rpx;

			.task-box-top {
				height: 75rpx;
				padding: 0 22rpx;
				border-bottom: 1px solid $borderColor;

				.title {
					font-size: 28rpx;
					color: #212121;
				}

				.more {
					font-size: 24rpx;
					color: #757575;
				}
			}

			.task-nav {
				padding: 24rpx;
			}
		}

		.use-box {
			margin: 24rpx;
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			overflow: hidden;
			padding: 24rpx;

			.title {
				margin-bottom: 24rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
	}
</style>
