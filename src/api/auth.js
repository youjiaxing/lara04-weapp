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

export default {
    login,
    refresh,
    logout
}