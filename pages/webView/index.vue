<template>
	<view>
			<web-view :webview-styles="webviewStyles" :src="webSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#4ccfff'
					}
				},
				webSrc: '',
			};
		},
		onLoad(e) {
			this.webSrc = e.url
		},
		onReady() {
			// #ifdef APP-PLUS
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentWebview = page.$getAppWebview();
			var url = currentWebview.children()[0].getURL();
			var wv = currentWebview.children()[0];
			wv.overrideUrlLoading({
				mode: 'reject',
				match: '.*'
			}, function(e) {
				console.log('reject url: ' + e.url);
				uni.navigateTo({
					url: `/pages/webView/index?webSrc=${e.url}`
				})
			});
			// #endif
		},
		onBackPress(e) {
			// #ifdef APP-PLUS
			let pages = getCurrentPages()
			let page = pages[pages.length - 1];
			let currentPages = page.$getAppWebview()
			currentPages.close()
			return false
			// #endif
		}
	}
</script>

<style>
	
</style>
