
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';

window.Vue.use(VueRouter);

import PeopleIndex from './components/people/PeopleIndex.vue';
import PeopleCreate from './components/people/PeopleCreate.vue';
import PeopleEdit from './components/people/PeopleEdit.vue';

const routes = [
    {
        path: '/people',
        components: {
            peopleIndex: PeopleIndex
        }
    },
    {path: '/people/create', component: PeopleCreate, name: 'createPerson'},
    {path: '/people/edit/:id', component: PeopleEdit, name: 'editPerson'},
]

const router = new VueRouter({ routes });

const app = new Vue({ router }).$mount('#app');
