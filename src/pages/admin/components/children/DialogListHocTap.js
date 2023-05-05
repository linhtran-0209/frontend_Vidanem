import { Alert, Button, Dialog, DialogActions, DialogContent, IconButton, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogHocTap } from './DialogHocTap';

export function DialogListHocTap(props) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [hocTap, setHocTap] = useState([]);
  const [openDialogHocTap, setOpenDialogHocTap] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [infoHocTap, setInfoHocTap] = useState({});
  const [hocTapNew, sethocTapNew] = useState([]);
  const [hocTapEdit, setHocTapEdit] = useState([]);
  const [hocTapDelete, setHocTapDelete] = useState([]);

  const handleClickOpenDialog = () => {
    setOpenDialogHocTap(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogHocTap(false);
  };

  useEffect(() => {
    if (props.listHocTap) {
      setHocTap(props.listHocTap);
    }
  }, [props.listHocTap]);

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);
  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 10000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}

      <Dialog className="dialogcreatehoctap" open={props.openDialog} onClose={props.handleClose}>
        <div className="titlecreatehoctap">
          {' '}
          Thông tin học tập
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent>
          {hocTap.map((hoctap, index) => {
            return (
              <Card
                onDoubleClick={() => {
                  // console.log(index, hocTap[index]);
                  setIsEdit(true);
                  setInfoHocTap(hocTap[index]);
                  handleClickOpenDialog();
                }}
                variant="outlined"
                orientation="horizontal"
                sx={{
                  marginBottom: 2,
                  marginLeft: 2,
                  width: '95%',
                  '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
              >
                <div style={{ display: 'flex' }}>
                  <h3 style={{ marginLeft: 20 }}>
                    {hoctap.hocKy} - Năm {hoctap.namHoc}
                  </h3>
                  <IconButton
                    className="button_remove_hoctap"
                    onClick={() => {
                      props.handleRemove(index);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <p style={{ marginLeft: 40 }}>Học Lực: {hoctap.hocLuc}</p>
              </Card>
            );
          })}
        </DialogContent>
        <DialogHocTap
          openDialogCreate={openDialogHocTap}
          isEdit={isEdit}
          infoHocTap={infoHocTap}
          handleCickAdd={props.handleCickAdd}
          handleCickEdit={props.handleCickEdit}
          handleClose={handleCloseDialog}
        />
        <DialogActions>
          <Button
            className="huythemhoctap"
            onClick={() => {
              setIsEdit(false);
              handleClickOpenDialog();
            }}
          >
            Hủy
          </Button>
          <Button className="themhoctap" onClick={props.handleClose}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
