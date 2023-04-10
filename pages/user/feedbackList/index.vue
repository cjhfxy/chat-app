<template>
	<view>
		<nav-bar :back='1' title='反馈列表'></nav-bar>
		<view class="" v-for="(item,index) in list" :key="index">
			<item :detailData='item'></item>
		</view>
	</view>
</template>

<script>
	import item from './component/item.vue'
	import {
		getMyFeedbackList,
	} from '@/api/user/index'
	export default {
		components: {
			item
		},
		data() {
			return {
				list: []
			};
		},
		onPullDownRefresh() {
			return new Promise(resolve => {
				Promise.allSettled([
					this.getDetail(),
				]).then(results => {
					uni.stopPullDownRefresh()
					resolve()
				})
			})
		},
		methods:{
			getDetail() {
					return new Promise(resolve => {
						getMyFeedbackList({}).then(data => {
							this.list = data.list
							resolve()
						})
					})
				},
		},
		onShow() {
			this.getDetail()
		}
	}
</script>

<style lang="scss">

</style>