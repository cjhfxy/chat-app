<script>
	export default {
		onLaunch: function(e) {
			this.$store.dispatch('app/getParamConfig')
			const navBarInfo = this.$store.getters.navBarInfo
			if (JSON.stringify(navBarInfo) === '{}') {
			  this.$store.dispatch('app/getNavBarInfo')
			}
		  const token = this.$store.getters.token
		  const uid = this.$store.getters.uid
		  if (token && uid) {
		    this.$store.dispatch('user/getIsLogin').then(data => {
		      if (data) {
		        this.$store.dispatch('user/getUserInfo')
		      }
		    })
		  }else{
				this.$jumpPage('/pages/user/login/index')
			}
		}
	}
</script>


<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@font-face {
		font-family: 'numberFont';
		src: url('/static/font/font.ttf');
	}
	page{
		width: 750rpx;
		margin: 0 auto;
		background-color: #F6F6F6;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
	}
	@keyframes show {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.fade {
		animation: show .28s ease-out forwards;
		overflow: hidden;
	}

	:not(not) {
		box-sizing: border-box;
	}

	image,
	video {
		will-change: transform;
		vertical-align: middle;
	}

	.hide {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.empty {
		position: fixed;
		top: 35%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

</style>

