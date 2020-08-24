import {authRequest} from "@/utils/request";

function notificationStats(...params) {
    return authRequest('notifications/stats', ...params)
}

function index(data) {
    return authRequest('notifications', {
        data
    })
}

function markAllRead() {
    return authRequest('user/read/notifications', {
        method: 'PUT',
    })
}

export default {
    notificationStats,
    index,
    markAllRead
}