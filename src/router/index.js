import Vue from 'vue'
import Router from 'vue-router'

/*选择产品*/
import adminMain from "@/components/adminMain";
import login from "@/components/workbench/login";
import workbench from "@/components/workbench/workbench";
// import Product from "@/components/workbench/Product";

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: login,
		},
		{
			path: '/adminMain',
			name: 'adminMain',
			component: adminMain,
			children:[
				{
					name:'adddelivery',
					path:'/sale/adddelivery',
					component:() => import('../components/sale/adddelivery')
				},
				{
					name:'addreturngoods',
					path:'/sale/addreturngoods',
					component:() => import('../components/sale/addreturngoods')
				},
				{
					name:'addsale',
					path:'/sale/addsale',
					component:() => import('../components/sale/addsale')
				},
				{
					name:'salelist',
					path:'/sale/salelist',
					component:() => import('../components/sale/salelist')
				},
				{
					path: '/workbench',
					name: 'workbench',
					component: workbench,
				},
			]
		}


	]
})