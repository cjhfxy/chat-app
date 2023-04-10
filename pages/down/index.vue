<template>
	<view class="content">
		<nav-bar :back="1" />
		<u-overlay :show="isWeiXin" :opacity="0.7">
			<image class="weixin-tip-img" src="/static/images/guide_arrow.png"></image>
			<view class="weixin-tip">
				APP下载地址请在菜单中选择在浏览器中打开
			</view>
		</u-overlay>
		<image class="bg" src="/static/images/down_bg.jpg"></image>
		<view v-if="!isWeiXin" class="bottom">
			<view class="down-btn">
				<image class="bottom-bg" src="/static/images/down_bottom.png"></image>
				<a class="button" :href="downUrl" target="_blank">
					下载安卓版APP
				</a>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getParamConfigList
	} from '@/api/system/index.js'
	export default {
		data() {
			return {
				downUrl: '',
				// #ifdef H5
				isWeiXin: true,
				// #endif
				// #ifdef APP-PLUS
				isWeiXin: false,
				// #endif
			}
		},
		onLoad() {
			this.getParamConfig()
			// #ifdef H5
			this.init()
			// #endif
		},
		methods: {
			init() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this.isWeiXin = true
				} else {
					this.isWeiXin = false
				}
			},
			getParamConfig() {
				getParamConfigList().then(data => {
					this.downUrl = data.APP_DOWNURL
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		position: relative;
		overflow: hidden;

		.bg {
			position: absolute;
			width: 100%;
			height: 1526rpx;
		}

		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 280rpx;

			.down-btn {
				height: 100%;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.bottom-bg {
					position: absolute;
					width: 750rpx;
					height: 280rpx;
					z-index: 1;
				}

				.button {
					margin-top: 40rpx;
					width: 650rpx;
					height: 92rpx;
					background: #00BFFF;
					border-radius: 20rpx;
					z-index: 99;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #212121;
					text-decoration: none;
				}
			}
		}

		.weixin-tip {
			position: fixed;
			top: 100rpx;
			right: 40rpx;
			width: 600rpx;
			padding: 55px 0 0;
			background-size: 45px 68px;
			z-index: 1000;
			color: #fff;
		}
		.weixin-tip-img{
			position: fixed;
			top: 40rpx;
			right: 20rpx;
			width: 90rpx;
			height: 136rpx;
		}
	}
</style>
