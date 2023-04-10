<template>
	<view class="task-item" @tap="ignoreTask">
		<image v-if="selected" class="selected" src="/static/icons/task_selected.png"></image>
		<view class="text">
			<view>
				{{item.name}}
			</view>
			<view>
				{{`(${item.price/100}分)`}}
			</view>
		</view>
		
	</view>
</template>
<script>
	import {
		ignoreTask,
		addIgnoreTask
	} from '@/api/task/index.js'
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
				selected: true,
			}
		},
		created() {
			this.selected = this.item.selected
		},
		methods: {
			ignoreTask() {
				if (this.selected) {
					ignoreTask({
						taskId: this.item.id
					}).then(res => {
						this.selected = false
					})
				} else {
					addIgnoreTask({
						taskId: this.item.id
					}).then(res => {
						this.selected = true
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-item {
		position: relative;
		width: 198rpx;
		background: #EBF1F3;
		border: 2rpx solid #014C94;
		font-size: 28rpx;
		font-weight: bold;
		color: #014C94;
		margin-bottom: 30rpx;
		margin-right: 30rpx;
		text-align: center;
		.text{
			display: flex;
			flex-direction: column;
		}
		.selected {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 28rpx;
			height: 27rpx;
		}
	}
</style>
