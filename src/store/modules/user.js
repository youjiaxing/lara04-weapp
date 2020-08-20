import wepy from '@wepy/core'
import authApi from '@/api/auth'
import userApi from '@/api/user'
import authUtil from '@/utils/auth'
import _ from 'lodash'

const getDefaultState = () => {
    return {
        user: authUtil.getUser(),
        accessToken: authUtil.getToken(),
        accessTokenExpiredAt: authUtil.getTokenExpiredAt(),
    }
}

// 定义 state
const state = getDefaultState()

// 定义 getters
let getters = {
    isLoggedIn: state => !_.isEmpty(state.accessToken),
    user: state => state.user,
    accessToken: state => state.accessToken,
    accessTokenExpiredAt: state => state.accessTokenExpiredAt,
}

// 定义 mutations
let mutations = {
    setUser(state, user) {
        state.user = user
    },
    setToken(state, tokenPayload) {
        state.accessToken = tokenPayload.access_token
        state.accessTokenExpiredAt = tokenPayload.expires_in * 1000 + new Date().getTime()
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}

// 定义 actions
let actions = {
    async login({dispatch, commit}, params = {}) {
        const loginData = await wepy.wx.login()

        if (!params.type) {
            params['type'] = 'code'
        }
        params['code'] = loginData['code']

        console.log("logining...")
        const loginResp = await authApi.login(params)
        console.log("login success")
        commit("setToken", loginResp.data)
        authUtil.setToken(loginResp.data)

        console.log("login, then getUser")
        dispatch("getUser")
    },
    async refresh({dispatch, commit, state}) {
        const refreshResp = await authApi.refresh(state.accessToken)
        commit("setToken", refreshResp.data)
        authUtil.setToken(refreshResp.data)

        dispatch("getUser")
    },
    async getUser({dispatch, commit, state}) {
        let userResp = await userApi.me()
        console.log("user", userResp.data)
        commit('setUser', userResp.data)
        authUtil.setUser(userResp.data)
    },
    async logout({dispatch, commit}) {
        await authApi.logout()
        authUtil.logout()
        commit('resetState')
    },
    async register({dispatch}, params = {}) {
        const loginData = await wepy.wx.login()
        params.code = loginData.code

        await authApi.register(params)

        await dispatch('login')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}