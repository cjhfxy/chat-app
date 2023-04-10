<template>
	<view class="container">
		<view class="header">
			<view class="fold">
				<view class="title">项目列表(点击项目可勾选或取消)</view>
				<view class="task-wrap">
					<view class="task-list">
						<taskItem v-for="(item,index) in taskList" :key="index" :item="item"></taskItem>
					</view>
				</view>
			</view>
			<headbox @begin="begin" :tip='tip' />
		</view>
		<view v-if="!myTaskList.length">
			<wl-empty text="暂无记录" icon="/static/empty/order.png"></wl-empty>
		</view>
		<view v-else class="list">
			<view v-show="show" class="fade">
				<task-list :nowTime="nowTime" :seconds="userSeconds" :vCodeSeconds="vCodeSeconds" v-for="(item, index) in myTaskList" :key="index"
					:item="item" />
			</view>
		</view>
	</view>
</template>

<script>
	import headbox from './component/headbox.vue'
	import taskItem from './component/task-item.vue'
	import taskList from './component/task-list.vue'
	import {
		getTaskList,
	} from '@/api/task/index.js'
	import {
		getMyTaskList
	} from '@/api/user/index'
	import wsRequest from '@/utils/websocket.js'
	import config from '@/config/'
	export default {
		components: {
			headbox,
			taskItem,
			taskList
		},
		data() {
			return {
				taskList: [],
				show: true,
				phoneNumber: '',
				myTaskList: [],
				userSeconds: '',
				tip: '',
				vCodeSeconds: '',
				nowTime: 0
			}
		},
		onLoad() {
			new wsRequest(config.wssUrl + '?X-AUTH-TOKEN-BY-UID=' + this.$store.getters.uid, 10000)
			uni.onSocketMessage(res => {
				const data = JSON.parse(res.data)
				this.handleWebsocket(data)
			});

		},
		onShow() {
			this.getSeconds()
			this.getList()
			this.getTip()
		},
		onPullDownRefresh() {
			return new Promise(resolve => {
				Promise.allSettled([
					this.getList(),
					this.getMyTaskListData()
				]).then(results => {
					uni.stopPullDownRefresh()
					resolve()
				})
			})
		},
		methods: {
			handleWebsocket(data) {
				if (data.type == 'TYPE_VCODE_SENT') {
					this.myTaskList = []
					this.nowTime = new Date().getTime() / 1000
					this.getMyTaskListData()
				}
				if (data.type == 'TYPE_VCODE_SUBMIT') {
					this.myTaskList = []
					this.getMyTaskListData()
				}
				if (data.type == 'TYPE_VCODE_RECEIVE') {
					this.myTaskList = []
					this.getMyTaskListData()
				}
				if (data.type == 'TYPE_FEEDBACK') {
					this.myTaskList = []
					this.getMyTaskListData()
				}
			},

			begin(e) {
				this.phoneNumber = e
				this.myTaskList = []
				this.nowTime = new Date().getTime() / 1000
				this.getMyTaskListData()
			},
			// 获取倒计时
			getSeconds() {
				return new Promise(resolve => {
					this.$store.dispatch('app/getParamConfig').then(data => {
						this.userSeconds = data.USER_COUNT_SECONDS //等待商户取号
						this.vCodeSeconds = data.CAPTCHA_COUNT_SECONDS //输入验证码时间
						resolve()
					})
				})
			},
			// 获取提示
			getTip() {
				return new Promise(resolve => {
					this.$store.dispatch('app/getParamConfig').then(data => {
						this.tip = data.PHONE_INPUT_TIP
						resolve()
					})
				})
			},
			getList() {
				return new Promise((resolve, reject) => {
					getTaskList().then(data => {
						data.list.map(item => {
							const have = data.ignoreTaskList.some(some => {
								return some === item.id
							})
							if (have) {
								item.selected = false
							} else {
								item.selected = true
							}
							return item
						})
						this.taskList = data.list
						resolve()
					}).catch(() => {
						reject()
					})
				})
			},
			getMyTaskListData() {
				if (this.phoneNumber !== '') {
					return new Promise((resolve, reject) => {
						getMyTaskList({
							status: 0,
							phoneNumber: this.phoneNumber
						}).then(data => {
							this.myTaskList = data.list.filter(item => item.status < 100)
							resolve()
						}).catch(() => {
							reject()
						})
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;

		.header {
			width: 100%;

			.fold {
				background-color: #fff;
				padding: 30rpx 30rpx 0 30rpx;

				.title {
					margin-bottom: 30rpx;
				}

				.task-wrap {

					.task-list {
						display: flex;
						flex-wrap: wrap;
					}
				}
			}
		}

		.list {
			overflow: hidden;
			padding-top: calc(20rpx + var(--status-bar-height));
			margin: 0 30rpx;
			padding-bottom: 100rpx;
		}

	}
</style>