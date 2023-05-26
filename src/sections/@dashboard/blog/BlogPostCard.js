import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import useResponsive from '../../../hooks/useResponsive';
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';

//
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  trangChu: PropTypes.bool
};

export default function BlogPostCard({ post, index, trangchu }) {
  const isDesktop = useResponsive('up', 'md');
  const latestPost = index === 0 || index === 1 || index === 2;
  const { _id, tieuDe, anhTieuDe, nguoiTao, createdAt } = post;
  if (!trangchu && isDesktop && latestPost) {
    return (
      <Card>
        <Avatar
          alt={nguoiTao.hoTen}
          // src={nguoiTao.avatarUrl}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        />
        <PostContent id={_id} title={tieuDe} createdAt={createdAt} index={index} />
        <OverlayStyle />
        <Image alt="cover" src={`${process.env.REACT_APP_API_URL}${anhTieuDe}`} sx={{ height: 360 }} />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 420,
        margin: '40px 15px 25px 15px',
        '&:hover': {
          border: '1px solid black',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={nguoiTao.hoTen}
          src={nguoiTao.avatar}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={`${process.env.REACT_APP_API_URL}${anhTieuDe}`} ratio="4/3" />
      </Box>

      <PostContent id={_id} title={tieuDe} createdAt={createdAt} />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  comment: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
  id: PropTypes.string,
};

export function PostContent({ id, title, view, comment, share, createdAt, index }) {
  const isDesktop = useResponsive('up', 'md');

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link to={`/news/${id}`} color="inherit" component={RouterLink}>
        <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
