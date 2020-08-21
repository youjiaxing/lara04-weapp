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

function detail(id) {
    return request('topics/' + id, {
        method: 'GET'
    })
}

export default {
    index,
    detail,
    categories
}