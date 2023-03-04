// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Tài khoản',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Nhà tài trợ',
    path: '/dashboard/sponser',
    icon: icon('ic_sponser'),
  },
  {
    title:'Trẻ em',
    path: '/dashboard/children',
    icon: icon('ic_child'),
  },
  {
    title: 'Tin bài',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Đăng xuất',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
