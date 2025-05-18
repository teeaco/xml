class msmUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getmsm() {
        return `${this.baseUrl}/msm`;
    }

    getFilteredmsm(filter) {
        return `${this.baseUrl}/msm?type=${type}`;
    }

    getmsmById(id) {
        return `${this.baseUrl}/msm/${id}`;
    }

    createmsm() {
        return `${this.baseUrl}/msm`;
    }

    removemsmById(id) {
        return `${this.baseUrl}/msm/${id}`;
    }

    updatemsmById(id) {
        return `${this.baseUrl}/msm/${id}`;
    }
}

export const msmUrls = new msmUrls();