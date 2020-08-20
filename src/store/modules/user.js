import wepy from '@wepy/core'
import authApi from '@/api/auth'
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
    isLoggedIn: state => !_.isEmpty(state.accessToken) && state.accessTokenExpiredAt > new Date().getTime(),
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
}

// 定义 actions
let actions = {
    async login({dispatch, commit}, params = {}) {
        const loginData = await wepy.wx.login()

        if (!params.type) {
            params['type'] = 'code'
        }
        params['code'] = loginData['code']
        const loginResp = await authApi.login(params)
        commit("setToken", loginResp)
        authUtil.setToken(loginResp)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}