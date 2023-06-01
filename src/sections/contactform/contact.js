import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function Contact() {

  return (
    <>
      <div className="divider" />
      <div>
        <form className="form__contact">
          <fieldset>
            <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
            <p>
              <b>Email: </b>thanhdoan@tphcm.gov.vn
            </p>
            <p>
              <b>Phone: </b>(84.8) 38225124 - 38225146
            </p>
            <p>
              <b>Địa chỉ: </b>1 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Việt Nam
            </p>
            <div className="divider__contactform" />
            <br />
            <div className="form__contact__container">
              <div className="form__contact__container__one">
                <div className="form__informcontact__control">
                  <input
                    className="form__contact__content"
                    type="text"
                    name="hoten"
                    rows="5"
                    placeholder="Nhập họ tên..."
                  />
                </div>
                <div className="form__informcontact__control">
                  <input className="form__contact__content" type="text" name="ngaysinh" placeholder="Nhập Email..." />
                </div>
                <div className="form__informcontact__control">
                  <input className="form__contact__content" type="text" name="diachi" placeholder="Nhập tiêu đề..." />
                </div>
              </div>
              <div className="form__contact__container__two">
                <div className="form__informcontact__control">
                  <textarea className="form__mota" rows="11" name="hoancanh" placeholder="Nhập mô tả..." />
                </div>
              </div>
            </div>
            <button type="submit" value="submit" >
              Gửi
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
