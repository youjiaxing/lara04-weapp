import {authRequest} from "@/utils/request";

function me() {
    return authRequest('user');
}

function update(data) {
    return authRequest('user', {
        method: 'PUT',
        data: data
    })
}

export default {
    me,
    update
}