<template>
	<view class="article-wrap">
		<view class="article-top">
			<image class="icon" src="/static/icons/new_notice.png">
			<view class="more" @tap="$jumpPage('/pages/article/list/index?id=1012&name=平台公告')">
				更多>>
			</view>
		</view>
		<view class="article-list">
			<view v-for="(item,index) in list" :key="index" class="article-item" @tap="$jumpPage(`/pages/article/detail/index?id=${item.id}`)">
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
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {

		}
	};
</script>
<style lang="scss" scoped>
	.article-wrap {
		width: 702rpx;
		margin: 0 24rpx;

		.article-top {
			height: 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.icon{
				width: 153rpx;
				height: 45rpx;
			}
			.more{
				color: #A0ABB1;
				font-size: 20rpx;
			}
		}
		.article-list{
			margin-top: 24rpx;
			width: 702rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			border: 2rpx solid #FFFFFF;
			padding-left: 28rpx;
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
		}
	}
</style>
