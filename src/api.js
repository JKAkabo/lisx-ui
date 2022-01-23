import router from '@/router';

const axios = require('axios');
axios.defaults.baseURL = process.env.VUE_APP_LISX_API_SERVER;

axios.interceptors.request.use(function (config) {
    let accessTokenStr = localStorage.getItem('accessToken');
    if (accessTokenStr) {
        let accessToken = JSON.parse(accessTokenStr);
        // if (accessToken['expiresAt'] < Math.round(new Date().getTime() / 1000) - 60) {
        //     // redirect to login page
        //     throw new axios.Cancel('request cancelled due to expired token')
        // } else {
        config.headers['Authorization'] = `Bearer ${accessToken['token']}`;
        // }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        if (error.response.status === 500) {
            // redirect to error page
        } else if (error.response.status === 401) {
            if (router.currentRoute.name !== 'Login') {
                router.push({name: 'Login'});
            }
        } else if (error.response.status === 403) {
            // trigger not permitted notification
        }
    }
    return Promise.reject(error);
});

export function createAccessToken(payload) {
    return axios.post('/access-tokens', payload);
}

export function getUsers() {
    return axios.get('/users');
}

export function getUserByID(id) {
    return axios.get(`/users/${id}`);
}

export function createUser(payload) {
    return axios.post('/users', payload);
}

export function getUserPermissions(userID) {
    return axios.get('/user-permissions?user-id=' + userID);
}

export function updateUserPermissions(userID, payload) {
    return axios.put(`/user-permissions?user-id=${userID}`, payload);
}

export function getResources() {
    return axios.get('/resources');
}