<template>
	<view>
		<u-keyboard ref="uKeyboard" mode="number" :dotDisabled="true" :show="show" :overlay="true"
			:safe-area-inset-bottom="true" :tooltip="false" @close="showPop(false)" @change="onChange"
			@backspace="onBackspace">
			<view>
				<view class="key-title">
					请输入短信验证码
				</view>
				<view class="password">
					<u-code-input v-model="vcode" color="#fff" :disabledKeyboard="true" :maxlength="6">
					</u-code-input>
				</view>
			</view>
		</u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				vcode: ''
			}
		},
		methods: {
			onChange(val) {
				if (this.vcode.length < 6) {
					this.vcode += val;
				}
				if (this.vcode.length >= 6) {
					this.$emit('confirm', this.vcode)
				}
			},
			onBackspace(e) {
				if (this.vcode.length > 0) {
					this.vcode = this.vcode.substring(0, this.vcode.length - 1);
				}
			},
			showPop(flag = true) {
				this.vcode = '';
				this.show = flag;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.password {
		padding-top: 20rpx;
		display: flex;
		justify-content: center;
	}
	.key-title{
		text-align: center;
		color: #fff;
		font-size:28rpx;
		padding: 20rpx 0;
	}
</style>
