<template>
	<view class="count-down">
		<text v-if="type === 1" @tap="$emit('onTap')">获取验证码</text>
		<text v-if="type === 2" :style="{color}">{{ count }}s</text>
		<text v-if="type === 3" @tap="$emit('onTap')">重新获取</text>
		<verify ref="verifyRef" @onSuccess="$emit('onSuccess', $event)" />
	</view>
</template>

<script>
	import {
		getCaptcha,
		checkCaptcha
	} from '@/api/user/index'
	import verify from '../verify/'
	export default {
		components: {
			verify
		},
		props: {
			color: {
				type: String,
				default: '#6CDBEE'
			}
		},
		data() {
			return {
				type: 1,
				count: 60,
				timer: undefined
			}
		},
		methods: {
			start() {
				this.type = 2
				this.timer = setInterval(() => {
					this.count--
					if (this.count <= 0) {
						this.type = 3
						this.count = 60
						clearInterval(this.timer)
					}
				}, 1000)
			},
			getCaptchaData(){
				this.$refs.verifyRef.getCaptchaData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.count-down {
		font-size: 28rpx;
		color: $themeColor;
	}

	.captcha-mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1009;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left;
	}

	.slider-box {
		background-color: #fff;
		width: 278px;
		height: 285px;
		z-index: 999;
		box-sizing: border-box;
		padding: 9px;
		border-radius: 6px;
		box-shadow: 0 0 11px 0 #999999;
		user-select: none;
	}

	.slider-box .content {
		width: 100%;
		height: 159px;
		position: relative;
	}

	.slider-box .bg-img-view,
	.slider-img-view {
		width: 100%;
		height: 100%;
		position: absolute;
		transform: translate(0px, 0px);
	}

	.slider-box .bg-img-view img {
		width: 100%;
	}

	.slider-box .slider-img-view img {
		height: 100%;
	}

	.slider-box .slider-move {
		height: 60px;
		width: 100%;
		margin: 11px 0;
		position: relative;
	}

	.slider-box .bottom {
		height: 19px;
		width: 100%;
	}

	.slider-box .refresh-btn,
	.close-btn,
	.slider-move-track,
	.slider-move-btn {
		background: url('~@/static/images/sprite.1.2.4.png') no-repeat;
	}

	.slider-box .refresh-btn,
	.close-btn {
		display: inline-block;
	}

	.slider-box .slider-move .slider-move-track {
		line-height: 38px;
		font-size: 14px;
		text-align: center;
		white-space: nowrap;
		color: #88949d;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
	}


	.slider-box .slider-move .slider-move-btn {
		transform: translate(0px, 0px);
		background-position: -5px 11.79625%;
		position: absolute;
		top: -12px;
		left: 0;
		width: 66px;
		height: 66px;
	}

	.slider-box .slider-move-btn:hover,
	.close-btn:hover,
	.refresh-btn:hover {
		cursor: pointer
	}

	.slider-box .bottom .close-btn {
		width: 20px;
		height: 20px;
		background-position: 0 44.86874%;
	}

	.slider-box .bottom .refresh-btn {
		width: 20px;
		height: 20px;
		background-position: 0 81.38425%;
		margin-left: 10px;
	}
</style>
