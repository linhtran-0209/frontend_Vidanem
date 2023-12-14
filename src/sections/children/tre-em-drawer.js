import axios from 'axios';
import { Box, Dialog, Grid, Card, Tab, Typography, Tooltip } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { CommentList } from './CommentList';

export function TreEmDrawer(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [treEm, setTreEm] = useState(props.child);
    const [images, setImages] = useState([]);
    const [hocTaps, setHocTaps] = useState([]);
    const [hocBongs, setHocBongs] = useState([]);
    const [comments, setComments] = useState([]);
    const [tab, setTab] = useState('1');

    useEffect(() => {
        const getTreEm = async () => {
            // const url = `${process.env.REACT_APP_API_URL}/treem/byId?id=${props.child._id}`;
            // const { data } = await axios.get(url, { withCredentials: true });
            // setTreEm(data.data);
            setImages(props.child.hinhAnh);
            getHocTap(props.child._id);
            getHocBong(props.child._id);
            getBinhLuan(props.child._id);
        };
        const getHocTap = async (id) => {
            const url = `${process.env.REACT_APP_API_URL}/hoctap/bytreem?treem=${id}`;
            const { data } = await axios.get(url, { withCredentials: true });
            setHocTaps(data.data);
        };
        const getHocBong = async (id) => {
            const url = `${process.env.REACT_APP_API_URL}/hocbongtreem/bytreem?treem=${id}`;
            const { data } = await axios.get(url, { withCredentials: true });
            setHocBongs(data.data);
        };
        const getBinhLuan = async (id) => {
            const url = `${process.env.REACT_APP_API_URL}/binhluan/getAllByTreEm?treEm=${id}`;
            const { data } = await axios.get(url, { withCredentials: true });
            setComments(data.data);
        };
        getTreEm();
    }, [props.id]);

    return (
        <>
            <Card
                data-drawer-target={`drawer-right-example-${treEm._id}`} data-drawer-show={`drawer-right-example-${treEm._id}`} data-drawer-placement="right" aria-controls={`drawer-right-example-${treEm._id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    border: '1px solid #99FFFF',
                    '&:hover': {
                        border: '1px solid black',
                    },
                }}
            >
                <Grid item xs={3}>
                    <img src={treEm.hinhAnh[0].url} alt="" style={{ width: 100, height: 100, margin: 'auto' }} />
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1, color: '#1E90FF' }}>
                        <Typography variant="subtitle2" noWrap>
                            {treEm.hoTen} - {moment(treEm.ngaySinh).format('DD/MM/YYYY')}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                <b>Đối tượng:</b>{' '}
                                {treEm.doiTuong.map((doituong, index) =>
                                    index === treEm.doiTuong.length - 1 ? doituong.ten : `${doituong.ten}, `
                                )}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                <b>Hoàn cảnh:</b> {treEm.hoanCanh}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                <b>Đơn vị bảo trợ:</b>{' '}
                                {treEm.donViBaoTro.map((donvi, index) =>
                                    index === treEm.donViBaoTro.length - 1 ? donvi.tenDonVi : `${donvi.tenDonVi}, `
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Card>


            <div className="dialog-container">
                <div className="content-container">
                    <div id={`drawer-right-example-${treEm._id}`} className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-2/3 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label">
                        <h5 className="mb-7 font-bold text-center tracking-tight text-gray-900 dark:text-white font-serif text-4xl">{treEm.hoTen}</h5>
                        <div className="flex flex-col items-start rounded-lg md:flex-row md:max-w-full">
                            <img className="w-1/3 h-72 md:h-auto md:w-1/2 rounded-xl " src={treEm.hinhAnh[0].url} alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Ngày sinh:</b> {moment(treEm.ngaySinh).format('DD/MM/YYYY')}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Số điện thoại:</b> {treEm.SDT}</p>
                                <b className="mb-3 text-gray-700 dark:text-gray-400">Hoàn cảnh:</b>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify"> {treEm.hoanCanh}</p>
                            </div>
                        </div>
                        <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                        <p className="mb-4 mt-7 font-bold tracking-tight text-gray-900 dark:text-white font-serif text-xl">Thành tích:</p>
                        {hocTaps.map((hoctap, index) => (
                            <>
                                {hoctap.thanhTich && (
                                    <div className='mb-2'>
                                        <p className='ml-3 font-black text-gray-600'>
                                            {hoctap.hocKy} - Năm học {hoctap.namHoc}
                                        </p>
                                        {hoctap.thanhTich.split('\n').map((item, index) => (
                                            <React.Fragment key={index}>
                                                <p className='ml-8' >{item}</p>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )}
                            </>
                        ))}

                        <p className="mb-4 mt-6 font-bold tracking-tight text-gray-900 dark:text-white font-serif text-xl">Học Bổng:</p>
                        <Grid container spacing={3}>
                            {hocBongs.map((hocbong, index) => (
                                <Grid item xs={6}>
                                    <Card className='flex p-2 border-2 border-slate-400 h-28 items-center'>
                                        <img src={hocbong.donViBaoTro.logo} alt="" className='w-16 h-16 inline-block my-auto ml-4' />
                                        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 5, pr: 1 }}>
                                            <Tooltip title={hocbong.donViBaoTro.tenDonVi} placement="top">
                                                <Typography variant="subtitle2" noWrap>
                                                    {hocbong.donViBaoTro.tenDonVi}
                                                </Typography>
                                            </Tooltip>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Tooltip title={hocbong.hocBong.tenHocBong} placement="right">
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                        {hocbong.hocBong.tenHocBong}
                                                    </Typography>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                    Giá trị: {hocbong.hocBong.soTien} VND ({hocbong.hocBong.hinhThuc})
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                    {hocbong.namHoanThanh > moment().format('YYYY')
                                                        ? `Còn lại: ${hocbong.namHoanThanh - moment().format('YYYY')} năm`
                                                        : ''}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <div className="bg-sky-600 h-px my-20 w-1/2 mx-auto" />
                        <p className="mb-4 mt-16 text-center font-bold tracking-tight text-red-500 dark:text-white font-serif text-5xl">Lời chúc</p>
                        <CommentList treEm={treEm._id} comments={comments} />


                    </div>
                </div>
            </div>


        </>
    );
}
