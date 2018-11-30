import authProvider from './auth_provider';

class ApiClient {
    baseUrl = 'http://localhost:8000';

    request(method, path, body) {
        let headers = {
            "Content-Type": "application/json; charset=utf-8",
        };

        if (authProvider.isAuthenticated) {
            headers["Authorization"] = authProvider.user.token;
        }

        let req = {
            method: method,
            headers: headers
        };

        if (body !== undefined) {
            req.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        const baseUrl = this.baseUrl;
        return new Promise((resolve, reject) => {
            fetch(baseUrl + path, req).then(response => {
                if (response.status === 401) {
                    authProvider.signout();
                    reject(response.json());
                } else if (!response.ok) {
                    reject(response.json());
                } else {
                    return resolve(response.json());
                }
            });
        });
    }

    get(path) {
        return this.request('GET', path);
    }

    delete(path) {
        return this.request('DELETE', path);
    }

    post(path, object) {
        return this.request('POST', path, object);
    }

    put(path, object) {
        return this.request('POST', path, object);
    }
}

const ApiClientInstance = new ApiClient();

export default ApiClientInstance;