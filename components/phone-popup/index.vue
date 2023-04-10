<template>
	<view>
		<u-popup :show="show" @close="show=false" round="20" closeable>
			<view class="popup-wrap">
				<view class="title">
					选择手机号码
				</view>
				<view class="popup-list">
					<view v-for="(item,index) in phoneList" :key="index" class="popup-item" @tap="select(item)">
					<view class="phone">
						{{item}}
					</view>	
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getPhoneList
	} from '@/api/user/index.js'
	export default {
		data() {
			return {
				show: false,
				phoneList:[]
			}
		},
		methods: {
			open() {
				this.getPhoneList()
				this.show = true
			},
			select(e){
				this.$emit('selected',e)
				this.show = false
			},
			getPhoneList() {
				return new Promise((resolve, reject) => {
					getPhoneList().then(data => {
						this.phoneList = data.list
						resolve()
					}).catch(() => {
						reject()
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-wrap {
		padding: 40rpx;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		.title{
			height: 60rpx;
			text-align: center;
			font-size: 36rpx;
		}
		.popup-list{
			margin-top: 40rpx;
			display: flex;
			flex-wrap: wrap;
			.popup-item{
				width: 50%;
				margin-bottom: 40rpx;
				display: flex;
				justify-content: center;
				.phone{
					border: 1rpx solid $themeColor;
					color: $themeColor;
					background: #EBF1F3;
					font-size: 32rpx;
					padding: 10rpx 20rpx;
				}
			}
		}
	}
</style>
