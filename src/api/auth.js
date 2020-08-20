import {request} from '@/utils/request'

function login(data) {
    return request('weapp/authorizations', {
        method: 'POST',
        data: data,
    })
}

export default {
    login
}