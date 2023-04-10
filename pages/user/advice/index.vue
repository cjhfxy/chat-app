<template>
	<view>
		<nav-bar title="意见反馈" :back="1"></nav-bar>
		<view class="content">
			<text>请提交你的意见</text>
			<view class="u-demo-block">
				<view class="u-demo-block__content">
					<u--form labelPosition="left" ref="form1">
						<u-form-item prop="intro" borderBottom>
							<u--textarea v-model="intro" count></u--textarea>
						</u-form-item>
						<view class="upload">
							<upload v-model="images" :max-count="5" :width="100" :height="100" />
						</view>
					</u--form>
					<u-toast ref="uToast"></u-toast>
					<view class="btn">
						<u-button text="重置" customStyle="width:300rpx" @click="reset"></u-button>
						<u-button type="primary" text="提交" customStyle="width:300rpx" @click="submit"></u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		suggestion
	} from '@/api/user/index.js'
	import upload from '@/components/upload/'
	export default {
		components: {
			upload
		},
		data() {
			return {
				intro: '',
				note: '',
				images: []
			}
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
					message: '已提交',
					complete() {
						uni.switchTab({
							url: '/pages/home/index/index'
						})
					}
				})
			},
			submit() {
				suggestion({
					content: this.intro,
					note: this.note,
					images:JSON.stringify(this.images)
				}).then(() => {
					this.showToast()
				})
			},
			reset() {
				const validateList = this.intro
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
				}, 10)
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 24rpx;
		
		.btn {
			margin-top: 30rpx;
			display: flex;
		}
		
		.upload{
			background-color: #fff;
			padding: 24rpx;
			display: flex;
		}
	}
</style>
