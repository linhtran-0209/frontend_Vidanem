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
import ReactDOM from 'react-dom';

export default function InformChildren() {
  const [name, setName] = useState('');
  const [ngaysinh, setNgaysinh] = useState('');
  const [diachi, setDiachi] = useState('');
  const [hoancanh, setHoancanh] = useState('');
  const [listimage, setListimage] = useState([]);
  const dataCollection = async (event) => {
    event.preventDefault();
    setName(event.currentTarget);
    // setNgaysinh((ngaysinh) => event.currentTarget);
    console.log(setName);
  };
  useEffect(() => {
    const getlistimage = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
        const { data } = await axios.get(url, { withCredentials: true });
        setListimage(data.data);
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getlistimage();
  }, []);

  return (
    <>
      <div className='title__form__informchildrens'>
        <h2>Danh sách tất cả các nhà tài trợ đã đóng góp cho cộng đồng</h2>
      </div>
      <div className="image__NhaTaiTro">
        {listimage.map((item, index) => (
          <>
          <img key={index} src={item.logo} alt="item" />
          <h4 key={index}>{item.tenDonVi}</h4>
          </>
          
        ))}
      </div>
      {/*  */}
      {/* <div>
        <img src='../../../assets/images/home/header_logo_lg.png' alt='hihi' />
      </div> */}
      <div className="form__informchildren__container">
        <form className="form__informchildren">
          <fieldset>
            <h2>Thông tin trẻ em có hoàn cảnh khó khăn</h2>
            <div className="divider__communitypage" />
            <br />
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="hoten" rows="5" placeholder="Nhập họ tên..." />
            </div>
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="ngaysinh" placeholder="Nhập ngày sinh..." />
            </div>
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="diachi" placeholder="Nhập Email..." />
            </div>
            <div className="form__informchildren__control">
              <textarea className="form__hoancanh" rows="5" name="hoancanh" placeholder="Nhập hoàn cảnh..." />
            </div>
            <button type="submit" value="submit" onSubmit={dataCollection}>
              Gửi
            </button>
          </fieldset>
        </form>
        <form className="form__informchildren">
          <fieldset>
            <h2 className="title__form__informchildren">Nhu cầu hỗ trợ</h2>
            <div className="divider__communitypage" />
            <br />
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="tenDonVi" placeholder="Nhập tên đơn vị... " />
            </div>
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="soLuong" placeholder="Nhập số lượng..." />
            </div>
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="mucHoTro" placeholder="Mức hỗ trợ..." />
            </div>
            <div className="form__informchildren__control">
              <input className="form__content" type="text" name="doiTuong" placeholder="Đối tượng..." />
            </div>
            {/* <div className="form__informchildren__control">
            <input className="form__content" type="tel" name="diachi" placeholder='...' />
          </div>
          <div className="form__informchildren__control">
            <textarea className="form__hoancanh" rows="5" name="hoancanh" placeholder='Nhập hoàn cảnh' />
            
          </div> */}
            <button type="submit" value="submit" onSubmit={dataCollection}>
              Gửi
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
