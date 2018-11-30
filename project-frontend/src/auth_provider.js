const authProvider = {
    isAuthenticated: false,
    authenticate(user) {
        this.isAuthenticated = true;
        this.user = user;
        window.localStorage.setItem("loginUser", JSON.stringify(this.user));
    },
    signout() {
        window.localStorage.removeItem("loginUser");
        this.user = undefined;
        this.isAuthenticated = false;
    },
    restore() {
        if (this.user === undefined) {
            try {
                this.user = JSON.parse(window.localStorage.getItem("loginUser"));
                this.isAuthenticated = this.user !== null;
            } catch {
                window.localStorage.removeItem("loginUser");
            }
        }
    }
};

authProvider.restore();

export default authProvider;