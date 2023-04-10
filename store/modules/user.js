import { getToken, setToken, removeToken, getUid, setUid, removeUid, getUserId, setUserId, removeUserId } from '@/utils/auth'
import { loginByPhone, getIsLogin, getUserInfo, logout } from '@/api/user'

const state = {
  token: getToken(),
  uid: getUid(),
	userId: getUserId(),
  userInfo: {},
  isLogin: false,
	lastPhoneNumber:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
	SET_USERID: (state, userId) => {
	  state.userId = userId
	},
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_IS_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_LAST_PHONENUMBER: (state, lastPhoneNumber) => {
    state.lastPhoneNumber = lastPhoneNumber
  }
}

const actions = {
  loginByPhone({ commit, dispatch }, form) {
    return new Promise((resolve, reject) => {
      loginByPhone(form).then(data => {
        if (data.authToken && data.uidToken) {
          setToken(data.authToken)
          setUid(data.uidToken)
					setUserId(data.id)
          commit('SET_TOKEN', data.authToken)
          commit('SET_UID', data.uidToken)
					commit('SET_USERID', data.id)
          commit('SET_IS_LOGIN', true)
          dispatch('getUserInfo').then(data => {
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        } else {
          resolve(null)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  getIsLogin({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      getIsLogin().then(data => {
        if (data) {
          commit('SET_IS_LOGIN', true)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(data => {
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        dispatch('reset')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  reset({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_UID', '')
		commit('SET_USERID', '')
    commit('SET_IS_LOGIN', false)
    commit('SET_USER_INFO', {})
    removeToken()
    removeUid()
		removeUserId()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
