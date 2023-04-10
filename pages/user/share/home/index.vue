<template>
	<view class="container">
		<canvas id="poster" canvas-id="myCanvas" :style="{ height:`${page_height}px`}" />
		<image v-if="base64" :src="base64" mode="" class="image" :style="{ height:`${page_height}px`}" />
		<view v-if="show" class="submit">
			<view class="btn share" @tap.stop="copyText">
				复制链接
				<view class="icon">
					<u-icon name="share" color="#fff" size="24"></u-icon>
				</view>
			</view>
			<view class="btn" @tap.stop="savePoster">
				保存到手机
				<view class="icon">
					<u-icon name="download" color="#fff" size="24"></u-icon>
				</view>
			</view>
		</view>
		<uqrcode ref="uqrcode" canvas-id="qrcode" class="canvas-hide" :value="qrcodeText" :options="{ margin: 10,foregroundImageSrc: '/static/logo.png'}" @complete="qrcodeComplete($event)"></uqrcode>
	</view>
</template>

<script>
	import {
		getParamConfigList
	} from '@/api/system/index.js'
	// #ifdef H5
	import {
		Download
	} from '@/utils/download.js'
	// #endif
	export default {
		data() {
			return {
				qrcodeText: '',
				qrcodeSrc: '',
				base64: '',
				system_info: [],
				screen_rpx: 0,
				page_height: 0,
				show: false,
				// #ifdef H5
				download: new Download(),
				// #endif
				ruleUrl:''
			}
		},
		computed: {
			userInfo() {
				return this.$store.getters.userInfo
			},
			parmeConifg() {
				return this.$store.getters.parmeConifg
			}
		},
		onLoad(e) {
			this.$store.dispatch('user/getUserInfo').then(res => {
				const system_info = uni.getSystemInfoSync()
				this.screen_rpx = system_info.windowWidth / 375
				this.system_info = system_info
				this.page_height = 595 * this.screen_rpx
				uni.showLoading({
					title: '正在生成分享码',
					mask: true
				})
				Promise.allSettled([
					this.init()
				]).then(results => {
					setTimeout(() => {
						this.makeCanvas()
					}, 2000)
				})
			})
		},
		methods: {
			init() {
				return new Promise((resolve, reject) => {
					getParamConfigList().then(data => {
						const qrcodeText = data.REGISTER_URL + '#/pages/user/register/index?dealerId=' + this
							.userInfo.id
						this.qrcodeText = qrcodeText
						resolve(data)
					}).catch(() => {
						reject()
					})
				})
			},
			qrcodeComplete(e) {
				this.$refs.uqrcode.toTempFilePath({
				  success: res => {
				    this.qrcodeSrc = res.tempFilePath
				  }
				});
			},
			makeCanvas() {
				if (!this.qrcodeSrc){
					setTimeout(() => {
						this.makeCanvas()
					}, 500)
					return
				}
				const system_info = this.system_info
				const ww = system_info.windowWidth // 准确的宽高
				var ctx = uni.createCanvasContext('myCanvas') // 绑定画布
				const rpx = this.screen_rpx
				// 绘制背景
				ctx.drawImage('/static/images/share_bg.jpg', 0, 0, 375 * rpx, 595 * rpx)

				ctx.fillStyle = '#212121'
				ctx.font = 'bold 24px "Gill Sans Extrabold"'
				ctx.textAlign = 'center'
				ctx.textBaseline = 'middle'
				ctx.fillText('邀请码：'+this.userInfo.id, ww / 2, 245 * rpx)

				ctx.drawImage(this.qrcodeSrc, ww / 2 - 100 * rpx, 270 * rpx, 200 * rpx, 200 * rpx)
				ctx.draw(false, () => {
					setTimeout(() => { // 不加延迟的话，base64有时候会赋予undefined
						uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							success: (res) => {
								this.base64 = res.tempFilePath
							}
						})
						this.show = true
						uni.hideLoading()
					}, 500)
				})
			},
			copyText() {
			  uni.setClipboardData({
			    data: this.qrcodeText,
			    success: () => {
			      uni.showToast({
			        title: '已复制到剪切板!',
			        icon: 'none'
			      })
			    }
			  })
			},
			savePoster() {
				// #ifdef H5
				const downloadName = '玉兔任务' // 文件名
				const imgData = this.base64 // base64
				this.download.downloadFile(downloadName, imgData)
				// #endif
				// #ifdef APP-PLUS || MP-WEIXIN
				uni.saveImageToPhotosAlbum({ // 保存图片
					filePath: this.base64,
					success: (res) => {
						uni.showToast({
							title: '保存成功'
						})
					},
					fail(r) {
						console.log(r)
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		position: relative;
		background-color: #005ba0;
		.canvas-hide {
			position: fixed;
			right: 100vw;
			bottom: 100vh;
			z-index: -9999;
			opacity: 0;
		}
		#poster {
			position: absolute;
			width: 750rpx;
			top: -99999899rpx;
			left: -99999899rpx;
			z-index: 10;
		}

		.image {
			width: 750rpx;
		}

		.submit {
			width: 100%;
			height: calc(constant(safe-area-inset-bottom) + 140rpx);
			height: calc(env(safe-area-inset-bottom) + 140rpx);
			position: fixed;
			bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			left: 0;
			z-index: 999;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;

			.btn {
				width: 310rpx;
				height: 100rpx;
				background: #F8E2C0;
				box-shadow: 0px 20rpx 20rpx 2rpx rgba(248, 226, 192, 0.3);
				border-radius: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				.icon {
					margin-left: 20rpx;
					width: 60rpx;
					height: 60rpx;
					border-radius: 30rpx;
					background-color: #3F2702;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.share {
				background: #6CDBEE;
				.icon {
					background-color: #01143d;
				}
			}
		}
	}
</style>
