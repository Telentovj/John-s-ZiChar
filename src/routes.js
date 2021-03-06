import PageContent from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import Modify from './components/Modify.vue'
import DashBoard from "./components/DashBoard.vue"
export default [
  { name: "Home", path: '/', component: PageContent },
  { name: "Orders", path: '/orders', component: Orders },
  { name: "Modify", path: '/modify', component: Modify, props:'true'},
  { name: "DashBoard", path: '/dashboard', component: DashBoard},
]