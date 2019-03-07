import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/page/VmHome';
import GroupDetails from '@/page/groupDetails';
import projectDetail from '@/page/projectDetail';
import doctorDetailmore from '@/page/doctorDetailmore';
import DoctorDetail from '@/page/doctorDetail';
import InviteFriends from '@/page/inviteFriends';
import pointDetail from '@/page/pointDetail';
import aboutUs from '@/page/aboutUs';
import information from '@/page/information'; //资讯详情
import info from '@/page/info'; //医生说说详情
import informatioBetterscroll from '@/page/informatioBetterscroll'; //资讯详情
import rulebook from '@/page/rulebook'
import redEnvelope from '@/page/redEnvelope'
import userPrivate from '@/page/userPrivate'
import PDPrivateBook from '@/page/PDPrivateBook'
import Login from '@/page/login'
import Registered from '@/page/registered'
import LoginPage from '@/page/loginPage'
import test from '@/page/test'
import RuleDescription from '@/page/RuleDescription'
import IosDownload from '@/page/iosDownload'
import qmShare from '@/page/qmShare'
import organ from '@/page/organ'
import advert from '@/page/advert'
// import TestInformation from '@/page/testInformation'
import DoctorDetailApp from '@/page/doctorDetailApp'
import DoctorSaid from '@/page/doctorSaid'
import DoctorProfile from '@/page/doctorProfile'
import organIntroduce from '@/page/organIntroduce'
import License from '@/page/license'
import pintuan from '@/page/pintuan'
import VideoInfo from '@/page/videoInfo'
import InformationPage from '@/page/informationPage'
import InformationShare from '@/page/informationShare'
import PdEnter from '@/page/PdEnter'
import PDApplyerBook from '@/page/PDApplyerBook'
import InformationNewPage from '@/page/informationNewPage'
import inviteActive from '@/page/inviteActive'
import CollarRedEnvelope from '@/page/collarRedEnvelope'
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/organIntroduce',
      name: 'organIntroduce',
      component: organIntroduce
    },
    {
      path: '/pintuan',
      name: 'pintuan',
      component: pintuan
    },
    {
      path: '/groupDetails',
      name: 'GroupDetails',
      component: GroupDetails
    },
    {
      path: "/projectDetail",
      name: "projectDetail",
      component: projectDetail
    },
    {
      path: "/doctorDetailmore",
      name: "doctorDetailmore",
      component: doctorDetailmore
    },
    {
      path: '/doctorDetail',
      name: 'DoctorDetail',
      component: DoctorDetail
    },
    {
      path: '/inviteFriends',
      name: 'InviteFriends',
      component: InviteFriends
    },
    {
      path: '/pointDetail',
      name: 'pointDetail',
      component: pointDetail
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: aboutUs
    }, {
      path: "/information",
      name: "information",
      component: information,
      // component: TestInformation
    }, {
      path: "/info",
      name: "info",
      component: info,
    }, {
      path: "/informatioBetterscroll",
      name: "informatioBetterscroll",
      component: informatioBetterscroll
    }, {
      path: "/rulebook",
      name: "rulebook",
      component: rulebook
    },
    {
      path: '/redEnvelope',
      name: 'redEnvelope',
      component: redEnvelope
    }, {
      path: "/userPrivate",
      name: "userPrivate",
      component: userPrivate
    }, {
      path: "/PDPrivateBook",
      name: "PDPrivateBook",
      component: PDPrivateBook
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/loginpage',
      name: 'LoginPage',
      component: LoginPage
    }, {
      path: "/test",
      name: "test",
      component: test
    },
    {
      path: '/ruleDescription',
      name: RuleDescription,
      component: RuleDescription
    },
    {
      path: '/iosDownload',
      // name: IosDownload,
      component: IosDownload
    },
    {
      path: '/qmShare',
      // name: qmShare,
      component: qmShare
    },
    {
      path: '/organ',
      // name: indexOfMechanism,
      component: organ,
    }, {
      path: '/doctorDetailApp',
      component: DoctorDetailApp
    }, {
      path: "/advert",
      name: 'advert',
      component: advert
    },
    {
      path: '/doctorSaid',
      component: DoctorSaid,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/doctorProfile',
      component: DoctorProfile
    },
    {
      path: '/license',
      component: License
    },
    {
      path: '/videoInfo',
      component: VideoInfo
    },
    {
      path: '/informationPage',
      component: InformationPage
    },
    {
      path: '/informationShare',
      component: InformationShare
    }, {
      path: '/PdEnter',
      component: PdEnter
    }, {
      path: '/PDApplyerBook',
      component: PDApplyerBook
    },
    {
      path: '/informationNewPage',
      component: InformationNewPage
    }, {
      path: '/inviteActive',
      component: inviteActive
    },
    {
      path: '/collarRedEnvelope',
      component: CollarRedEnvelope
    }
  ]
});
