<template>
	<view class="nav-bar">
		<view class="content" :style="{ backgroundColor,paddingTop: top + 'px', height: height + 'px' }">
			<view class="left" :style="{ top: top + 'px', height: height - top + 'px' }">
				<u-icon v-if="back" name="arrow-left" :color="arrowColor" size="25" @tap="handleTapBack"></u-icon>
				<slot name="left" />
			</view>
			<view class="center">
				<slot>
					<view class="title" :style="{ color }">{{ title }}</view>
				</slot>
			</view>
			<view class="right">
				<slot name="right" />
			</view>
			<slot name="background" />
		</view>
		<view class="placeholder" :style="{ height: height + 'px' }">
			<slot name="placeholder" />
		</view>
	</view>
</template>

<script>
	import config from '@/config/'
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			back: {
				type: [Boolean, Number, String],
				default: false
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#212121'
			},
			arrowColor: {
				type: String,
				default: '#212121'
			}
		},
		data() {
			return {
				none: false,
				navBarInfo: {}
			}
		},
		computed: {
			top() {
				return this.navBarInfo.top || undefined
			},
			height() {
				return this.navBarInfo.height || undefined
			}
		},
		created() {
			const navBarInfo = this.$store.getters.navBarInfo
			if (JSON.stringify(navBarInfo) === '{}') {
				this.$store.dispatch('app/getNavBarInfo').then(data => {
					this.navBarInfo = data
				})
			} else {
				this.navBarInfo = navBarInfo
			}
			const pages = getCurrentPages()
			if (pages.length <= this.back) {
				this.none = true
			}
		},
		methods: {
			handleTapBack() {
				const back = this.back
				if (this.none) {
					uni.switchTab({
						url: config.homePath
					})
				} else if (back === 'home') {
					uni.switchTab({
						url: config.homePath
					})
				} else {
					if (typeof back === 'number') {
						uni.navigateBack({
							delta: back
						})
					} else if (typeof back === 'string') {
						if (config.tabList.some(item => item === back)) {
							uni.switchTab({
								url: back
							})
						} else {
							uni.redirectTo({
								url: back
							})
						}
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		.content {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			height: $navBarHeight;
			padding-top: var(--status-bar-height);
			overflow: hidden;

			.left {
				position: absolute;
				z-index: 999;
				top: var(--status-bar-height);
				left: 24rpx;
				height: calc(100% - var(--status-bar-height));
				display: flex;
				align-items: center;

				.icon {
					width: 18rpx;
					height: 36rpx;
					padding: 20rpx 40rpx 20rpx 0;
					box-sizing: content-box;
				}
			}

			.center {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.title {
					font-size: 34rpx;
					font-weight: 500;
					line-height: 1;
					color: #000000;
				}
			}

			.right {
				position: absolute;
				top: var(--status-bar-height);
				right: 24rpx;
				height: calc(100% - var(--status-bar-height));
				display: flex;
				align-items: center;
			}
		}

		.placeholder {
			width: 100%;
			height: $navBarHeight;
			position: relative;
		}
	}
</style>
