import Vue from 'vue'
import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Radio,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Tag,
  Switch,
  Row,
  Col,
  Dialog,
  Select,
  Option,
  Pagination,
  Notification,
  Tooltip,
  Steps,
  Step,
  DatePicker,
  Tabs,
  TabPane
} from 'element-ui'




Vue.use(Button)
Vue.use(Card)


Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Tag)
Vue.use(Switch)

Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)

Vue.use(Select)
Vue.use(Option)

Vue.use(Pagination)
Vue.use(Tooltip)


Vue.use(Steps)
Vue.use(Step)
Vue.use(DatePicker)


Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
