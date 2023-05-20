import axios from 'axios';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { get } from 'react-hook-form';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import SvgColor from '../components/svg-color';

// ----------------------------------------------------------------------

const icons = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [total, setTotal] = useState({});
  const [treEm, setTreEm] = useState({});

  useEffect(() => {
    const thongKeSoLuong = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/soLuong`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTotal(data);
      } catch (err) {
        console.log(err);
      }
    };
    const thongKeTreEm = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/treem`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTreEm(data);
      } catch (err) {
        console.log(err);
      }
    };

    thongKeSoLuong();
    thongKeTreEm();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thống kê
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tài khoản" total={total.taiKhoan} icon="carbon:user-avatar-filled" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Nhà tài trợ"
              total={total.donViBaoTro}
              color="info"
              icon={'fa6-solid:people-roof'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Trẻ em" total={total.treEm} color="warning" icon={'solar:people-nearby-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tin bài" total={total.tinTuc} color="error" icon={'material-symbols:event-note'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Đơn vị bảo trợ"
              subheader="(+43%) hơn một năm"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Đơn vị 1',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Đơn vị 2',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Đơn vị 3',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid className="cap" item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Hồ sơ trẻ em"
              chartData={[
                { label: 'Đã duyệt', value: treEm.daDuyet },
                { label: 'Chờ Duyệt', value: treEm.choDuyet },
                { label: 'Đề Xuất', value: treEm.deXuat },
                { label: 'Từ chối', value: treEm.tuChoi },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
