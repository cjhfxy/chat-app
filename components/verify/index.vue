<template>
	<view v-show="showCaptcha" class="captcha-mask">
		<view class="slider-box">
			<view class="content">
				<view id="bg-img-view" class="bg-img-view">
					<img id="bg-img" :src="data.backgroundImage" />
				</view>
				<view :style="sliderImgStyles" class="slider-img-view">
					<img id="slider-img" :src="data.sliderImage" />
				</view>
			</view>
			<view class="slider-move">
				<view class="slider-move-track">
					拖动滑块完成拼图
				</view>
				<!-- #ifdef APP-PLUS -->
				<view :style="moveStyles" class="slider-move-btn" id="rotate-move-btn"
					@mousedown="sliderDown($event)" @touchstart="sliderDown($event)" @touchmove="moveHandler"
					@touchend="upHandler"></view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view :style="moveStyles" class="slider-move-btn" id="rotate-move-btn"
					@mousedown="sliderDown($event)" @touchstart="sliderDown($event)"></view>
				<!-- #endif -->
			</view>
			<view class="bottom">
				<view class="close-btn" @click="showCaptcha= false"></view>
				<view class="refresh-btn" @click="refresh"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCaptcha,
		checkCaptcha
	} from '@/api/user/index'
	export default {
		props: {
			color: {
				type: String,
				default: '#6CDBEE'
			}
		},
		data() {
			return {
				showCaptcha: false,
				captchaId: '',
				data: {
					backgroundImage: undefined,
					backgroundImageWidth: 0,
					backgroundImageHeight: 0,
					sliderImageWidth: 0,
					sliderImageHeight: 0,
					sliderImage: undefined,
					data: undefined
				},
				startX: 0,
				startY: 0,
				end: 206,
				moveX: 0,
				movePercent: 0,
				trackData: {
					bgImageWidth: 0,
					bgImageHeight: 0,
					sliderImageWidth: 0,
					sliderImageHeight: 0,
					startSlidingTime: null,
					endSlidingTime: null,
					trackList: []
				},
				moveStyles: {
					transform: 'translate(0px, 0px)',
					backgroundPosition: '-5px 11.79625%'
				},
				// 滑动样式
				sliderImgStyles: {
					transform: 'translate(0px, 0px)',
				},
			}
		},
		methods: {
			/**
			 * 刷新
			 */
			refresh() {
				this.getCaptchaData()
			},
			/**
			 * 重置
			 */
			reset() {
				this.moveStyles.transform = 'translate(0, 0)'
				this.moveStyles.backgroundPosition = '-5px 11.79625%'
				this.sliderImgStyles.transform = 'translate(0, 0)'
				this.startX = 0
				this.startY = 0
				this.moveX = 0
				this.movePercent = 0
				this.trackData.startSlidingTime = undefined
				this.trackData.endSlidingTime = undefined
				this.trackData.trackList = []
				// #ifdef H5
				window.removeEventListener("mousemove", this.moveHandler);
				// #endif
			},
			close() {
				this.showCaptcha = false
			},
			getCaptchaData() {
				return new Promise((resolve, reject) => {
					getCaptcha().then(data => {
						this.data = data.captcha
						this.trackData.startSlidingTime = new Date()
						this.captchaId = data.id
						this.showCaptcha = true
						// #ifdef H5
						this.$nextTick(() => {
							const bgElements = document.getElementById('bg-img-view')
							this.trackData.bgImageWidth = bgElements.clientWidth
							this.trackData.bgImageHeight = bgElements.clientHeight
						})
						// #endif
						// #ifdef APP-PLUS
						this.$nextTick(() => {
							this.trackData.bgImageWidth = 260
							this.trackData.bgImageHeight = 159
						})
						// #endif
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			/*
			 * 滑动图片鼠标按下
			 */
			sliderDown(event) {
				let targetTouches = event.originalEvent ? event.originalEvent.targetTouches : event.touches;
				let startX = event.pageX;
				let startY = event.pageY;
				if (startX === undefined) {
					startX = Math.round(targetTouches[0].pageX);
					startY = Math.round(targetTouches[0].pageY);
				}
				this.startX = startX
				this.startY = startY
				this.moveStyles.backgroundPosition = '-5px 31.0092%'

				const pageX = this.startX;
				const pageY = this.startY;
				const startTime = this.trackData.startSlidingTime;
				const trackArr = this.trackData.trackList;
				trackArr.push({
					x: pageX - startX,
					y: pageY - startY,
					type: "down",
					t: (new Date().getTime() - startTime.getTime())
				});
				// #ifdef H5
				window.addEventListener("mousemove", this.moveHandler)
				window.addEventListener("mouseup", this.upHandler)
				window.addEventListener("touchmove", this.moveHandler, false)
				window.addEventListener("touchend", this.upHandler, false)
				// #endif
			},
			/**
			 * 移动
			 * @param event
			 */
			moveHandler(event) {
				if (event.type != 'mouseup') {
					event = event.changedTouches[0]
				}
				let pageX = Math.round(event.pageX);
				let pageY = Math.round(event.pageY);
				const startX = this.startX;
				const startY = this.startY;
				const startTime = this.trackData.startSlidingTime;
				const end = this.end;
				const bgImageWidth = this.trackData.bgImageWidth;
				const trackList = this.trackData.trackList;
				let moveX = pageX - startX;
				const track = {
					x: pageX - startX,
					y: pageY - startY,
					type: "move",
					t: (new Date().getTime() - startTime.getTime())
				};
				trackList.push(track);
				if (moveX < 0) {
					moveX = 0;
				} else if (moveX > end) {
					moveX = end;
				}
				this.moveX = moveX;
				this.movePercent = moveX / bgImageWidth;

				this.moveStyles.transform = 'translate(' + moveX + 'px, 0px)'
				this.sliderImgStyles.transform = 'translate(' + moveX + 'px, 0px)'
			},
			/**
			 * 鼠标松下,进行验证
			 * @param event
			 */
			upHandler(event) {
				// #ifdef H5
				window.removeEventListener("mousemove", this.move)
				window.removeEventListener("mouseup", this.upHandler)
				window.removeEventListener("touchmove", this.move)
				window.removeEventListener("touchend", this.upHandler)
				// #endif
				if (event.type != 'mousemove') {
					event = event.changedTouches[0]
				}
				this.trackData.endSlidingTime = new Date()
				let pageX = Math.round(event.pageX);
				let pageY = Math.round(event.pageY);
				const startX = this.startX;
				const startY = this.startY;
				const startTime = this.trackData.startSlidingTime;
				const trackList = this.trackData.trackList;

				const track = {
					x: pageX - startX,
					y: pageY - startY,
					type: "up",
					t: (new Date().getTime() - startTime.getTime())
				}
				trackList.push(track)
				this.check()
			},
			check() {
				this.trackData.startSlidingTime = this.trackData.startSlidingTime.getTime()
				this.trackData.endSlidingTime = this.trackData.endSlidingTime.getTime()
				const Base64 = require('js-base64').Base64
				const baseData = Base64.encode(JSON.stringify(this.trackData))
				checkCaptcha({
					id: this.captchaId,
					data: baseData
				}).then(res => {
					if (res.check){
						this.showCaptcha = false
						this.$emit('onSuccess', this.captchaId)
						this.reset()
					}else{
						this.reset()
						this.refresh()
					}
				}).catch(() => {
					this.reset()
					this.refresh()
				})
			},
			getNowDate(date) {
				const dt = date
				const y = dt.getFullYear()
				const m = (dt.getMonth() + 1 + '').padStart(2, 0)
				const d = (dt.getDate() + '').padStart(2, 0)
				const hh = (dt.getHours() + '').padStart(2, 0)
				const mm = (dt.getMinutes() + '').padStart(2, 0)
				const ss = (dt.getSeconds() + '').padStart(2, 0)
				const sss = (dt.getMilliseconds() + '').padStart(2, 0)
				return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
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
