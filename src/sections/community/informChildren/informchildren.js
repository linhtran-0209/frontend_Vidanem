// import React from 'react';
// import ReactDOM from 'react-dom';
// import ReactFormInputValidation from 'react-form-input-validation';

// export default function InformChildren() {
//   return (
//     <>
//       <h3>Thông tin trẻ em có hoàn cảnh khó khăn</h3>

//       <div className="container">

//         <form>
//           <label htmlFor="fname">Tên đơn vị</label>
//           <input type="text"  placeholder="Nhập tên đơn vị.." />

//           <label htmlFor="lname">Địa chỉ</label>
//           <input type="text"  placeholder="Nhập địa chỉ.." />

//           <label htmlFor="lname">Email</label>
//           <input type="text"  placeholder="Nhập email.." />

//           <label htmlFor="subject">Mô tả</label>
//           <textarea  placeholder="Nhập mô tả.."  />

//           <input type="submit" value="Gửi" />
//         </form>
//       </div>
//     </>
//   );
// }

// const rootElement = document.getElementById('root');
// ReactDOM.render(<InformChildren />, rootElement);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactDOM from 'react-dom';
import Marquee from 'react-fast-marquee';
import { Grid, Paper, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function InformChildren() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#EEEEEE',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    transition: 'opacity 0.3s, filter 0.3s',
    '&:hover': {
      opacity: 0.8,
      filter: 'brightness(90%)',
      '&::after': {
        content: 'attr(data-info)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify',
        height: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        // transform: 'translate(-50%, -50%)',
        backdropFilter: 'none',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        textOverflow: 'ellipsis', // Thêm thuộc tính textOverflow: 'ellipsis'
        overflow: 'hidden', // Thêm thuộc tính overflow: 'hidden'
        // whiteSpace: 'nowrap', // Thêm thuộc tính whiteSpace: 'nowrap'
      },
    },
  }));

  const [name, setName] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [diachi, setDiachi] = useState('');
  const [hoancanh, setHoancanh] = useState('');
  const [listSponsor, setListSponsor] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const dataCollection = async (event) => {
    event.preventDefault();
    setName(event.currentTarget);
    // setNgaysinh((ngaysinh) => event.currentTarget);
    console.log(setName);
  };
  // useEffect(() => {
  //   const getlistimage = async () => {
  //     try {
  //       const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
  //       const { data } = await axios.get(url, { withCredentials: true });
  //       setListSponsor(data.data);
  //       console.log(data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getlistimage();
  // }, []);

  useEffect(() => {
    const updateImageList = async () => {
      const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll?all=true`;
      const { data } = await axios.get(url, { withCredentials: true });
      const images = data.data.map((donvi) => donvi.logo);
      setImageList(images);
      setListSponsor(data.data);
      setVisibleItems(data.data.slice(0, 8));
    };

    updateImageList();
  }, []);

  const fetchMoreData = () => {
    // Tính toán số phần tử mới sẽ hiển thị
    const newVisibleItems = visibleItems.length + 8;
    console.log(visibleItems.length, listSponsor.length);
    if (visibleItems.length >= listSponsor.length) {
      setHasMore(false); // Không còn dữ liệu để tải
    }

    // Kiểm tra nếu đã hiển thị hết tất cả các phần tử
    if (newVisibleItems >= listSponsor.length) {
      setVisibleItems(listSponsor); // Hiển thị tất cả các phần tử
    } else {
      // Lấy số lượng phần tử mới từ danh sách `listSponsor`
      const updatedItems = listSponsor.slice(0, newVisibleItems);
      console.log(updatedItems);
      setVisibleItems(updatedItems); // Cập nhật danh sách hiển thị mới
    }
  };

  return (
    <div className="sponsor">
      <div>
        <Marquee className="marquee" direction="left" speed={100} pauseOnClick gradient>
          {imageList.map((item, index) => (
            <div className="image_wrapper">
              <img key={index} src={item} alt={`logo ${item.tenDonVi}`} />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="title__form__informchildrens">
        <h2>Danh sách tất cả các nhà tài trợ đã đóng góp cho cộng đồng</h2>
      </div>
      <div className="image__NhaTaiTro">
        <InfiniteScroll
          dataLength={visibleItems.length} // Số lượng phần tử hiển thị
          next={fetchMoreData} // Hàm được gọi khi cần tải thêm dữ liệu
          hasMore={hasMore} // Có còn dữ liệu để tải hay không
          loader={hasMore ? <h4>Đang tải...</h4> : null} // Hiển thị khi đang tải dữ liệu
        >
          <Grid container spacing={2} columns={20}>
            {visibleItems.map((item, index) => (
              <Grid item xs={5}>
                <Tooltip title={item.gioiThieu.length > 350 ? item.gioiThieu : '' } placement="right">
                  <Item data-info={item.gioiThieu.length > 350 ? `${item.gioiThieu.substr(0, 350)}...` : item.gioiThieu }>
                    <img key={index} src={item.logo} alt={`logo ${item.tenDonVi}`} />
                  </Item>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </div>
  );
}
