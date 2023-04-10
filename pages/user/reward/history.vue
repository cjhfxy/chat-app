<template>
  <view class="container">
    <nav-bar :back="1" title="历史佣金" />
    <view class="detail">
      <view v-if="load" class="list">
        <view v-for="(item,index) in list" :key="index" class="item" @tap="showMore(index)">
          <view class="top">
            <view class="date">
              {{ item.month }}
            </view>
            <view>
              <text class="text">销售额:</text> <text class="submoney">¥{{ item.orderMoney | parseMoney }}</text>
            </view>
            <view>
              <text class="text">提成:</text> <text class="submoney">¥{{ item.awardMoney | parseMoney }}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="isEmpty && load" class="notext">
        暂无历史
      </view>
    </view>
  </view>
</template>

<script>
import {
  getHistoryAwardStat
} from '@/api/user/index.js'
import Mixin from '@/utils/mixin.js'
export default {
  mixins: [Mixin],
  data() {
    return {
      list: [],
      load: false
    }
  },
  onLoad() {
    this.triggerInit()
  },
  methods: {
    downCallback() {
      return new Promise(resolve => {
        Promise.allSettled([
          this.getHistoryAwardStat(1)
        ]).then(results => {
          resolve(results[0].value)
        })
      })
    },
    upCallback(page) {
      return new Promise(resolve => {
        this.getHistoryAwardStat(page).then(length => {
          resolve(length)
        })
      })
    },
    getHistoryAwardStat(page) {
      return new Promise((resolve, reject) => {
        // status: 0,
        const param = {
          page: page
        }
        getHistoryAwardStat(param).then(res => {
          var tempList = res.list.map((item) => {
            const year = item.month.substr(0, 4)
            const month = item.month.substr(4, 6)
            item.month = year + ' - ' + month
            item.more = false
            return item
          })
          if (page === 1) {
            this.list = tempList
          } else {
            this.list = this.list.concat(tempList)
          }
          this.load = true
          resolve(tempList.length)
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    background-color: #EFEFF4;
    min-height: 100vh;
    .notext {
      text-align: center;
      margin-top: 300rpx;
      font-size: 16px;
      font-weight:500;
      color: #000000;
    }
    .detail{
      width:702rpx;
      // position: relative;
      // top: -54rpx;
      margin: 0 auto;
      margin-bottom: 30rpx;
      .title{
        display: flex;
        height: 54rpx;
        view{
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:12px;
          font-weight:400;
          color: white;
        }
      }
      .list{
        .item{
          margin-top: 16rpx;
          width:702rpx;
          border-radius:8rpx;
          background: #FFFFFF !important;
          .top{
            height:88rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 24rpx;
            view{
              // width: 50%;
              text-align: center;
              font-size:12px;
              font-weight:400;
            }
            .text {
              margin-right: 10rpx;
            }
            .submoney{
              color: red;
            }
            .name {
              width: 25%;
              view {
                width: 120rpx;
                margin: 0 auto;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
            }
          }
          .arrow {
            height: 0;
            width: 0 !important;
            border-width: 8rpx;
            border-style: solid;
            border-color: transparent transparent transparent #42466B;
            transform-origin: 5rpx 50%;
            transition: all .1s;
            position: relative;
            right: 8rpx;
            &.down {
              transform: rotate(90deg);
            }
          }
          .more{
            width:702rpx;
            background:#FAFAFA;
            border-radius:8rpx 0rpx 8rpx 8rpx;
            padding: 12rpx 0;
            .title{
              display: flex;
              background-color: #FAFAFA;
              view{
                width: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size:12px;
                font-weight:400;
                color: #757575;
              }
            }
          }
          .list1{
            .line {
              width: 692rpx;
              height: 2rpx;
              background: #EFEFF4;
              margin-left: 10rpx;
            }
            .item1{
              width:702rpx;
              height: 132rpx;
              border-radius:8rpx;
              background-color: #FAFAFA;
              display: flex;
              align-items: center;
              .left image{
                width: 100rpx;
                height: 100rpx;
                margin-left: 10rpx;
              }
              .right {
                margin-left: 16rpx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                .top{
                  background-color: #FAFAFA;
                  margin-bottom: 16rpx;
                  width: 566rpx;
                  height: 40rpx;
                  font-size: 14px;
                  font-weight: 400;
                  color: #212121;
                  text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                .bottom {
                  display: flex;
                  view {
                    font-size: 12px;
                    font-weight:400;
                    color: #757575;
                  }
                  .block {
                    color: #212121;
                  }
                  .red {
                    color: #FF0000;
                  }
                }
              }
            }
          }
          image{
            height: 24rpx;
            width: 14rpx;
          }
        }
      }
    }
  }
</style>
