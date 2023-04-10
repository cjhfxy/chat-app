<template>
	<view class="content">
		<nav-bar title="添加钱包" :back="1" />
		<p>选择钱包类型</p>
		<radio-group class="select" @change="change">
			<radio value="50" checked="true" /><text>TRX</text>
		</radio-group>
		<p>钱包地址</p>
		<view class="inp">
			<input type="text" @focus="isInped=true" v-model="address" />
		</view>
		<text class="tip">提示:{{tip}}</text>
		<view class="btn" @tap="addWallet">
			保存
		</view>

	</view>
</template>

<script>
	import {
		addWallet
	} from '@/api/wallet/index'
	export default {
		data() {
			return {
				itemId: 50,
				address: '',
				isPwdShow: false,
				tipShow: null,
				isEdit: false, //修改
				showPicker: false,
				tip:''
			}
		},
		onShow() {
			this.getTip()
		},
		methods: {
			change(e) {
				this.itemId = e.detail.value
			},
			getTip(){
				return new Promise(resolve => {
					this.$store.dispatch('app/getParamConfig').then(data => {
						this.tip = data.PAY_INTUP_TIP
						resolve()
					})
				})
			},
			addWallet() {
				if (!this.isEdit) {
					return addWallet({
						itemId: this.itemId,
						address: this.address
					}).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '添加钱包成功',
								icon: 'success'
							})
							setTimeout(() => {
								this.$jumpPage('/pages/user/card/choice/index', "redirect")
							}, 500);
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		position: relative;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 48rpx;

		.title {
			position: fixed;
			top: 160rpx;
			height: 60rpx;
			left: 120rpx;
			z-index: 99;
		}

		.img {
			width: 722rpx;
			height: 360rpx;
			border-radius: 24rpx;
			padding-top: 40rpx;
			margin-left: -40rpx;

			image {
				width: 722rpx;
				height: 400rpx;
				object-fit: cover;
			}
		}

		p {
			margin-left: 40rpx;
			margin-top: 62rpx;
			font-size: 30rpx;
			font-weight: 700;
			color: #999;
		}

		.inp {
			width: 654rpx;
			height: 90rpx;
			background: #f6f6f6;
			border-radius: 50rpx;
			padding: 0 32rpx;
			margin-top: 10rpx;
			color: #2E294E;
			display: flex;
			align-items: center;

			input {
				flex: 1;
			}
		}

	.tip{
		display: inline-block;
		margin: 30rpx 0;
	}
		.select {
			width: 654rpx;
			padding: 0 32rpx;
			margin-top: 10rpx;
			color: #2E294E;
			display: flex;
			align-items: center;

			radio {
				margin-right: 5rpx;
			}

			text {
				margin-right: 40rpx;
			}
		}

		.btn {
			width: 654rpx;
			height: 90rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 100rpx;
			color: #fff;
			background-color: $themeColor;
		}
	}
</style>
