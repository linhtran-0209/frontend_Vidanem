import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import parse from 'html-react-parser';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DetailNews() {
  const [baiViet, setBaiViet] = useState({});

  const [preview, setPreview] = useState(null);
  const [imgCover, setImgCover] = useState(null);
  const [content, setContent] = useState('');
  const [listImgContent, setListImgContent] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getTinTuc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/tintuc/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setBaiViet(data.data);
    console.log(data.data);

    setPreview(`${process.env.REACT_APP_API_URL}${data.data.anhTieuDe}`);
    setContent(data.data.noiDung);
  };

  useEffect(() => {
    getTinTuc();
  }, []);
  

  

  
  const handleListImg = (imgPath) => {
    if (content.includes(imgPath)) {
      setListImgContent([...listImgContent, imgPath]);
    }
  };

  return (
    <>
      <Dialog fullScreen>
        <div className="previewBlog">
          {baiViet.tieuDe && <h2>{baiViet.tieuDe}</h2>}
          {baiViet.anhTieuDe && (
            <img
              src={baiViet.anhTieuDe}
              alt="Preview"
              style={{
                width: '100%',
                objectFit: 'cover',
                height: '30%',
              }}
            />
          )}

          {baiViet.moTa && <p>{baiViet.moTa}</p>}
          {baiViet.noiDung && <div className="image-container">{baiViet.noiDung}</div>}
        </div>

        {/* <DialogActions>
        <Button onClick={props.onClose}>Đóng</Button>
      </DialogActions> */}
      </Dialog>
    </>
  );
}
