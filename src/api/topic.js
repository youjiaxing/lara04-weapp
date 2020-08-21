import {request} from "@/utils/request";

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

export default {
    index,
    topic,
    categories
}