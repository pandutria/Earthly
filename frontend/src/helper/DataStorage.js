let token = ""

function saveToken(value) {
    token = value
}

function getToken() {
    return token
}

function deleteToken() {
    token = ""
}

let mode = ""
let categories_id = 0;
let products_id = 0;

export default {products_id, categories_id, mode, token, saveToken, getToken, deleteToken}