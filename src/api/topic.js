import {authRequest, request} from "@/utils/request";

function index(data = {}) {
    return request('topics', {
        method: 'GET',
        data
    })
}

function categories() {
    return request('categories', {
        method: 'GET',
    })
}

function topic(id, data) {
    return request('topics/' + id, {
        method: 'GET',
        data
    })
}

function userTopics(userId, data) {
    return request('users/' + userId + '/topics', {
        method: 'GET',
        data
    })
}

function destroy(id) {
    return authRequest('topics/' + id, {
        method: 'DELETE'
    })
}

export default {
    index,
    topic,
    categories,
    userTopics,
    destroy,
}