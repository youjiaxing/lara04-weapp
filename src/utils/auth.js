function getUser() {
    return wx.getStorageSync("user")
}

function setUser(user) {
    return wx.setStorageSync("user", user)
}

function getToken() {
    return wx.getStorageSync("access_token")
}

function getTokenExpiredAt() {
    return wx.getStorageSync("access_token_expired_at")
}

function setToken(tokenPayload) {
    // 保存返回的凭证
    wx.setStorageSync('access_token', tokenPayload.data.access_token)
    wx.setStorageSync('access_token_expired_at', new Date().getTime() + tokenPayload.data.expires_in * 1000)
}

function logout() {
    return wx.clearStorage()
}

// function isLogged() {
//     return getToken() && getTokenExpiredAt() > new Date().getTime();
// }

export default {
    getUser,
    setUser,
    getToken,
    setToken,
    getTokenExpiredAt,
    logout,
    // isLogged
}