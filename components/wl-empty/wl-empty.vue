<template>
	<view class="wl-empty">
		<image :style="{
				width: $u.addUnit(width),
				height: $u.addUnit(height),
			}" :src="icon" mode="widthFix"></image>
		<text class="wl-empty_text" :style="[textStyle]">{{text ? text : icons[mode]}}</text>
		<view v-if="$slots.default || $slots.$default">
			<slot />
		</view>
	</view>
</template>

<script>
	/**
	 * empty 内容为空
	 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景。
	 * @property {String}			icon		图片路径，建议绝对路径
	 * @property {String}			text		提示文字
	 * @property {String}			textColor	文字颜色 (默认 '#868686' )
	 * @property {String | Number}	textSize	文字大小 （默认 14 ）
	 * @property {String | Number}	width		图标宽度，单位px （默认 150 ）
	 * @property {String | Number}	height		图标高度，单位px （默认 150 ）
	 * 
	 * @example <wl-empty text="记录为空" mode="list"></wl-empty>
	 */
	export default {
		name: "wl-empty",
		props: {
			// 内置图标名称，或图片路径，建议绝对路径
			icon: {
				type: String,
				default: '/static/empty/empty.png'
			},
			// 提示文字
			text: {
				type: String,
				default: '暂无订单'
			},
			// 文字颜色
			textColor: {
				type: String,
				default: '#868686'
			},
			// 文字大小
			textSize: {
				type: [String, Number],
				default: '14'
			},
			//  图标宽度，单位px
			width: {
				type: [String, Number],
				default: '150'
			},
			// 图标高度，单位px
			height: {
				type: [String, Number],
				default: '150'
			},
		},
		computed: {
			// 文本样式
			textStyle() {
				const style = {}
				style.color = this.textColor
				style.fontSize = uni.$u.addUnit(this.textSize)
				return style
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wl-empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&_text {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx
		}
	}
</style>