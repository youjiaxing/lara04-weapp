import wepy from '@wepy/core'
import store from '@/store'
import _ from 'lodash'

// 服务器接口地址
const host = "http://lara04.test/api/v1/"

/**
 *
 * @param {string} url
 * @param {RequestOption} options
 * @param {boolean} showLoading
 * @returns {Promise<*>}
 */
async function request(url, options = {}, showLoading = true) {
    if (showLoading) {
        wx.showLoading({title: '加载中'})
    }

    // 拼接 url
    options['url'] = host + url
    let resp

    try {
        resp = await wepy.wx.request(options)
    } finally {
        if (showLoading) {
            wx.hideLoading()
        }
    }

    if (resp.statusCode >= 200 && resp.statusCode < 300) {
        return resp;
    }

    const error = new Error(resp.data.message)
    error.response = resp
    error.handled = false

    if (resp.statusCode === 429) {
        error.handled = true
        wx.showModal({title: '提示', content: '请求太频繁, 请稍后再试'})
    }

    if (resp.statusCode >= 500) {
        error.handled = true
        wx.showModal({title: '提示', content: '服务器错误, 请联系管理员或重试'})
    }


    return Promise.reject(error)
}

async function checkToken() {
    const accessToken = store.getters.accessToken
    const expiredAt = store.getters.accessTokenExpiredAt

    if (accessToken && new Date().getTime() > expiredAt) {
        try {
            return store.dispatch("refresh")
        } catch (e) {
            return store.dispatch("login")
        }
    }
}

/**
 *
 * @param {string} url
 * @param {RequestOption} options
 * @param {boolean} showLoading
 * @returns {Promise<*>}
 */
async function authRequest(url, options = {}, showLoading = true) {
    await checkToken()

    _.set(options, "header.Authorization", 'Bearer ' + store.getters.accessToken)

    return await request(url, options, showLoading)
}

async function uploadFile(url, options = {}, showLoading = true) {
    if (showLoading) {
        wx.showLoading({title: "上传中"})
    }

    let uploadResp
    try {
        await checkToken()

        options.url = host + url
        _.set(options, "header.Authorization", 'Bearer ' + store.getters.accessToken)

        // console.log("uploadFile", options)

        uploadResp = await wepy.wx.uploadFile(options)

        // console.log("uploadResp", uploadResp)
    } finally {
        if (showLoading) {
            wx.hideLoading()
        }
    }

    if (_.inRange(uploadResp.statusCode, 200, 299)) {
        return uploadResp
    }

    const error = new Error(uploadResp.data.message)
    error.response = uploadResp

    wx.showModal({
        title: "提示",
        content: "服务器错误, 请联系管理员或重试"
    })

    return Promise.reject(error)
}

export {
    request,
    authRequest,
    uploadFile,
}