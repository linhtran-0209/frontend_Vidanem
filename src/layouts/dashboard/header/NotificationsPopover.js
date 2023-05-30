import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);

  const totalUnRead = notifications.filter((item) => item.daDoc === false).length;

  const [open, setOpen] = useState(null);

  useEffect(() => {
    const getNotification = async () => {
      const url = `${process.env.REACT_APP_API_URL}/admin/thongbao/getAll`;
      const { data } = await axios.get(url, { withCredentials: true });
      setNotifications(data.data);
    };
    getNotification();
  }, [open]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        daDoc: true,
      }))
    );
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        {/* <Badge badgeContent={totalUnRead} color="error"> */}
        <Iconify icon="eva:bell-fill" />
        {/* </Badge> */}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Bạn có {totalUnRead} thông báo chưa đọc
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Đánh dấu tất cả đã đọc">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Mới
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem handleClose={handleClose} key={notification._id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Trước đó
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem handleClose={handleClose} key={notification._id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification, handleClose }) {
  const { avatar, title } = renderContent(notification);
  const navigate = useNavigate();

  const handleOpenDetail = async (notification) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/thongbao/dadoc`;
    await axios.put(url, { id: notification._id }, { withCredentials: true });
    handleClose();
    navigate(`/dashboard/children/edit/${notification.treEm}`);
  };
  return (
    <ListItemButton
      onClick={() => handleOpenDetail(notification)}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.daDoc && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.nguoiTao.hoTen}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.tieuDe}
      </Typography>
      <Typography component="div" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.moTa}
      </Typography>
    </Typography>
  );

  return {
    avatar: notification.nguoiTao.avatar ? <img alt={notification.title} src={notification.nguoiTao.avatar} /> : null,
    title,
  };
}
