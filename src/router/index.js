import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ElectronicJournalCenter from '@/components/ElectronicJournalCenter'
import Template from '@/components/Template'
import Review from '@/components/Review'
import Comments from '@/components/Comments'
import Comments2 from '@/components/Comments2'
import Showpdf from '@/components/Showpdf'
import SubmissionGuide from '@/components/SubmissionGuide'
import Editor from '@/components/Editor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/ElectronicJournalCenter',
      name: 'ElectronicJournalCenter',
      component: ElectronicJournalCenter,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Template',
      name: 'Template',
      component: Template,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Editor',
      name: 'Editor',
      component: Editor,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Review',
      name: 'Review',
      component: Review,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Comments/:academic_id',
      name: 'Comments',
      component: Comments,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Comments2/:academic_id:flag',
      name: 'Comments2',
      component: Comments2,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/Showpdf',
      name: 'Showpdf',
      component: Showpdf,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/SubmissionGuide',
      name: 'SubmissionGuide',
      component: SubmissionGuide,
      meta: {
        requireLogin: true
      }
    }
  ]
})
