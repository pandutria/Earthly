const BASE_URL = "https://pandutria.my.id/api/"

const request = async (
    endpoint,
    method = "GET",
    token = null,
    rBody = null
) => {
    try {
        const headers = {
            "Content-Type": "application/json"
        };

        if (token != null) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method, 
            headers,
        };

        if (rBody != null) {
            options.body = JSON.stringify(rBody)
        }

        const res = await fetch (BASE_URL + endpoint, options);
        const body = await res.text();

        return JSON.stringify({
            code: res.status,
            body
        })

    } catch (e) {
        return JSON.stringify({
            code: 500,
            body: e.message
        })
    }
}

export default {request}