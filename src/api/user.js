import {authRequest} from "@/utils/request";

function me() {
    return authRequest('user');
}

export default {
    me
}