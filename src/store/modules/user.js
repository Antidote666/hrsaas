import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      console.log({ token })
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      const data = await getUserInfo()
      const res1 = await getUserDetailById(data.userId)
      const result = { ...data, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }
}
