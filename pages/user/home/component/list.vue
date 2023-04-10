<template>
	<view class="bx-f-ac">
		<view v-for="(item,index) in datalist" :key="index" class="item bx-fd-c" @click="change(item)">
			<view class="icon">
				<image :src="item.icons" :style="{width:`${iconWidth}rpx` , height:`${iconHeight}rpx` }">
					<m-badge :count="item.value" :top="-10" :right="-10" />
			</view>
			<view class="text" :style="{fontSize:`${fontSize}rpx` , color:`${fontColor}`}">
				{{item.text}}
			</view>
		</view>
	</view>

</template>

<script>
	import MBadge from '@/components/m-badge/'
	export default {
		components: {
			MBadge
		},
		props: {
			datalist: Array,
			iconWidth: {
				type: Number,
				default: 72
			},
			iconHeight: {
				type: Number,
				default: 72
			},
			fontSize: {
				type: Number,
				default: 28
			},
			fontColor: {
				type: String,
				default: '#333333'
			}
		},
		methods: {
			change(item) {
				if (item.path) {
					this.$jumpPage(item.path)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		flex: 1;
		.icon{
			position: relative;
		}
		.text{
			margin-top: 8rpx;
		}
	}
</style>
