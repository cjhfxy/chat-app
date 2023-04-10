const getters = {
	navBarInfo: state => state.app.navBarInfo,
	parmeConifg: state => state.app.parmeConifg,
  token: state => state.user.token,
  uid: state => state.user.uid,
	userId: state => state.user.userId,
  isLogin: state => state.user.isLogin,
  userInfo: state => state.user.userInfo,
	lastPhoneNumber: state => state.user.lastPhoneNumber
}
export default getters
