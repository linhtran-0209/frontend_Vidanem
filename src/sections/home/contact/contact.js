import React, {useState} from 'react';
import { BsFacebook, BsMessenger, BsLinkedin, BsTwitter, BsGlobe } from 'react-icons/bs';
import PlaceIcon from '@mui/icons-material/Place';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallIcon from '@mui/icons-material/Call';
import * as logo from '../../../assets/images/home/header_logo_lg.png';

export default function Contact() {
  
  const img = logo.default;

  return (
    <div>
      <div className="divider" />
      <div className="contact">
        <div className="contact__left">
          <h3>VÌ ĐÀN EM</h3>
          <p>Thành đoàn thành phố Hồ Chí Minh</p>
          <img src={img} alt="logo" />
        </div>
        <div className="contact__center">
          <h3>THÔNG TIN LIÊN HỆ</h3>

          <div className="contact__container">
            <PlaceIcon className="icon" />
            <p>
              <b>Địa chỉ: </b>1 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Việt Nam
            </p>
          </div>

          <div className="contact__container">
            <EmailOutlinedIcon className="icon" />
            <p>
              <b>Email:</b> thanhdoan@tphcm.gov.vn
            </p>
          </div>

          <div className="contact__container">
            <CallIcon className="icon" />
            <p>
              <b>Điện thoại: </b>(84.8) 38225124 - 38225146
            </p>
          </div>
        </div>
        <div className="contact__right">
          <h3> TRANG THÔNG TIN CỦA CHÚNG TÔI</h3>
          <div className="contact__icon__social">
            <ul>
              <li>
                <a>
                  <BsFacebook className="icon_contact" />
                </a>
              </li>
              <li>
                <a>
                  <BsMessenger className="icon_contact" />
                </a>
              </li>
              <li>
                <a>
                  <BsLinkedin className="icon_contact" />
                </a>
              </li>
              <li>
                <a>
                  <BsTwitter className="icon_contact" />
                </a>
              </li>
              <li>
                <a>
                  <BsGlobe className="icon_contact" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
