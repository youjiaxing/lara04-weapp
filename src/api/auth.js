import {request} from '@/utils/request'

export function login(data) {
    return request('weapp/authorizations', {
        method: 'POST',
        data: data,
    })
}