<!-- 各个银行的图片无法放置 -->
<template>
	<view class="content">
		<nav-bar title="我的钱包" :back="1">
			<view class="right" slot="right" @click="toBind">
				<u-icon name="plus-circle" color="#6CDBEE" size="25"></u-icon>
			</view>
		</nav-bar>
		<view class="" v-if="list.length>0">
			<part v-for="(item,index) in list" @select="select" @update="getCard" :key="index" :current="index"
				:list="item" :select="selectId"></part>
		</view>
		<view class="noData" v-if="list.length==0||!list">
			<image src="/static/images/no-card.png" mode=""></image>
			<p>还没有添加钱包哦</p>
			<view class="no-btn" @click="toBind">
				去绑定钱包地址吧
			</view>
		</view>
	</view>
</template>

<script>
	import part from './components/part.vue';
	import {
		getWalletList
	} from '@/api/wallet/index.js'
	export default {
		data() {
			return {
				list: [],
				selectId: 1,
			}
		},
		onShow() {
			this.getCard();
		},
		methods: {
			toBind() {
				uni.navigateTo({
					url: '/pages/user/card/bind/index',
				})
			},
			back() {
				uni.navigateBack();
			},
			select(e) {
				this.selectId = e;
			},
			getCard() {
				getWalletList({
					itemId:50
				}).then(res => {
					this.list = res.list
				})
			}
		},
		components: {
			part
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		position: relative;
		padding: 0 40rpx;


		.noData {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 236rpx;

			image {
				width: 320rpx;
				height: 320rpx;

			}

			p {
				font-size: 40rpx;
				font-weight: 400;
				color: #858585;
				margin-top: 90rpx;
			}

			.no-btn {
				margin-top: 60rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #3F2702;
				width: 400rpx;
				height: 100rpx;
				border-radius: 40rpx;
				background-color: #F8E2C0;
				text-align: center;
				line-height: 100rpx;
			}
		}

		.btn {
			width: 654rpx;
			height: 100rpx;
			position: fixed;
			bottom: 68rpx;
			left: 48rpx;
			background: #F8E2C0;
			color: #3F2702;
			font-size: 30rpx;
			text-align: center;
			line-height: 100rpx;
			border-radius: 50rpx;
		}
	}
</style>
