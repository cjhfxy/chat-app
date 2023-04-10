<template>
  <view v-if="popupShow" class="wrap">
    <view class="popup-bg">
      <view class="popup-content" :class="{'popup-content-show' : popupShow}">
        <view class="update-wrap">
          <image src="./images/img.png" class="top-img" />
          <view class="content">
            <text class="title">发现新版本V{{ updateInfo.version }}</text>
            <!-- 升级描述 -->
            <view class="title-sub" v-html="updateInfo.note" />
            <!-- 升级按钮 -->
            <view v-if="downstatus < 1" class="btn" @click="nowUpdate()">立即升级</view>
            <!-- 下载进度 -->
            <view v-else class="sche-wrap">
              <!-- 更新包下载中 -->
              <view class="sche-bg">
                <view class="sche-bg-jindu" :style="lengthWidth" />
              </view>
              <text
                class="down-text"
              >下载进度:{{ (downSize/1024/1024 ).toFixed(2) }}M/{{ (fileSize/1024/1024).toFixed(2) }}M</text>
            </view>
          </view>
        </view>
        <image src="./images/close.png" class="close-ioc" @click="closeUpdate()" />
      </view>
    </view>
  </view>
</template>

<script>
import {
  checkUpdate
} from '@/api/system/index.js'
let vm
export default {
  name: 'AppUpdate',
  data() {
    return {
      force: false, // 是否强制更新
      popupShow: false, // 弹窗是否显示
      downing: false, // 是否下载中
      downstatus: 0, // 0未下载  1已开始 2已连接到资源  3已接收到数据  4下载完成
      updateInfo: {
        os: '', // 设备系统
        version: '', // 最新版本
        note: '' // 升级说明
      },
      fileSize: 0, // 文件大小
      downSize: 0 // 已下载大小
    }
  },
  computed: {
    // 下载进度计算
    lengthWidth: function() {
      let w = this.downSize / this.fileSize * 100
      if (!w) {
        w = 0
      } else {
        w = w.toFixed(2)
      }
      return {
        width: w + '%' // return 宽度半分比
      }
    }
  },
  created() {
    vm = this
  },
  methods: {
    // 检查更新
    update() {
      return new Promise(resolve => {
        this.$store.dispatch('app/getVersion').then(version => {
          const code = version.versionCode
          const info = uni.getSystemInfoSync()
          const platform = info.platform.toLowerCase()
          const system = info.system
          const brand = info.brand
          const model = info.model
          checkUpdate({
            deviceId: plus.device.uuid,
            versionNumber: code,
            platform,
            system,
            brand,
            model
          }).then(data => {
            if (!data.needUpdate) return resolve(false)
            vm.updateInfo.os = data.config.platform
            vm.updateInfo.version = data.config.name
            vm.updateInfo.note = data.config.note
            vm.updateInfo.download_url = data.config.updateUrl
						vm.force = data.needForceUpdate
            vm.popupShow = true
            resolve()
          })
        })
      })
    },
    // 取消更新
    closeUpdate() {
      if (vm.force) {
        // 强制更新，取消退出app
        plus.os.name == 'Android' ? plus.runtime.quit() : plus.ios.import('UIApplication').sharedApplication()
          .performSelector(
            'exit')
      } else {
        vm.popupShow = false // 关闭升级弹窗
        if (vm.viewObj) vm.viewObj.hide() // 隐藏原生遮罩
      }
    },
    // 立即更新
    nowUpdate() {
      if (vm.downing) return false // 如果正在下载就停止操作
      vm.downing = true // 状态改变 正在下载中

      if (/\.apk$/.test(vm.updateInfo.download_url)) {
        // 如果是apk地址
        vm.download_wgt() // 安装包/升级包更新
      } else if (/\.wgt$/.test(vm.updateInfo.download_url)) {
        // 如果是更新包
        vm.download_wgt() // 安装包/升级包更新
      } else {
        plus.runtime.openURL(vm.updateInfo.download_url, function() { // 调用外部浏览器打开更新地址
          plus.nativeUI.toast('打开错误')
        })
      }
    },
    // 下载升级资源包
    download_wgt() {
      const options = {
        method: 'get'
      }
      const dtask = plus.downloader.createDownload(vm.updateInfo.download_url, options, function(d, status) {

      })

      dtask.addEventListener('statechanged', function(task, status) {
        if (status === null) {} else if (status == 200) {
          // 在这里打印会不停的执行，请注意，正式上线切记不要在这里打印东西///////////////////////////////////////////////////
          vm.downstatus = task.state
          switch (task.state) {
            case 3: // 已接收到数据
              vm.downSize = task.downloadedSize
              if (task.totalSize) {
                vm.fileSize = task.totalSize // 服务器须返回正确的content-length才会有长度
              }
              break
            case 4:
              vm.installWgt(task.filename) // 安装wgt包
              break
          }
        } else {
          plus.nativeUI.closeWaiting()
          plus.nativeUI.toast('下载出错')
          vm.downing = false
          vm.downstatus = 0
        }
      })
      dtask.start()
    },

    // 安装文件
    installWgt(path) {
      plus.nativeUI.showWaiting('安装更新文件...') // 安装更新文件...
      plus.runtime.install(path, {}, function() {
        plus.nativeUI.closeWaiting()
        // 应用资源下载完成！
        plus.runtime.restart()
      }, function(e) {
        plus.nativeUI.closeWaiting()
        // 安装更新文件失败
        plus.nativeUI.alert('安装更新文件失败[' + e.code + ']：' + e.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.popup-bg {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0rpx;
		right: 0;
		bottom: 0;
		width: 750rpx;
		background-color: rgba(0, 0, 0, .6);
		z-index: 9999;
	}

	.popup-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup-content-show {
		animation: mymove 500ms;
		transform: scale(1);
	}

	@keyframes mymove {
		0% {
			transform: scale(0);
			/*开始为原始大小*/
		}

		100% {
			transform: scale(1);
		}

	}

	.update-wrap {
		width: 580rpx;
		border-radius: 18rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #1D3457;
		padding: 170rpx 30rpx 0;
		
		.top-img {
			position: absolute;
			left: 0;
			width: 100%;
			height: 256rpx;
			top: -128rpx;
		}

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 40rpx;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #fff;
			}

			.title-sub {
				text-align: center;
				font-size: 24rpx;
				color: #fff;
				padding: 30rpx 0;
			}

			.btn {
				width: 460rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
				font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 100px;
				background-color: #169BE6;
				margin-top: 20rpx;
			}
		}
	}

	.close-ioc {
		width: 70rpx;
		height: 70rpx;
		margin-top: 30rpx;
	}

	.sche-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 10rpx 50rpx 0;

		.sche-wrap-text {
			font-size: 24rpx;
			color: #666;
			margin-bottom: 20rpx;
		}

		.sche-bg {
			position: relative;
			background-color: #cccccc;
			height: 30rpx;
			border-radius: 100px;
			width: 480rpx;
			display: flex;
			align-items: center;

			.sche-bg-jindu {
				position: absolute;
				left: 0;
				top: 0;
				height: 30rpx;
				min-width: 40rpx;
				border-radius: 100px;
				background: url(images/round.png) #5775e7 center right 4rpx no-repeat;
				background-size: 26rpx 26rpx;
			}
		}

		.down-text {
			font-size: 24rpx;
			color: #5674e5;
			margin-top: 16rpx;
		}
	}
</style>
