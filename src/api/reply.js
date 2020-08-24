import {authRequest, request} from "@/utils/request";

function index(topicId, data) {
    return request('topics/' + topicId + '/replies', {
        method: 'GET',
        data: data
    })
}

function userIndex(userId, data) {
    return request('users/' + userId + '/replies', {
        method: 'GET',
        data: data
    })
}

function store(topicId, data) {
    return authRequest('topics/' + topicId + '/replies', {
        method: 'POST',
        data: data
    })
}

export default {
    index,
    userIndex,
    store
}