const authProvider = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        this.user = {
            "id": "486b857f-7c36-43fb-9af0-7384f108e22e",
            "created_at": "2018-11-26 06:38:49",
            "updated_at": "2018-11-26 06:38:49",
            "email": "jmc@test.com",
            "name": "Jonathan McCaffrey",
            "token": "486b857f-7c36-43fb-9af0-7384f108e22e"
        };

        window.localStorage.setItem("loginUser", JSON.stringify(this.user));

        setTimeout(cb, 100)
    },
    signout(cb) {
        window.localStorage.removeItem("loginUser");
        this.user = undefined;
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    },
    restore() {
        if (this.user === undefined) {
            try {
                this.user = JSON.parse(window.localStorage.getItem("loginUser"));
                this.isAuthenticated = true;
            } catch {
                window.localStorage.removeItem("loginUser");
            }
        }
    }
};

authProvider.restore();

export default authProvider;