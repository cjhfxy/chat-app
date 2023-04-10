<template>
	<view class="content">
		<nav-bar :back="1" title="余额明细"></nav-bar>
		<view class="area">
			<log-item v-for="(item,index) in list" :key="index" :item="item"></log-item>
		</view>
	</view>
</template>

<script>
	import logItem from '../component/log-item.vue';
	import Mixin from '@/utils/mixin.js'
	import {
		getBalanceLog
	} from '@/api/user/index.js'
	export default {
		components: {
			logItem
		},
		mixins: [Mixin],
		data() {
			return {
				list:[]
			}
		},
		onShow(){
			this.triggerInit()
		},
		onPullDownRefresh() {
			return new Promise(resolve => {
				Promise.allSettled([
					this.triggerInit()
				]).then(results => {
					uni.stopPullDownRefresh()
					resolve()
				})
			})
		},
		methods: {
			getList(page = 1) {
				return new Promise((resolve, reject) => {
				  getBalanceLog({
						page,
						itemId:1
					}).then(data => {
						if (page === 1) {
						  this.list = data.list
						} else {
						  this.list = this.list.concat(data.list)
						}
				    resolve([data.hasNext, data.list.length])
				  }).catch(() => {
				    reject()
				  })
				})
			},
			downCallback() {
				return new Promise(resolve => {
					Promise.allSettled([
						this.getList()
					]).then(results => {
						resolve(results[0].value)
					})
				})
			},
			upCallback(page) {
				return new Promise(resolve => {
					this.getList(page).then(length => {
						resolve(length)
					})
				})
			}
		}
	}
</script>

<style>

</style>
