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

  const [treEm, setTreEm] = useState({});
  const [taiKhoan, setTaiKhoan] = useState([]);
  const [tinTuc, setTinTuc] = useState([]);
  const [donVi, setDonVi] = useState([]);
  const [doThi, setDoThi] = useState([]);

  useEffect(() => {
    const thongKeTaiKhoan = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/taikhoan`;
        const  {data}  = await axios.get(url, { withCredentials: true });
        setTaiKhoan(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    thongKeTaiKhoan();

  }, []);
  useEffect(() => {

    const thongKeDonVi = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/donvi`;
        const  {data}  = await axios.get(url, { withCredentials: true });
        setDonVi(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    thongKeDonVi();
  }, []);
  
  useEffect(() => {
    const thongKeTinTuc = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/tintuc`;
        const  {data}  = await axios.get(url, { withCredentials: true });
        setTinTuc(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    thongKeTinTuc();

  }, []);

  useEffect(() => {

    const thongKeTreEm = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/treem`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTreEm(data);
      } catch (err) {
        console.log(err);
      }
    };

    thongKeTreEm();
  }, []);

  useEffect(() => {

    const getDoThi = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/admin/dashboard/chart`;
        const { data } = await axios.get(url, { withCredentials: true });
        setDoThi(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDoThi();
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
            <AppWidgetSummary title="Tài khoản" total={taiKhoan.length} icon="carbon:user-avatar-filled" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Nhà tài trợ"
              total={donVi.length}
              color="info"
              icon={'fa6-solid:people-roof'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Trẻ em" total={treEm.total} color="warning" icon={'solar:people-nearby-bold'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tin bài" total={tinTuc.length} color="error" icon={'material-symbols:event-note'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8} style={{height:'400px', overflowY:'hidden'}}>
            <AppWebsiteVisits
              title="Đơn vị bảo trợ"
              chartLabels={doThi.map((item)=>item.donVi) || []}
              chartData={[
                {
                  name: 'Tổng giá trị',
                  type: 'column',
                  fill: 'solid',
                  data:  doThi.map((item)=>item.soTien) || [],
                },
              ]}
            />
          </Grid>

          <Grid className="cap" item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Hồ sơ trẻ em"
              chartData={[
                { label: 'Đã duyệt', value: treEm.daDuyet || 0},
                { label: 'Chờ Duyệt', value: treEm.choDuyet || 0},
                { label: 'Đề Xuất', value: treEm.deXuat || 0},
                { label: 'Từ chối', value: treEm.tuChoi || 0},
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
