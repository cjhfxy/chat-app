<template>
  <view>
    <view class="header">
  <!--    <image class="bg" src="/static/user/user.png"></image> -->
      <view class="user-avatar" @tap="tapInfo">
    <!--    <image class="image" :src="userInfo.avatar ? userInfo.avatar : '/static/images/avatar.png'" mode="aspectFill" /> -->
      </view>
      <view class="user-info">
        <view class="user-name" @tap="tapInfo">
          <template v-if="isLogin">
            <view class="info-hd">
              <view class="name">{{ userInfo.nickName }}</view>
            </view>
          </template>
          <template v-else>
            <view class="login">点击登录</view>
          </template>
        </view>
        <view class="balance">
          <view v-for="(item, index) in dataTabs" :key="index" class="item" @tap="$jumpPage(item.page)">
            <view v-if="index === 0" class="amount">{{ item.value | parseMoney }}</view>
            <view v-else class="amount">{{ item.value }}</view>
            <view class="label">
              {{ item.text }}
              <u-icon name="arrow-right" color="#999999" size="14"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

		<view class="view">
			<view class="order">
			  <view class="title">
			    <view class="left">
			      我的订单
			    </view>
			    <view class="right" @tap="$jumpPage(`/pages/user/order/index?index=0`)">
			      查看全部订单
			      <u-icon name="arrow-right" color="#999999" size="16"></u-icon>
			    </view>
			  </view>
			  <view class="content">
			    <view v-for="(item, index) in orderTabs" :key="index" class="item" @tap="$jumpPage(item.page)">
			      <image class="icon" :src="item.icon" />
			      <view class="text">{{ item.text }}</view>
			
			    </view>
			  </view>
			</view>
			<view class="menu">
			  <view v-for="(item, index) in menuTabs" :key="index">
			    <view v-if="index" class="border" />
			    <view v-if="item.text === '联系客服'" class="row">
			      <image class="left" :src="item.icon" />
			      <view class="center">{{ item.text }}</view>
			      <u-icon name="arrow-right" color="#212121" size="16"></u-icon>
			      <button class="hide" open-type="contact" />
			    </view>
			    <view v-else class="row" @tap="$jumpPage(item.page)">
			      <image class="left" :src="item.icon" />
			      <view class="center">{{ item.text }}</view>
			      <u-icon name="arrow-right" color="#212121" size="16"></u-icon>
			    </view>
			  </view>
			</view>
		</view>
  
		
	</view>
</template>

<script>

export default {

  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      orderTabs: [{
        icon: '/static/icons/icon_order1.png',
        text: '待付款',
        page: '/pages/user/order/index?index=1',
        tip: 0
      }, {
        icon: '/static/icons/icon_order2.png',
        text: '待发货',
        page: '/pages/user/order/index?index=2',
        tip: 0
      }, {
        icon: '/static/icons/icon_order3.png',
        text: '待收货',
        page: '/pages/user/order/index?index=3',
        tip: 0
      }, {
        icon: '/static/icons/icon_order4.png',
        text: '已完成',
        page: '/pages/user/order/index?index=4',
        tip: 0
      }],
      dataTabs: [{
        text: '余额(充值)',
        value: 0,
        page: '/pages/user/balance/index'
      }, {
        text: '积分(兑换)',
        value: 0,
        page: ''
      }],
      menuTabs: [{
        icon: '/static/user/address.png',
        text: '收货地址',
        page: '/pages/user/address/index'
      },
			{
        icon: '/static/user/cooperar.png',
        text: '商务合作',
        page: '/pages/user/platform/index'
      },
      {
        icon: '/static/user/call.png',
        text: '联系客服',
        page: ''
      },
      {
        icon: '/static/user/edit.png',
        text: '意见建议',
        page: '/pages/user/advice/index'
      },
      {
        icon: '/static/user/about.png',
        text: '关于我们',
        page: '/pages/user/about/index'
      },
      {
        icon: '/static/icons/icon_setting.png',
        text: '设置',
        page: '/pages/user/setting/index'
      },
      ]
    }
  },
  watch: {
    userInfo: {
      handler(e) {
        if (e.id) {
          this.$set(this.orderTabs[0], 'tip', e.unpayOrders)
          this.$set(this.orderTabs[1], 'tip', e.toDeliveryOrders)
          this.$set(this.orderTabs[2], 'tip', e.toTakeOrders)
          e.balances.forEach(item => {
            if (item.itemId === 1) {
              this.$set(this.dataTabs[0], 'value', item
                .leftBalance)
            }
            if (item.itemId === 2) {
              this.$set(this.dataTabs[1], 'value', item
                .leftBalance)
            }
          })
        } else {
          this.$set(this.orderTabs[0], 'tip', 0)
          this.$set(this.orderTabs[1], 'tip', 0)
          this.$set(this.orderTabs[2], 'tip', 0)
          this.$set(this.dataTabs[0], 'value', 0)
          this.$set(this.dataTabs[1], 'value', 0)
        }
      },
      immediate: true
    }
  },
  methods: {
    tapInfo() {
      if (this.isLogin) {
        this.$jumpPage('/pages/user/setting/index')
      } else {
        this.$jumpPage('/pages/user/login/index')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 556rpx;
  position: relative;
  	background-color: #272a37;
  .bg {
    position: relative;
    top: 0;
    width: 100%;
    height: 420rpx;
    z-index: 1;
  }
  .user-avatar {
    position: absolute;
    z-index: 3;
    top: 240rpx;
    left: 70rpx;
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background-color: #EFEFEF;
    border: 1px solid #EFEFEF;

    .image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .user-info {
    width: 690rpx;
    height: 256rpx;
    background-color:#424655;
    border-radius: 20rpx;
    position: absolute;
    top: 300rpx;
    left: 30rpx;
    z-index: 2;

    .user-name {
      padding-top: 10rpx;
      padding-left: 200rpx;
      display: flex;

      .info-hd {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 28rpx;
          font-weight: 700;
          color: #000000;
          line-height: 40rpx;
          height: 40rpx;
          overflow: hidden;
          padding-right: 20rpx;
        }
      }


      .login {
        font-size: 28rpx;
        font-weight: 700;
        color: #000000;
        line-height: 40rpx;
        height: 40rpx;
        overflow: hidden;
      }

    }

    .balance {
      display: flex;
      margin-top: 60rpx;

      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .amount {
          height: 48rpx;
          font-size: 40rpx;
          font-weight: bold;
          color: #000000;
        }

        .label {
          margin-top: 16rpx;
          font-size: 28rpx;
          color: #999999;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.view{
	padding: 24rpx;
	background-color: #272a37;
	.order {
	  position: relative;
	  z-index: 1;
	  border-radius: 20rpx;
	  background-color:  #424655;
	  .title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 20rpx 30rpx;
	    border-bottom: 1rpx solid #373a4a;
	
	    .left {
	      font-size: 28rpx;
	      font-weight: 700;
	      color: #000000;
	    }
	
	    .right {
	      font-size: 24rpx;
	      color: #999999;
	      display: flex;
	      align-items: center;
	    }
	  }
	
	  .content {
	    display: flex;
	    padding: 24rpx 0;
	
	    .item {
	      width: 25%;
	      display: flex;
	      flex-direction: column;
	      justify-content: center;
	      align-items: center;
	      position: relative;
	
	      .icon {
	        width: 50rpx;
	        height: 50rpx;
	      }
	
	      .text {
	        margin-top: 8rpx;
	        font-size: 12px;
	        color: #212121;
	      }
	    }
	  }
	}
	
	
	.menu {
   margin: 20rpx 0;
	  border-radius: 20rpx;
	  background-color:  #424655;

	  .row {
	    height: 96rpx;
	    display: flex;
	    align-items: center;
	    padding-right: 30rpx;
	    position: relative;
	
	    .hide {
	      position: absolute;
	      top: 0;
	      right: 0;
	      width: 100%;
	      height: 100%;
	      opacity: 0;
	    }
	
	    .left {
	      width: 48rpx;
	      height: 48rpx;
	    }
	
	    .center {
	      font-size: 14px;
	      color: #212121;
	      font-weight: 500;
	      line-height: 1;
	      flex: 1;
	      margin-left: 26rpx;
	    }
	
	    .right {
	      width: 16rpx;
	      height: 28rpx;
	    }
	  }
	
	  .border {
	    height: 2rpx;
	    background-color: #373a4a
	  }
}

}
</style>