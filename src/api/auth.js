import {authRequest, request} from '@/utils/request'

function login(data) {
    return request('weapp/authorizations', {
        method: 'POST',
        data: data,
    })
}

function refresh(token) {
    return request('authorizations/current', {
        method: 'PUT',
        header: {
            'Authorization': 'Bearer ' + token
        }
    })
}

function logout() {
    return authRequest('authorizations/current', {
        method: 'DELETE'
    })
}

function register(data) {
    return request('weapp/users', {
        method: 'POST',
        data: data
    })
}

// 图形验证码
function captcha(phone) {
    return request('captchas', {
        method: 'POST',
        data: {
            phone
        }
    })
}

// 短信验证码
function verifyCode(captcha_key, captcha_code) {
    return request('verificationCodes', {
        method: 'POST',
        data: {
            captcha_key,
            captcha_code,
        }
    })
}

export default {
    login,
    refresh,
    logout,
    captcha,
    register,
    verifyCode,
}