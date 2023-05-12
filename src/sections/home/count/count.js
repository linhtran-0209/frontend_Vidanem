import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PersonIcon from '@mui/icons-material/Person';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

export default function CouterHomePage() {
  const [totalscholarship, setTotalscholarship] = useState(0);
  const [totalsponser, setTotalsponser] = useState(0);
  const [totalchidren, setTotalchildren] = useState(0);
  useEffect(() => {
    const getscholarship = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/scholarship/getAll`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTotalscholarship(data.total);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getsponser = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/sponsor/getAll`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTotalsponser(data.total);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getchildren = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/treem/getAll`;
        const { data } = await axios.get(url, { withCredentials: true });
        setTotalchildren(data.total);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getscholarship();
    getsponser();
    getchildren();
  }, []);
  return (
    <>
      <div className="counter">
        <div className="counter__container">
          <div className="counter__content">
            <AssignmentIcon className="icon" />
            <CountUp end={totalscholarship}>
              {({ countUpRef, start = 0 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </div>
          <h4 className="title__count">Học bổng</h4>
        </div>
        <div className="counter__container">
          <div className="counter__content">
            <PersonIcon className="icon" />
            <CountUp end={totalchidren}>
              {({ countUpRef, start = 1 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </div>
          <h4 className="title__count">Trẻ em</h4>
        </div>
        <div className="counter__container">
          <div className="counter__content">
            <Diversity1Icon className="icon" />

            <CountUp end={totalsponser}>
              {({ countUpRef, start = 1 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </div>
          <h4 className="title__count">Đơn vị tài trợ</h4>
        </div>
      </div>
    </>
  );
}
