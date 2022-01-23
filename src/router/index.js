import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '@/views/Home';
import ObservationResults from '@/views/ObservationResults';
import Users from '@/views/Users';
import APIKeys from '@/views/APIKeys';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/observation-results',
                name: 'ObservationResults',
                component: ObservationResults
            },
            {
                path: '/users',
                name: 'Users',
                component: Users
            },
            {
                path: '/api-keys',
                name: 'APIKeys',
                component: APIKeys
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next();
        return;
    }
    let accessTokenStr = localStorage.getItem('accessToken');
    if (!accessTokenStr) {
        next({name: 'Login'})
        return;
    }
    let accessToken = JSON.parse(accessTokenStr);
    if (accessToken['expiresAt'] < Math.round(new Date().getTime() / 1000)) {
        next({name: 'Login'})
        return;
    }
    next()
});

export default router;
