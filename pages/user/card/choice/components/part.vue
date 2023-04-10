<template>
	<view class="part">
		<view class="right">
			<view class="top">
				{{list.address}}
			</view>
			<view class="bottom">
				{{list.itemId==51?'USDT':'TRX'}}
			</view>
			<view class="time">
				{{list.createTime|parseTime('{y}-{m}-{d} {h}:{i}')}}
			</view>
		</view>
		<view class="set">
			<view class="left" @click="delCard">
				<u-icon name="trash-fill" color="#fff" size="20"></u-icon>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		delCard
	} from '@/api/wallet/index.js';
	export default {
		props: ['list', 'select', 'current'],
		emit: ['select', 'update'],
		data() {
			return {

			}
		},
		methods: {
			toSelect() {
				this.$emit('select', this.current)
			},
			delCard() {
				delCard({
					id: this.list.id
				}).then(res => {
					this.$emit('update')
				})
			},
			editCard() {
				this.$jumpPage(
					`/pages/user/card/bind/index?key=edit&id=${this.list.id}&tel=${this.list.phoneNumber}&cardNo=${this.list.cardNo}&branch=${this.list.branch}`
				)
			}

		},
	}
</script>

<style lang="scss" scoped>
	.part {
		height: 208rpx;
		margin-top: 32rpx;
		border-radius: 24rpx;
		background: repeating-linear-gradient(to right, #4F81BE, #3C60AA);
		box-shadow: 0px 0px 60rpx 2rpx rgba(141, 151, 158, 0.2);
		display: flex;
		align-items: center;
		position: relative;

		.right {
			margin-left: 40rpx;
			display: flex;
			flex-direction: column;

			.top {
				font-size: 36rpx;
				font-weight: 400;
				color: #ffefc2;
			}

			.bottom {
				margin-top: 8rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #fff;
			}

			.time {
				margin-top: 8rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #fff;
			}
		}

		.set {
			position: absolute;
			right: 50rpx;
			top: 20rpx;
			display: flex;
			align-item: center;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-top: 4rpx;
				margin-left: 20rpx;
			}
		}

	}
</style>
