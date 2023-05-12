// @mui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import parse from 'html-react-parser';
// components

import './PreviewNewBlog.css';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function BlogNewPostPreview(props) {
  const [contentElements, setContentElements] = useState(null);

  useEffect(() => {
    console.log(props.baiViet);
    if (props.baiViet.noiDung) setContentElements(parse(props.baiViet.noiDung));
  }, [props.baiViet.noiDung]);

  return (
    <Dialog maxWidth="sm" open={props.isOpen}>
      <div style={{ position: 'relative', bottom: '0', right: '16px' }}>
        <DialogActions>
          <Button onClick={props.onClose}>Đóng</Button>
        </DialogActions>
      </div>
      <div className="previewBlog">
        {props.baiViet.tieuDe && <h2>{props.baiViet.tieuDe}</h2>}
        {props.baiViet.anhTieuDe && (
          <img
            src={props.baiViet.anhTieuDe}
            alt="Preview"
            style={{
              width: '100%',
              objectFit: 'cover',
              height: '30%',
            }}
          />
        )}
        {props.baiViet.moTa && <p>{props.baiViet.moTa}</p>}
        {props.baiViet.noiDung && <div className="image-container">{contentElements}</div>}
      </div>
      <div style={{ position: 'relative', bottom: '0', right: '16px' }}>
        <Button> </Button>
      </div>
    </Dialog>
  );
}

// ----------------------------------------------------------------------
