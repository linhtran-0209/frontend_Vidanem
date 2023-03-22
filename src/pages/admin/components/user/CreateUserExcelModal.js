import axios from 'axios';
import clsx from 'clsx';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

export function CreateUserExcelModal(props) {
    
    const [file, setFile] = useState(null);
    const [importedData, setImportedDate] = useState([]);
    const handleSubmitFile = async () => {
       
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
        <div className="titlecreateuser">
          {' '}
          Upload danh sách tài khoản
          <IconButton className onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="divider" />
        <DialogContent>
        <Typography className="namecontent">Tải danh sách theo mẫu để cập nhật thông tin tài khoản</Typography>
        <div className="groupbutton">
                    <Button
                        className={clsx('downloadbutton')}
                    >
                        <a target="_blank" rel="noopener noreferrer" href='https://docs.google.com/spreadsheets/d/10SrbF1_rWh2IU0XxgBGtPg0j9tOTLhnvFzNCq-ibnLU/edit#gid=0'>Tải file mẫu  </a>
                    </Button>
                    <Button
                            className={clsx('uploadbutton')}
                            endIcon={<UploadIcon />}
                        >
                            Upload danh sách
                        </Button>
        </div>
        {file &&
                    <div className="">
                        <div className="">
                            <p>{file.name}</p>
                            <IconButton 
                                className=""
                                size="small" 
                                onClick={() => setFile(null)}
                            >
                                <CloseIcon fontSize="inherit" color="error"/>
                            </IconButton>
                        </div>
                        <LoadingButton
                            className={clsx('button')}
                            
                            onClick={handleSubmitFile}
                        >
                            Gửi file
                        </LoadingButton>
                    </div>
                }
         <div>
         <Typography className="ketqua">Kết quả</Typography>
         </div>
        </DialogContent>
        
        </Dialog>
        </>
    );

}