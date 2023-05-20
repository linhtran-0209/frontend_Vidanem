// component
import { Label } from '@mui/icons-material';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SvgColor from '../../../components/svg-color';

// constant
const role = {
  THANH_PHO: 1,
  QUAN_HUYEN: 2,
  PHUONG_XA: 3,
};

const icons = {
    PermIdentityIcon,
    SettingsApplicationsOutlinedIcon,
}

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    role: [role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA]
  },
  {
    title: 'Tài khoản',
    path: '/dashboard/users',
    icon: icon('ic_user'),
    role: [role.THANH_PHO, role.QUAN_HUYEN]
  },
  {
    title: 'Học bổng',
    path: '/dashboard/scholarship',
    icon: icon('ic_scholarship'),
    role: [role.THANH_PHO]
  },
  {
    title: 'Nhà tài trợ',
    path: '/dashboard/sponser',
    icon: icon('ic_sponser'),
    role: [role.THANH_PHO]
  },
  {
    title:'Năm học',
    path: '/dashboard/year',
    icon: icon('ic_year'),
    role: [role.THANH_PHO]
  },
  {
    title:'Trẻ em',
    path: '#',
    icon: icon('ic_child'),
    role: [role.THANH_PHO, role.QUAN_HUYEN, role.PHUONG_XA],
    subNav: [
      {title: ' Đối tượng', path: '/dashboard/children/doi-tuong'},
      {title: ' Trẻ em', path: '/dashboard/children/list'}
    ]
  },
  {
    title: 'Tin bài',
    path: '#',
    icon: icon('ic_blog'),
    role: [role.THANH_PHO, role.QUAN_HUYEN],
    subNav: [
      {title: ' Chủ đề', path: '/dashboard/title'},
      {title: ' Bài viết', path: '/dashboard/blog'}
    ]
  },
  // {
  //   title: 'Tin bài',
    
  //   icon: icon('ic_blog'),
  //   children:[
  //     {title: 'Tra cứu', url: '/dashboard/blog'},

  //     { name: 'Posts' },
  //   ]
    
  // },
  // {
  //   title: 'Đăng xuất',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
