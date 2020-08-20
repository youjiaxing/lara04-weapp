import wepy from '@wepy/core'

// 服务器接口地址
const host = "http://lara04.test/api/v1/"

/**
 *
 * @param {string} url
 * @param {RequestOption} options
 * @param {boolean} showLoading
 * @returns {Promise<*>}
 */
const request = async function (url, options = {}, showLoading = true) {
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

    if (resp.statusCode === 429) {
        wx.showModal({title:'提示', content:'请求太频繁, 请稍后再试'})
    }

    if (resp.statusCode >= 500) {
        wx.showModal({title: '提示', content:'服务器错误, 请联系管理员或重试'})
    }

    const error = new Error(resp.data.message)
    error.response = resp
    return Promise.reject(error)
}

export {
    request
}