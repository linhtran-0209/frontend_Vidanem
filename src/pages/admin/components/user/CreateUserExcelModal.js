import axios from 'axios';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

export function CreateUserExcelModal(props) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [failure, setFailure] = useState(0);

  const handleDownloadTemplate = async () => {
    try {
      const url = `http://localhost:5000/api/v1/account/getTemplate`;
      const response = await axios.get(url, {
        withCredentials: true,
        responseType: 'blob', // set the response type to blob
      });
      const fileName = 'Template Import Account.xlsx'; // set the file name
      const blob = new Blob([response.data]); // create a Blob from the response data
      const link = document.createElement('a'); // create a link element
      link.href = window.URL.createObjectURL(blob); // set the link href to a URL created from the Blob
      link.download = fileName; // set the download attribute to the file name
      document.body.appendChild(link); // append the link to the document body
      link.click(); // simulate a click on the link to trigger the download
      document.body.removeChild(link); // remove the link from the document body after the download is complete
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemove = () => {
    setFile(null)
    setMessage(null)
    setFailure(0)
  }
  const handleSubmitFile = async () => {
    const url = `http://localhost:5000/api/v1/account/importExcel`
    const formData = new FormData();
    formData.append('excel', file);
    await axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }).then((res) => {
        setMessage(res.data.message);
        if (res.status !== 200) {
            setFailure(res.data.failure)
        }
      });
  };

  return (
    <>
      <Dialog
        className="createExcelModal"
        open={props.opencreateExcelModal}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="titlecreateuserexcel">
          {' '}
          Upload danh sách tài khoản
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent>
          <Typography className="namecontent">Tải danh sách theo mẫu để cập nhật thông tin tài khoản</Typography>
          <div className="groupbutton">
            <Button className={clsx('downloadbutton')} onClick={handleDownloadTemplate}>
              Tải file mẫu
            </Button>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <Button className={clsx('uploadbutton')} endIcon={<UploadIcon />} component="span">
                Upload danh sách
              </Button>
            </label>
          </div>
          {file && (
            <div className="">
              <div className="">
                <p>{file.name}</p>
                <IconButton className="" size="small" onClick={handleRemove}>
                  <CloseIcon fontSize="inherit" color="error" />
                </IconButton>
              </div>
              <LoadingButton className={clsx('button')} onClick={handleSubmitFile}>
                Gửi file
              </LoadingButton>
            </div>
          )}
          <div>
            <Typography className="ketqua">Kết quả</Typography>
          </div>
          <div>
            {failure === 0 && <p style={{color: 'green'}}>{message}</p>}
            {failure !== 0 && 
            <>
            <p className="ketqua" style={{ color: 'red' }}>Lỗi: {failure}</p>
            <p style={{ color: 'red' }}>{message}</p>
            </>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
