import Vue from 'vue'
import Router from 'vue-router'
import AddStory from './views/AddStory'
import ViewAsMaster from './views/ViewAsMaster'
import ViewAsDeveloper from './views/ViewAsDeveloper'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/add-story'
        },
        {
            path: '/add-story',
            name: 'add-story',
            component: AddStory
        },
        {
            path: '/view-as-master/:sessionId',
            name: 'view-as-master',
            component: ViewAsMaster
        },
        {
            path: '/view-as-developer/:sessionId',
            name: 'view-as-developer',
            component: ViewAsDeveloper
        },
        {
            path: '*',
            redirect: '/add-story'
        }
    ]
})
