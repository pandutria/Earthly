var token = ""

function saveToken(value) {
    token = value
}

function getToken(value) {
    return token
}

export default {saveToken, getToken}