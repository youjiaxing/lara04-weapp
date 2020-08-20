import {authRequest, uploadFile} from "@/utils/request";

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

export default {
    me,
    update,
    uploadAvatar
}