<template>
	<view>
		<u-keyboard ref="uKeyboard" mode="number" :dotDisabled="true" :show="show" :overlay="true"
			:safe-area-inset-bottom="true" :tooltip="false" @close="showPop(false)" @change="onChange"
			@backspace="onBackspace">
			<view>
				<view class="password">
					<u-code-input v-model="password" :dot="true" color="#fff" :disabledKeyboard="true" :maxlength="6">
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
				password: ''
			}
		},
		methods: {
			onChange(val) {
				if (this.password.length < 6) {
					this.password += val;
				}
				if (this.password.length >= 6) {
					this.$emit('pay', this.password)
				}
			},
			onBackspace(e) {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			showPop(flag = true) {
				this.password = '';
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
</style>
