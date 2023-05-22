import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import parse from 'html-react-parser';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DetailChildren() {
  const [baiViet, setBaiViet] = useState({});

  const [preview, setPreview] = useState([]);
  const [imgCover, setImgCover] = useState(null);
  const [content, setContent] = useState(null);
  const [listImgContent, setListImgContent] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const getTinTuc = async () => {
    const url = `${process.env.REACT_APP_API_URL}/treem/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setBaiViet(data.data);
    console.log(data.data.hinhAnh,data.data);

    setPreview(`${process.env.REACT_APP_API_URL}${data.data.hinhAnh}`);
    setContent(data.data.hoanCanh);
    if(data.data.hoanCanh){
      setContent(parse(data.data.hoanCanh));
    }
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
      
        <div className="previewBlog">
          {baiViet.doiTuong && <h2>{baiViet.doiTuong}</h2>}

          {preview.map((item,index) =>{ 
            const {_id, url} = item;
            return(
            <img
              src={url}
              alt="Preview"
              style={{
                width: '100%',
                objectFit: 'cover',
                height: '30%',
              }}
            />
            );
          })}

          {baiViet.moTa && <p>{baiViet.hoanCanh}</p>}
          {baiViet.noiDung && <div className="image-container">{content}</div>}
        </div>

        {/* <DialogActions>
        <Button onClick={props.onClose}>Đóng</Button>
      </DialogActions> */}
      
    </>
  );
}
