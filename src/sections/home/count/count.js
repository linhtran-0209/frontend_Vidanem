import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PersonIcon from '@mui/icons-material/Person';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

export default function couterHomePage() {
  return (
    <>
      <div className="counter">
        <div className="counter__container">
          <div className="counter__content">
            <AssignmentIcon className="icon" />
            <CountUp end={100}>
              {({ countUpRef, start = 1 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </div>
          <h4 className='title__count'>Học bổng</h4>
        </div>
        <div className="counter__container">
          <div className="counter__content">
            <PersonIcon className="icon" />
            <CountUp end={100}>
              {({ countUpRef, start = 1 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </div>
          <h4 className='title__count'>Trẻ em</h4>
        </div>
        <div className="counter__container">
          <div className="counter__content">
            <Diversity1Icon className="icon" />
            
            <CountUp end={100}>
              {({ countUpRef, start = 1 }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
        
          </div>
          <h4 className='title__count'>Đơn vị tài trợ</h4>
        </div>
      </div>
    </>
  );
}
