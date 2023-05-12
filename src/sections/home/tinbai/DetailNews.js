import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import parse from 'html-react-parser';
// components


import { useEffect, useState } from 'react';

export default function DetailNews(props) {
  const [contentElements, setContentElements] = useState(null)
  const close = () => {
    console.log(props.baiViet);
  };
  useEffect(() => {
    if (props.baiViet.content) setContentElements(parse(props.baiViet.content))
  }, [props.baiViet.content]);

  return (
    <Dialog fullScreen open={props.isOpen}>

        <div className="previewBlog">
          {props.baiViet.imgCoverPreview && (
            <img
              src={props.baiViet.imgCoverPreview}
              alt="Preview"
              style={{
                width: '100%',
                objectFit: 'cover',
                height: '30%',
              }}
            />
          )}
          {props.baiViet.title && <h2>{props.baiViet.title}</h2>}
          {props.baiViet.moTa && <p>{props.baiViet.moTa}</p>}
          {props.baiViet.content && <div className="image-container">{contentElements}</div>}
        </div>

      <DialogActions>
        <Button onClick={props.onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );

}