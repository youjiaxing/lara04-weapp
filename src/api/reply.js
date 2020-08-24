import {request} from "@/utils/request";

function index(topicId, data) {
    return request('topics/' + topicId + '/replies', {
        method: 'GET',
        data: data
    })
}

export default {
    index
}