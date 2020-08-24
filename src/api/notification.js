import {authRequest} from "@/utils/request";

function notificationStats(...params) {
    return authRequest('notifications/stats', ...params)
}

export default {
    notificationStats
}