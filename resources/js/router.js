import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)
 const route = new VueRouter({
  mode:'history',

  routes: [
    {
        path: '/books', component: () => import('./components/Book/Index'),
        name: 'book.index'
    },
    {
        path: '/users/login', component: () => import('./components/User/Login'),
        name: 'user.login'
    },
    {
        path: '/users/registration', component: () => import('./components/User/Registration'),
        name: 'user.registration'
    },
      {
          path: '/users/personal', component: () => import('./components/User/personal'),
          name: 'user.personal'
      },
      {
          path:'*', component: () => import('./components/User/personal'),
          name:'404'
      }
  ]
})
route.beforeEach( (to,from,next)=>{
   const accessToken = localStorage.getItem('access_token')
    if(!accessToken){
        if(to.name==='user.login'||to.name==='user.registration'){
            return next()
        }else{
            return next({
                             name:'user.login'
                        })
        }
    }
    if(to.name==='user.login'||to.name==='user.registration' && accessToken){
        return next({
            name:'user.personal'
        })
    }
    next();

})


export default route
