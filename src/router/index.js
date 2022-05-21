import Vue from 'vue'
import VueRouter from 'vue-router'
import EventsView from "@/views/EventsView";
import TransitionView from "@/views/TransitionView";
import StepsView from "@/views/StepsView";
import HomeView from "@/views/HomeView";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    props: true
  },
  {
    path: '/steps/:stateMachineId',
    name: 'steps',
    component: StepsView
  },
  {
    path: '/events/:stateMachineId',
    name: 'events',
    component: EventsView
  },
  {
    path: '/transitions/:stateMachineId',
    name: 'transitions',
    component: TransitionView
  }
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
    }
  }*/
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
