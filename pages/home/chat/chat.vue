<template>
	<view class="chat">
		<nav-bar title="北方" backgroundColor="#272a37" color="#a9a9a9" back="2000">
		</nav-bar>
		<view class="conter">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="left" v-if="item.uid==1">
					<image src="/static/logo.png"></image>
					<view class="diatlog">
						<view class="name">
							{{item.name}}
						</view>
						<view class="text">
							{{item.text}}
						</view>
					</view>
				</view>
				<view v-else class="right">

					<view class="diatlog">
						<view class="name">
							{{item.name}}
						</view>
						<view class="text">
							{{item.text}}
						</view>
					</view>
					<image src="/static/logo.png"></image>
				</view>
			</view>
		</view>
		<view class="input">
			<view class="v">

			</view>
			<u--input border="none" color="#a9a9a9" placeholder="请输入内容"></u--input>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '1121',
						uid: 1,
						text: 'dasjkdljad啊计划大江大河卡莎及时的记得哈接电话'
					},
					{
						name: '1121',
						uid: 2,
						text: 'dasjkdljad啊计划大江大河卡莎及时的记得哈接电话'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.conter {
		padding: 24rpx;
		border-top: 1px solid #373a4a;
		background-color: #272a37;
		min-height: 100vh;

		.item {
			display: flex;
			margin: 20px 0;

			.left {
				display: flex;
				float: left;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-left: 20rpx;
				}

				.diatlog {
					flex: 1;
					margin-left: 20rpx;

					.name {
						color: #dfdfdf;
						font-size: 35rpx;
					}

					.text {
						margin-right: 50rpx;
						background-color: #efefef;
						border-radius: 20rpx;
						padding: 10rpx;
					}
				}
			}

			.right {
				display: flex;
				float: right;
				text-align: right;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.diatlog {
					flex: 1;
					margin-right: 20rpx;

					.name {
						color: #dfdfdf;
						font-size: 35rpx;
					}

					.text {
						text-align: left;
						margin-left: 50rpx;
						background-color: #93e872;
						border-radius: 20rpx;
						padding: 10rpx;
					}
				}
			}
		}

	}

	.input {
		width: 90%;
		height: 70rpx;
		position: fixed;
		left: 50%;
		bottom: 20rpx;
		transform: translate(-50%, 0);
		border-radius: 20rpx;
		background-color: #424655;
		
		display: flex;
		.v{
			width: 10rpx;
			height: 10rpx;
			}
			
	}
</style>