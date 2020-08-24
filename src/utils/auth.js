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
    wx.setStorageSync('access_token', tokenPayload.access_token)
    wx.setStorageSync('access_token_expired_at', new Date().getTime() + tokenPayload.expires_in * 1000)
}

function logout() {
    return wx.clearStorage()
}

function getPerms() {
    return wx.getStorageSync('perms')
}

function setPerms(perms) {
    return wx.setStorageSync('perms', perms)
}

export default {
    getUser,
    setUser,
    getToken,
    setToken,
    getTokenExpiredAt,
    logout,
    getPerms,
    setPerms,
}