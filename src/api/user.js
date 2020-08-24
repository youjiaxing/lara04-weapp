import {authRequest, request, uploadFile} from "@/utils/request";

function me() {
    return authRequest('user');
}

function update(data) {
    return authRequest('user', {
        method: 'PUT',
        data: data
    })
}

function uploadAvatar(avatar) {
    return uploadFile('images', {
        method: 'POST',
        name: 'image',
        formData: {
            type: 'avatar'
        },
        filePath: avatar
    })
}

function user(userId) {
    return request('users/' + userId)
}

function permissions() {
    return authRequest('user/permissions')
}

export default {
    me,
    update,
    uploadAvatar,
    user,
    permissions
}