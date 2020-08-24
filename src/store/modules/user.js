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
        perms: authUtil.getPerms(),
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
    perms: state => state.perms
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
    },
    setPerms(state, perms) {
        state.perms = perms
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

        const loginResp = await authApi.login(params)
        commit("setToken", loginResp.data)
        authUtil.setToken(loginResp.data)

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
        commit('setUser', userResp.data)
        authUtil.setUser(userResp.data)

        dispatch('getPerms')
    },
    async getPerms({commit}, state) {
        let resp = await userApi.permissions()
        commit('setPerms', resp.data.data)
        authUtil.setPerms(resp.data.data)
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
    },
    async updateUser({dispatch, commit}, params) {
        const updateResp = await userApi.update(params)

        commit('setUser', updateResp.data)
        authUtil.setUser(updateResp.data)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}