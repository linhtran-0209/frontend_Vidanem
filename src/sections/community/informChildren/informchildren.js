import React from 'react';
import ReactDOM from 'react-dom';
import ReactFormInputValidation from 'react-form-input-validation';

export default function InformChildren() {
  return (
    <>
      <h3>Thông tin trẻ em có hoàn cảnh khó khăn</h3>

      <div className="container">
        
        <form>
          <label htmlFor="fname">Tên đơn vị</label>
          <input type="text"  placeholder="Nhập tên đơn vị.." />

          <label htmlFor="lname">Địa chỉ</label>
          <input type="text"  placeholder="Nhập địa chỉ.." />

         
          <label htmlFor="lname">Email</label>
          <input type="text"  placeholder="Nhập email.." />

         
          <label htmlFor="subject">Mô tả</label>
          <textarea  placeholder="Nhập mô tả.."  />

          <input type="submit" value="Gửi" />
        </form>
      </div>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<InformChildren />, rootElement);
