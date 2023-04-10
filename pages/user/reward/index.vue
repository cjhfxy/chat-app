<template>
  <view class="container">
    <nav-bar :back="1" title="佣金明细" />
    <view class="backgroundImage">
      <view class="total-top">
        <view v-for="(item,index) in banlance" :key="index" class="total-box">
          <view class="top-amount">{{ item.amount | parseMoney }}</view>
					 <view class="top-title">{{ item.title }}</view>
        </view>
      </view>
      <view class="total-bottom">
        <view v-for="(item,index) in cashOut" :key="index" class="total-box">
					<view class="bottom-amount">{{ item.amount | parseMoney }}</view>
          <view class="bottom-title">{{ item.title }}</view>
        </view>
      </view>
    </view>
    <view class="info">
      <view v-for="(item,index) in info" :key="index" class="info-box">
        {{ item.title }}<br>
        <text class="info-text">{{ item.amount | parseMoney }}</text>
      </view>
    </view>
    <view class="menu">
      <view class="menu-button" @tap="$jumpPage('/pages/user/reward/history')">查看历史奖励<image
        class="image"
        src="/static/icons/arrow_right_black.png"
      />
      </view>
      <view class="menu-button" @tap="$jumpPage('/pages/user/withdraw/withdraw')">立即去提现<image
        class="image"
        src="/static/icons/arrow_right_black.png"
      />
      </view>
    </view>
    <view class="details">
      <text class="details-title">收益记录</text>
      <view class="details-tab">
        <view v-for="(item,index) in tabList" :key="index" class="tab-box">
          <view :class="item.status ==0? 'tab' : 'tab open'" @tap="changeTab(index)">{{ item.title }}</view>
        </view>
      </view>
      <view class="details-content" bindscrolltolower="onReachBottom">
        <view v-for="(item,index) in list" :key="index" class="content-box">
          <view style="color:#181818;">流水号：{{ item.orderNo }}<text
            style="position: absolute;right:26rpx;color: #6b6b6b;"
          >+{{ item.orderAward| parseMoney }}元</text>
          </view>
          <view style="color: #bababa;font-size: 12px;">{{ item.createTime }}<text
            style="position: absolute;right:26rpx;color: #c24d2d;"
          >{{ item.type }}</text></view>
        </view>
      </view>
    </view>
    <view v-if="!list.length && load" style="text-align: center;margin-top: 40rpx;">暂无明细</view>
  </view>
</template>

<script>
import {
  getAwardList,
  getAwardCommission
} from '@/api/user/index.js'
import Mixin from '@/utils/mixin.js'
export default {
  mixins: [Mixin],
  data() {
    return {
      date: '',
      list: [],
      monthAward: 0,
      load: true,
      banlance: [{
        title: '累计收益',
        amount: '0'
      }, {
        title: '积分余额',
        amount: '0'
      }],
      cashOut: [{
        title: '总佣金',
        amount: '0'
      }, {
        title: '预计收入',
        amount: '0'
      }],
      info: [{
        title: '今日估计',
        amount: '0'
      }, {
        title: '昨日预估',
        amount: '0'
      }, {
        title: '当月预估',
        amount: '0'
      }, {
        title: '上月预估',
        amount: '0'
      }],
      tabList: [{
        title: '今日',
        status: 1
      }, {
        title: '昨日',
        status: 0
      }, {
        title: '近7日',
        status: 0

      }, {
        title: '本月',
        status: 0
      }, {
        title: '本年',
        status: 0
      }],
      currentTab: 0,
      page: '',
      nowTime: '',
      toDay: '',
      yesterDay: '',
      week: '',
      sameMonth: '',
      year: '',
      beginTime: '',
      endTime: ''
    }
  },
  onLoad() {
    this.timeStamp()
    this.triggerInit()
  },
  computed: {
    userInfo() {
      const userInfo = this.$store.getters.userInfo
      console.log(userInfo, 520)
      this.banlance[0].amount = userInfo.thisMonthOrderMoney
      this.banlance[1].amount = userInfo.leftBalance
      this.cashOut[0].amount = userInfo.totalAward
      this.cashOut[1].amount = userInfo.toAwardAmount
    }
  },
  methods: {
    timeStamp() {
      var today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)
      var oneday = 1000 * 60 * 60 * 24
      this.nowTime = Math.round(new Date() / 1000) // 当前时间
      this.toDay = Math.round(new Date(today) / 1000) // 今日0点
      this.yesterDay = Math.round(new Date(today - oneday) / 1000) // 昨日0点
      this.week = Math.round(new Date(today - oneday * 7) / 1000) // 一周前日0点
      var sameMonth = new Date(today - oneday * (today.getDate() - 1))
      this.sameMonth = Math.round(new Date(sameMonth - oneday * (sameMonth.getDate() - 1)) / 1000) // 本月1号0点
      var year = new Date()
      year.setHours(0)
      year.setMinutes(0)
      year.setSeconds(0)
      year.setMilliseconds(0)
      year.setMonth(0)
      year.setDate(1)
      this.year = Math.round(new Date(year) / 1000) // 今年1月1日0点
      this.beginTime = this.toDay
      this.endTime = this.nowTime
    },
    downCallback() {
			  return new Promise(resolve => {
			    Promise.allSettled([
			      this.getAwardList()
			    ]).then(results => {
			      resolve(results[0].value)
			    })
			  })
    },
    upCallback(page) {
			  return new Promise(resolve => {
			    this.getAwardList(page).then(length => {
			      resolve(length)
			    })
			  })
    },
    getAwardList(page = 1) {
      return new Promise((resolve, reject) => {
        const param = {
          status: 0,
          page: page,
          beginTime: this.beginTime,
          endTime: this.endTime
        }
        getAwardList(param).then(res => {
          this.info[0].amount = res.todayProfit
          this.info[1].amount = res.yesterdayProfit
          this.info[2].amount = res.thisMonthProfit
          this.info[3].amount = res.lastMonthProfit
          var tempList = res.list.map((item) => {
            item.more = false
            var timeTtamp = item.createTime
            var time = new Date(timeTtamp * 1000)
            item.createTime = this.formatDate(time)
            if (item.awardType === 1) {
              item.awardType = '直推'
            } else if (item.awardType === 2) {
              item.awardType = '间推'
            } else if (item.awardType === 3) {
              item.awardType = '自提'
            } else {
              item.awardType = '未知'
            }
            item.type = ''
            if (item.status === -1) {
              item.type = '订单取消'
            } else if (item.status === 1) {
              item.type = '待结算'
            } else {
              item.type = this.$parseTime(item.createTime * 1000, '{y}.{m}.{d}')
            }
            return item
          })
          if (page === 1) {
            this.list = tempList
          } else {
            this.list = this.list.concat(tempList)
          }
          this.load = true
          resolve([res.hasNext, res.list.length])
        }).catch(() => {
          reject()
        })
      })
    },
    changeTab(e) {
      for (let i = 0; i < this.tabList.length; i++) {
        this.tabList[i].status = 0
      }
      this.tabList[e].status = 1
      this.Page = 1
      switch (e) {
        case 0:
          this.beginTime = this.toDay
          this.endTime = this.nowTime
          break
        case 1:
          this.beginTime = this.yesterDay
          this.endTime = this.toDay
          break
        case 2:
          this.beginTime = this.week
          this.endTime = this.nowTime
          break
        case 3:
          this.beginTime = this.sameMonth
          this.endTime = this.nowTime
          break
        case 4:
          this.beginTime = this.year
          this.endTime = this.nowTime
          break
      }
      this.triggerInit()
    },

    formatDate(now) {
      var year = now.getFullYear() // 取得4位数的年份
      var month = now.getMonth() + 1 // 取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate() // 返回日期月份中的天数（1到31）
      var hour = now.getHours() // 返回日期中的小时数（0到23）
      var minute = now.getMinutes() // 返回日期中的分钟数（0到59）
      var second = now.getSeconds() // 返回日期中的秒数（0到59）
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>

<style>
	page {
		background: #f7f7f7;
	}
</style>

<style lang="scss" scoped>
	.top-right {
		font-size: 14px;
		color: #FFFFFF;
	}

	.container {
		min-height: 100vh;
		padding-bottom: 12rpx;
		background-color: #f7f7f7;
	}

	.mescroll {
		flex: 1;
		height: 0;
	}

	.backgroundImage {
		width: 702rpx;
		height: 334rpx;
		background: linear-gradient(270deg, #014C94 0%, #3E96E9 100%);
		border-radius: 12rpx;
		margin: 24rpx auto 0 auto;
		align-items: center;
		justify-content: space-between;
		color: #FFFFFF;

		.total-top {
			height: 186rpx;
			width: 100%;
			display: flex;
		}

		.total-bottom {
			height: 148rpx;
			width: 100%;
			display: flex;
		}

		.total-box {
			position: relative;
			height: 100%;
			width: 100%;
			padding-top: 40rpx;

			.top-title {
				height: 50rpx;
				width: 100%;
				line-height: 50rpx;
				color: #fff;
				font-size: 12px;
				padding-left: 70rpx;
			}

			.top-amount {
				height: 60rpx;
				width: 100%;
				line-height: 60rpx;
				font-size: 36rpx;
				font-family: 'numberFont';
				color: #fff32b;
				padding-left: 70rpx;
			}

			.bottom-title {
				color: #fff;
				font-size: 12px;
				padding-left: 70rpx;
			}

			.bottom-amount {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 36rpx;
				font-family: 'numberFont';
				color: #fff32b;
				padding-left: 70rpx;
			}
		}
	}

	.info {
		height: 135rpx;
		width: 702rpx;
		background-color: #FFFFFF;
		margin: 24rpx auto 0 auto;
		border-radius: 12rpx;
		display: flex;
		justify-content: space-between;
		overflow: hidden;

		.info-box {
			position: relative;
			height: inherit;
			width: 25%;
			text-align: center;
			line-height: 20px;
			font-size: 12px;
			padding-top: 26rpx;
			color: #757575;

			.info-text {
				position: relative;
				color: #2d2d2d;
				font-size: 14px;
				font-weight: 600;
			}
		}

		.info-box::after {
			position: absolute;
			content: "";
			top: 45rpx;
			left: -1px;
			height: 45rpx;
			width: 1px;
			background-color: #d4d4d4;
		}
	}

	.menu {
		height: 100rpx;
		width: 702rpx;
		margin: 24rpx auto 0 auto;
		display: flex;
		justify-content: space-between;

		.menu-button {
			height: 100rpx;
			width: 346rpx;
			background: linear-gradient(to right, #50CCFF, #4D82FF);
			border-radius: 12rpx;
			font-size: 14px;
			line-height: 100rpx;
			text-align: center;
			font-weight: 700;
			color: #41212c;

			.image {
				height: 25rpx;
				width: 20rpx;
				margin-left: 15rpx;
			}
		}

		.menu-button:last-child {
			background: linear-gradient(to right, #f5f698, #fae46c);
		}
	}

	.details {
		width: 702rpx;
		margin: 24rpx auto 0 auto;

		.details-title {
			font-size: 14px;
			font-weight: 700;
			color: #1d1e22;
		}

		.details-tab {
			height: 50rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 24rpx;

			.tab {
				height: inherit;
				width: 110rpx;
				border-radius: 25rpx;
				border: 1px solid #dcdedd;
				text-align: center;
				line-height: 50rpx;
				font-size: 12px;
				font-weight: 700;
			}

			.open {
				border: 1px solid $themeColor;
				color: #FFFFFF;
				background-color: $themeColor;
			}
		}
	}

	.details-content {
		width: 702rpx;
		margin: 24rpx auto 0 auto;
		background-color: #ffffff;
		border-radius: 12rpx;

		.content-box {
			height: 119rpx;
			width: 100%;
			padding: 26rpx;
			font-size: 14px;
			position: relative;
		}
	}
</style>
