import wepy from '@wepy/core'
import notificationApi from '@/api/notification'

let state = {
    unreadCount: 0
}
let getters = {
    unreadCount: state => state.unreadCount
}
let mutations = {
    setUnreadCount(state, unreadCount) {
        state.unreadCount = unreadCount
    }
}
let actions = {
    async updateUnreadCount({commit, getters}, params = {}) {
        if (!getters.isLoggedIn) {
            return
        }

        const resp = await notificationApi.notificationStats({}, false)
        commit('setUnreadCount', resp.data.unread_count)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}