import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Parts from '@/pages/Parts'
import ViewPart from '@/pages/ViewPart'
import SearchPage from '@/pages/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/parts/:id',
      name: 'Parts',
      component: Parts
    },
    {
      path: '/part/:id',
      name: 'ViewPart',
      component: ViewPart
    },
    { 
      path: '/search', 
      name: 'SearchPage',
      component: SearchPage, 
      props: (route) => ({ query: route.query.q }) 
    },
    { 
      path: '/404', 
      name: '404',
      component: {
        template: '<p class="error-404">Error 404<br />We couldn\'t find the page you\'re looking for</p>'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
