<template>
	<view class="article-item" @tap="$jumpPage(`/pages/article/detail/index?id=${item.id}`)">
		<image class="images" :src="item.headPic" mode="aspectFill" />
		<view class="item-content">
			<view class="title">
				{{item.title}}
			</view>
			<view class="info">
				<text>{{item.categoryName}}</text>
				<text>{{ item.publishTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.article-item{
		display: flex;
		padding: 24rpx 0;
		border-bottom: 2rpx solid #E6E6E6;
		&:last-child{
			border-bottom: 0;
		}
		.images{
			width: 240rpx;
			height: 160rpx;
		}
		.item-content{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10rpx 24rpx;
			.title{
				height: 80rpx;
				line-height: 40rpx;
				word-break: break-all;
				overflow: hidden;
				font-size: 34rpx;
			}
			.info{
				display: flex;
				justify-content: space-between;
				font-size: 20rpx;
				color: #BDBDBD;
				align-items: center;
				.views{
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
