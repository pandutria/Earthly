let token = ""

function saveToken(value) {
    token = value
}

function getToken(value) {
    return token
}

function deleteToken() {
    token = ""
}

export default {token, saveToken, getToken, deleteToken}