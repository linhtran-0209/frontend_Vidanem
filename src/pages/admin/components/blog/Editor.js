import { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import axios from 'axios';

// Register Quill image uploader module
Quill.register('modules/imageUploader', ImageUploader);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['clean'],
    ],
    handlers: {
      image: () => {
        const quill = this.quill;

        // Initiate file selector dialog
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('style', 'visibility:hidden');
        input.click();

        // Handle selected image file
        input.onchange = async () => {
          const file = input.files[0];
          if (/^image\//.test(file.type)) {
            const range = this.quill.getSelection(true);
            const formData = new FormData();
            formData.append('image', file);
            try {
              const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/tintuc/hinhanh`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
              });
              const imageUrl = response.data.data.duongDan;
              this.quill.insertEmbed(range.index, 'image', imageUrl, 'user');
            } catch (error) {
              console.error('Error during file upload:', error);
            }
          } else {
            console.warn('You could only upload images.');
          }
        };
      },
    },
  },
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);
        axios
          .post(`${process.env.REACT_APP_API_URL}/tintuc/hinhanh`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          })
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
            throw new Error('Network response was not ok.');
          })
          .then((result) => {
            localStorage.setItem('imageUrls', result.data.duongDan);
            resolve(`${process.env.REACT_APP_API_URL}${result.data.duongDan}`);
          })
          .catch((error) => {
            reject(new Error('Upload failed'));
            console.error('Error during file upload:', error);
          });
      });
    },
  },
};

function Editor({ value, onChange, handleImg }) {
  useEffect(() => {
    handleImg(localStorage.getItem('imageUrls'));
  }, [localStorage.getItem('imageUrls')]);

  return (
    <div style={{height: '300px'}}>
      <ReactQuill style={{height: '250px'}} theme="snow" value={value} onChange={onChange} modules={modules} />
    </div>
  );
}

export default Editor;
