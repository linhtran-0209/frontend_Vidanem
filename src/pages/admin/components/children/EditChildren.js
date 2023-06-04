import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, Stack, Typography, FormControl, TextField, Button, IconButton, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton, treeItemClasses } from '@mui/lab';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from '../../../../components/iconify';
import 'react-datepicker/dist/react-datepicker.css';
// hooks
// utils
import { fData } from '../../../../utils/formatNumber';
import { DialogHocTap } from './DialogHocTap';
import { DialogListHocTap } from './DialogListHocTap';
import { DialogReasonReject } from './DialogReasonReject';
import { DialogHocBong } from './DialogHocBong';
import { DialogListDoiTuong } from './DialogListDoiTuong';
import { DialogReasonEdit } from './DialogReasonEdit';

export default function EditChildren() {
  const { id } = useParams();
  const [quyen, setQuyen] = useState(0);
  const [openSuccessMessage, setOpenSuccessMessage] = useState('');
  const [openErrMessage, setOpenErrMessage] = useState('');
  const [preview, setPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesEdit, setImagesEdit] = useState([]);
  const [imagesDelete, setImagesDelete] = useState([]);
  const [treEm, setTreEm] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [oldDoiTuong, setOldDoiTuong] = useState([]);
  const [newDoiTuong, setNewDoiTuong] = useState([]);

  const [hocTap, setHocTap] = useState([]);
  const [hocBong, setHocBong] = useState([]);
  const [hocBongNew, sethocBongNew] = useState([]);
  const [hocBongEdit, setHocBongEdit] = useState([]);
  const [hocBongDelete, setHocBongDelete] = useState([]);
  const [hocTapNew, sethocTapNew] = useState([]);
  const [hocTapEdit, setHocTapEdit] = useState([]);
  const [hocTapDelete, setHocTapDelete] = useState([]);
  const [openDialogListDoiTuong, setOpenDialogListDoiTuong] = useState(false);
  const [openDialogHocBong, setOpenDialogHocBong] = useState(false);
  const [infoHocBong, setInfoHocBong] = useState({});
  const [selectedHocBongIndex, setSelectedHocBongIndex] = useState(0);
  const [openDialogHocTap, setOpenDialogHocTap] = useState(false);
  const [openDialogList, setOpenDialogList] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [infoHocTap, setInfoHocTap] = useState({});
  const [selectedHocTapIndex, setSelectedHocTapIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [openDialogReasonReject, setOpenDialogReasonReject] = useState(false);
  const [openDialogReasonEdit, setOpenDialogReasonEdit] = useState(false);

  const [textFieldHoTenError, setTextFieldHoTenError] = useState(false);
  const [textFieldDiaChiError, setTextFieldDiaChiError] = useState(false);
  const [textFieldSDTError, setTextFieldSDTError] = useState(false);
  const [textFieldTruongError, setTextFieldTruongError] = useState(false);
  const [textFieldHoanCanhError, setTextFieldHoanCanhError] = useState(false);
  const [doiTuongError, setDoiTuongError] = useState(false);
  const [hocBongError, setHocBongError] = useState(false);
  const [hocTapError, setHocTapError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpenSuccessMessage('');
      setOpenErrMessage('');
    }, 3000);
  }, [openErrMessage, openSuccessMessage]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTreEm({ ...treEm, ngaySinh: moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ') });
  };

  useEffect(() => {
    setQuyen(+sessionStorage.getItem('role'));
  }, []);

  const getChild = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/byId?id=${id}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setTreEm(data.data);
    setSelectedDate(moment(data.data.ngaySinh));
    setPreview(data.data.hinhAnh);
    getHocTap(data.data._id);
    getHocBong(data.data._id);
    setOldDoiTuong(data.data.doiTuong);
    setNewDoiTuong(data.data.doiTuong);
  };

  useEffect(() => {
    getChild();
  }, []);

  const handleRemoveDoiTuong = (index) => {
    setNewDoiTuong((doituong) => {
      const newDoiTuongs = [...doituong];
      newDoiTuongs.splice(index, 1);
      return newDoiTuongs;
    });
  };

  const getHocBong = async (treem) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/bytreem?treem=${treem}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setHocBong(data.data);
  };

  const handleCickAddHocBong = (hocbong) => {
    setHocBongError(false);
    const newId = uuidv4();
    setHocBong([{ ...hocbong, _id: `temp${newId}` }, ...hocBong]);
    sethocBongNew([...hocBongNew, { ...hocbong, _id: `temp${newId}` }]);
  };

  const handleRemoveHocBong = (index) => {
    const indexHocBongNew = hocBongNew.findIndex((hocbong) => hocbong._id === hocBong[index]._id);
    if (indexHocBongNew !== -1) {
      sethocBongNew((hocbong) => {
        const newHocBong = [...hocbong];
        newHocBong.splice(indexHocBongNew, 1);
        return newHocBong;
      });
    }

    const indexHocBongEdit = hocBongEdit.findIndex((hocbong) => hocbong._id === hocBong[index]._id);
    if (indexHocBongEdit !== -1) {
      setHocBongEdit((hocbong) => {
        const editHocBong = [...hocbong];
        editHocBong.splice(indexHocBongEdit, 1);
        return editHocBong;
      });
    }

    setHocBongDelete([...hocBongDelete, hocBong[index]]);
    setHocBong((hocbong) => {
      const newHocBongs = [...hocbong];
      newHocBongs.splice(index, 1);
      return newHocBongs;
    });
  };

  const handleCickEditHocBong = (hocbong) => {
    setHocBongError(false);
    const hocbongs = [...hocBong];
    hocbongs[selectedHocBongIndex] = hocbong;
    setHocBong(hocbongs);

    const indexHocBongNew = hocBongNew.findIndex((hocbong) => hocbong._id === hocbongs[selectedHocBongIndex]._id);
    if (indexHocBongNew !== -1) {
      sethocBongNew((hocbong) => {
        const newHocBong = [...hocbong];
        newHocBong.splice(indexHocBongNew, 1);
        return newHocBong;
      });
    }

    const indexEdit = hocBongEdit.findIndex((hocbong) => hocbong._id === hocbongs[selectedHocBongIndex]._id);
    if (indexEdit !== -1) {
      // Phần tử có id đã tồn tại trong mảng
      // Chỉ mục của phần tử đó là index
      const hocbongEdits = [...hocBongEdit];
      hocbongEdits[indexEdit] = hocbong;
      setHocBongEdit(hocbongEdits);
    } else {
      // Phần tử không tồn tại trong mảng
      setHocBongEdit([...hocBongEdit, hocbong]);
    }
  };

  const handleCloseDialogHocBong = () => {
    setOpenDialogHocBong(false);
  };

  const getHocTap = async (treem) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/hoctap/bytreem?treem=${treem}`;
    const { data } = await axios.get(url, { withCredentials: true });
    setHocTap(data.data);
  };

  const handleClickOpenDialogHocBong = () => {
    setOpenDialogHocBong(true);
  };

  const handleRemoveImage = (index) => {
    if (preview.length - 1 === selectedImageIndex) setSelectedImageIndex(0);
    const indexImg = images.findIndex((image) => image._id === preview[index]._id);
    if (indexImg !== -1) {
      setImages((img) => {
        const newImg = [...img];
        newImg.splice(indexImg, 1);
        return newImg;
      });
    }
    const indexEdit = imagesEdit.findIndex((image) => image._id === preview[index]._id);
    if (indexEdit !== -1) {
      setImagesEdit((img) => {
        const newImg = [...img];
        newImg.splice(indexEdit, 1);
        return newImg;
      });
    }

    setImagesDelete([...imagesDelete, preview[index]]);
    setPreview((prev) => {
      const newPreview = [...prev];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newId = uuidv4();
      setPreview([...preview, { _id: `temp${newId}`, url: URL.createObjectURL(file) }]);
      setImages([...images, { _id: `temp${newId}`, image: file }]);
    }
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files[0];
    const previews = [...preview];
    previews[selectedImageIndex].url = URL.createObjectURL(file);
    setPreview(previews);

    const index = images.findIndex((image) => image._id === previews[selectedImageIndex]._id);
    setImages((img) => {
      const newImg = [...img];
      newImg.splice(index, 1);
      return newImg;
    });

    const indexEdit = imagesEdit.findIndex((image) => image._id === previews[selectedImageIndex]._id);
    if (indexEdit !== -1) {
      // Phần tử có id đã tồn tại trong mảng
      // Chỉ mục của phần tử đó là index
      const imagesEdits = [...imagesEdit];
      imagesEdits[indexEdit].image = file;
      setImagesEdit(imagesEdits);
    } else {
      // Phần tử không tồn tại trong mảng
      setImagesEdit([...imagesEdit, { _id: previews[selectedImageIndex]._id, image: file }]);
    }
  };

  const handleClickOpenDialogListDoiTuong = () => {
    setOpenDialogListDoiTuong(true);
  };
  const handleCloseDialogListDoiTuong = () => {
    setOpenDialogListDoiTuong(false);
  };

  const handleAddDoiTuong = (doituongs) => {
    setDoiTuongError(false);
    setNewDoiTuong(doituongs);
  };

  const handleClickOpenDialog = () => {
    setOpenDialogHocTap(true);
  };
  const handleCloseDialog = () => {
    setOpenDialogHocTap(false);
  };

  const handleClickOpenDialogList = () => {
    setOpenDialogList(true);
  };
  const handleCloseDialogList = () => {
    setOpenDialogList(false);
  };

  const handleCickAdd = (hoctap) => {
    setHocTapError(false);
    const newId = uuidv4();
    setHocTap([{ ...hoctap, _id: `temp${newId}` }, ...hocTap]);
    sethocTapNew([...hocTapNew, { ...hoctap, _id: `temp${newId}` }]);
  };

  const handleRemoveHocTap = (index) => {
    const indexHocTapNew = hocTapNew.findIndex((hoctap) => hoctap._id === hocTap[index]._id);
    if (indexHocTapNew !== -1) {
      sethocTapNew((hoctap) => {
        const newHocTap = [...hoctap];
        newHocTap.splice(indexHocTapNew, 1);
        return newHocTap;
      });
    }

    const indexHocTapEdit = hocTapEdit.findIndex((hoctap) => hoctap._id === hocTap[index]._id);
    if (indexHocTapEdit !== -1) {
      setHocTapEdit((hoctap) => {
        const editHocTap = [...hoctap];
        editHocTap.splice(indexHocTapEdit, 1);
        return editHocTap;
      });
    }

    setHocTapDelete([...hocTapDelete, hocTap[index]]);
    setHocTap((hoctap) => {
      const newHocTaps = [...hoctap];
      newHocTaps.splice(index, 1);
      return newHocTaps;
    });
  };

  const handleCickEditHocTap = (hoctap) => {
    setHocTapError(false);
    const hoctaps = [...hocTap];
    hoctaps[selectedHocTapIndex] = hoctap;
    setHocTap(hoctaps);

    const indexHocTapNew = hocTapNew.findIndex((hoctap) => hoctap._id === hoctaps[selectedHocTapIndex]._id);
    if (indexHocTapNew !== -1) {
      sethocTapNew((hoctap) => {
        const newHocTap = [...hoctap];
        newHocTap.splice(indexHocTapNew, 1);
        return newHocTap;
      });
    }

    const indexEdit = hocTapEdit.findIndex((hoctap) => hoctap._id === hoctaps[selectedHocTapIndex]._id);
    if (indexEdit !== -1) {
      // Phần tử có id đã tồn tại trong mảng
      // Chỉ mục của phần tử đó là index
      const hoctapEdits = [...hocTapEdit];
      hoctapEdits[indexEdit] = hoctap;
      setHocTapEdit(hoctapEdits);
    } else {
      // Phần tử không tồn tại trong mảng
      setHocTapEdit([...hocTapEdit, hoctap]);
    }
  };

  const handleSubmit = async () => {
    if (!treEm.hoTen) {
      setTextFieldHoTenError(true);
    } else setTextFieldHoTenError(false);
    if (!treEm.truong) {
      setTextFieldTruongError(true);
    } else setTextFieldTruongError(false);
    if (!treEm.SDT) {
      setTextFieldSDTError(true);
    } else setTextFieldSDTError(false);
    if (!treEm.diaChi) {
      setTextFieldDiaChiError(true);
    } else setTextFieldDiaChiError(false);
    if (!treEm.hoanCanh) {
      setTextFieldHoanCanhError(true);
    } else setTextFieldHoanCanhError(false);
    if (oldDoiTuong.length === 0 && newDoiTuong.length === 0) {
      setDoiTuongError(true);
    } else setDoiTuongError(false);
    if (hocBong.length === 0) {
      setHocBongError(true);
    } else setHocBongError(false);
    if (hocTap.length === 0) {
      setHocTapError(true);
    } else setHocTapError(false);

    const url = `${process.env.REACT_APP_API_URL}/admin/treem/update`;

    if (
      treEm.hoTen &&
      treEm.truong &&
      treEm.SDT &&
      treEm.diaChi &&
      treEm.hoanCanh &&
      (oldDoiTuong.length > 0 || newDoiTuong.length > 0) &&
      hocBong.length > 0 &&
      hocTap.length > 0
    ) {
      await axios
        .post(
          url,
          {
            id: treEm._id,
            hoTen: treEm.hoTen,
            ngaySinh: treEm.ngaySinh,
            diaChi: treEm.diaChi,
            SDT: treEm.SDT,
            truong: treEm.truong,
            hocBong: treEm.hocBong,
            namNhan: treEm.namNhan,
            namHoanThanh: treEm.namHoanThanh,
            hoanCanh: treEm.hoanCanh,
            doiTuong: newDoiTuong.map((doituong) => doituong._id),
            donViBaoTro: hocBong.map((hocbong) => hocbong.donViBaoTro._id),
          },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.status === 200) {
            setOpenSuccessMessage(result.data.message);
          } else setOpenErrMessage(result.data.message);
        });

      // Cập nhật nếu thêm đối tượng mới
      newDoiTuong.forEach(async (doituong) => {
        if (!oldDoiTuong.find((item) => item._id === doituong._id)) {
          const url = `${process.env.REACT_APP_API_URL}/admin/doituong/updateQuantity`;
          await axios.put(
            url,
            {
              id: doituong._id,
              change: 'increase',
            },
            { withCredentials: true }
          );
        }
      });

      // Cập nhật nếu xóa đối tượng cũ
      oldDoiTuong.forEach(async (doituong) => {
        if (!newDoiTuong.find((item) => item._id === doituong._id)) {
          const url = `${process.env.REACT_APP_API_URL}/admin/doituong/updateQuantity`;
          await axios.put(
            url,
            {
              id: doituong._id,
              change: 'decrease',
            },
            { withCredentials: true }
          );
        }
      });

      // Lưu hình ảnh
      if (images.length > 0) {
        images.forEach(async (image) => {
          const urlHinhAnh = `${process.env.REACT_APP_API_URL}/admin/hinhanh/insert`;
          const formData = new FormData();
          formData.append('image', image.image);
          formData.append('refId', treEm._id);
          await axios.post(urlHinhAnh, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        });
      }
      if (imagesEdit.length > 0) {
        imagesEdit.forEach(async (image) => {
          if (image._id.includes('temp')) {
            const urlHinhAnh = `${process.env.REACT_APP_API_URL}/admin/hinhanh/insert`;
            const formData = new FormData();
            formData.append('image', image.image);
            formData.append('refId', treEm._id);
            await axios.post(urlHinhAnh, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true,
            });
          } else {
            const urlHinhAnh = `${process.env.REACT_APP_API_URL}/admin/hinhanh/update`;
            const formData = new FormData();
            formData.append('image', image.image);
            formData.append('id', image._id);
            await axios.put(urlHinhAnh, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true,
            });
          }
        });
      }

      if (imagesDelete.length > 0) {
        imagesDelete.forEach(async (image) => {
          if (!image._id.includes('temp')) {
            const urlHinhAnh = `${process.env.REACT_APP_API_URL}/admin/hinhanh/delete`;
            await axios.put(urlHinhAnh, { id: image._id }, { withCredentials: true });
          }
        });
      }

      // Lưu thành tích học tập
      if (hocTapNew.length > 0) {
        const urlHocTap = `${process.env.REACT_APP_API_URL}/admin/hoctap/insert`;
        await axios.post(
          urlHocTap,
          {
            treEm: treEm._id,
            hocTaps: hocTapNew,
          },
          { withCredentials: true }
        );
      }

      if (hocTapEdit.length > 0) {
        hocTapEdit.forEach(async (hoctap) => {
          if (hoctap._id.includes('temp')) {
            const urlHocTap = `${process.env.REACT_APP_API_URL}/admin/hoctap/insert`;
            await axios.post(
              urlHocTap,
              {
                treEm: treEm._id,
                hocTaps: [hoctap],
              },
              { withCredentials: true }
            );
          } else {
            const urlHocTap = `${process.env.REACT_APP_API_URL}/admin/hoctap/update`;
            await axios.put(
              urlHocTap,
              {
                id: hoctap._id,
                namHoc: hoctap.namHoc,
                hocKy: hoctap.hocKy,
                hocLuc: hoctap.hocLuc,
                thanhTich: hoctap.thanhTich,
              },
              { withCredentials: true }
            );
          }
        });
      }

      if (hocTapDelete.length > 0) {
        hocTapDelete.forEach(async (hoctap) => {
          if (!hoctap._id.includes('temp')) {
            const urlHocTap = `${process.env.REACT_APP_API_URL}/admin/hoctap/delete?id=${hoctap._id}`;
            await axios.delete(urlHocTap, { withCredentials: true });
          }
        });
      }

      // Lưu thành tích học bổng
      if (hocBongNew.length > 0) {
        const urlHocBong = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/insert`;
        await axios.post(
          urlHocBong,
          {
            treEm: treEm._id,
            hocBongs: hocBongNew,
          },
          { withCredentials: true }
        );
      }

      if (hocBongEdit.length > 0) {
        hocBongEdit.forEach(async (hocbong) => {
          if (hocbong._id.includes('temp')) {
            const urlHocBong = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/insert`;
            await axios.post(
              urlHocBong,
              {
                treEm: treEm._id,
                hocBongs: [hocbong],
              },
              { withCredentials: true }
            );
          } else {
            const urlHocBong = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/update`;
            await axios.put(
              urlHocBong,
              {
                id: hocbong._id,
                donViBaoTro: hocbong.donViBaoTro._id,
                hocBong: hocbong.hocBong._id,
                namNhan: hocbong.namNhan,
                namHoanThanh: hocbong.namHoanThanh,
              },
              { withCredentials: true }
            );
          }
        });
      }

      if (hocBongDelete.length > 0) {
        hocBongDelete.forEach(async (hocbong) => {
          if (!hocbong._id.includes('temp')) {
            const urlHocBong = `${process.env.REACT_APP_API_URL}/admin/hocbongtreem/delete?id=${hocbong._id}`;
            await axios.delete(urlHocBong, { withCredentials: true });
          }
        });
      }
    }
  };

  const handleCloseDialogReason = () => {
    setOpenDialogReasonReject(false);
  };

  const handleReject = async (reason) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/reject`;
    await axios
      .put(
        url,
        {
          id: treEm._id,
          reasonReject: reason,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
        setTreEm({ ...treEm, authStatus: 'TuChoi' });
      });
  };

  const handleAccept = async () => {
    if (quyen === 2) {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/approveLv2`;
      await axios
        .put(
          url,
          {
            id: treEm._id,
          },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.status === 200) {
            setOpenSuccessMessage(result.data.message);
          } else setOpenErrMessage(result.data.message);
        });
      setTreEm({ ...treEm, authStatus: 'ChoDuyet' });
    } else if (quyen === 1) {
      const url = `${process.env.REACT_APP_API_URL}/admin/treem/approveLv1`;
      await axios
        .put(
          url,
          {
            id: treEm._id,
          },
          { withCredentials: true }
        )
        .then((result) => {
          if (result.status === 200) {
            setOpenSuccessMessage(result.data.message);
          } else setOpenErrMessage(result.data.message);
        });
      setTreEm({ ...treEm, authStatus: 'DaDuyet' });
    } else alert('Không thể thực hiện chức năng này');
  };

  const handleRejectRequest = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/rejectrequest`;
    await axios
      .put(
        url,
        {
          id: treEm._id,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
        setTreEm({ ...treEm, isRequestEdit: false });
      });
  };

  const handleAcceptRequest = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/accppetrequest`;
    await axios
      .put(
        url,
        {
          id: treEm._id,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
        setTreEm({ ...treEm, isRequestEdit: false });
      });
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogReasonEdit(false);
  };

  const handleRequestEdit = async (reason) => {
    const url = `${process.env.REACT_APP_API_URL}/admin/treem/requestedit`;
    await axios
      .post(
        url,
        {
          id: treEm._id,
          reasonEdit: reason,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          setOpenSuccessMessage(result.data.message);
        } else setOpenErrMessage(result.data.message);
      });
  };

  return (
    <>
      {openSuccessMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 30, top: 60 }} severity="success">
          {openSuccessMessage}
        </Alert>
      )}
      {openErrMessage && (
        <Alert style={{ position: 'fixed', zIndex: 500000, right: 100 }} severity="error">
          {openErrMessage}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            {treEm.authStatus === 'TuChoi' && (
              <p style={{ marginTop: -50, marginBottom: 60, color: 'red', fontSize: 20 }}>❌ Từ chối</p>
            )}
            {treEm.authStatus === 'ChoDuyet' && (
              <p style={{ marginTop: -50, marginBottom: 60, color: 'yellow', fontSize: 20 }}>⌛ Chờ Duyệt</p>
            )}
            {treEm.authStatus === 'DaDuyet' && (
              <p style={{ marginTop: -50, marginBottom: 60, color: 'green', fontSize: 20 }}>✔ Đã Duyệt</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {preview.length > 0 && (
                <img
                  src={preview[selectedImageIndex].url}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    objectFit: 'cover',
                    height: 200,
                    border: '2px solid Silver',
                  }}
                />
              )}
            </div>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'auto',
              }}
            >
              <Grid container spacing={2} columns={16}>
                {preview.length > 0 &&
                  preview.map((image, index) => (
                    <Grid key={index} item xs={4}>
                      <Card sx={{ p: 0.5 }} onClick={() => setSelectedImageIndex(index)}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img
                            src={image.url}
                            alt="Preview"
                            style={{
                              maxWidth: '100%',
                              borderRadius: '5%',
                              objectFit: 'cover',
                              height: 60,
                              border: '2px solid Silver',
                            }}
                          />
                        </div>
                        <input
                          accept="image/*"
                          id="image-edit"
                          type="file"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            handleEditFileUpload(e);
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                          }}
                        >
                          <label
                            htmlFor="image-edit"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                          >
                            <button
                              onClick={(e) => {
                                // e.stopPropagation();
                                document.getElementById('image-edit').click();
                              }}
                            >
                              <Iconify style={{ color: 'green', width: '15' }} icon={'eva:edit-2-outline'} />
                            </button>
                          </label>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            <Iconify style={{ color: 'red', width: '15' }} icon={'eva:trash-2-outline'} />
                          </button>
                        </div>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
            {preview.length < 4 && (
              <>
                <input
                  accept="image/*"
                  id="image-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />

                <label
                  htmlFor="image-input"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}
                >
                  <Button variant="contained" color="primary" component="span">
                    Thêm ảnh
                  </Button>
                </label>
              </>
            )}

            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{ overflowY: 'auto', height: 600 }}>
          <Card sx={{ p: 3 }}>
            {treEm.authStatus === 'TuChoi' && (
              <>
                <p style={{ backgroundColor: '#FF6A6A', color: 'white', paddingLeft: 40, fontSize: 20 }}>
                  <b>
                    {' '}
                    <u>Lí do từ chối:</u>{' '}
                  </b>{' '}
                  {treEm.reasonReject}
                </p>
              </>
            )}
            {treEm.reasonEdit && treEm.isRequestEdit && (
              <>
                <p style={{ backgroundColor: '#FAFAD2', paddingLeft: 40, fontSize: 20 }}>
                  <b>
                    {' '}
                    <u>Lí do cần chỉnh sửa:</u>{' '}
                  </b>{' '}
                  {treEm.reasonEdit}
                </p>
              </>
            )}
            <div className="container__ten">
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  value={treEm.hoTen || ''}
                  onChange={(e) => {
                    setTextFieldHoTenError(false);
                    setTreEm({ ...treEm, hoTen: e.target.value });
                  }}
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                  error={textFieldHoTenError}
                  helperText={textFieldHoTenError && 'Vui lòng nhập họ tên'}
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Ngày sinh"
                    value={selectedDate}
                    onChange={handleDateChange}
                    // renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <TextField
                  id="hoanCanh"
                  label="Địa chỉ *"
                  value={treEm.diaChi || ''}
                  onChange={(e) => {
                    setTextFieldDiaChiError(false);
                    setTreEm({ ...treEm, diaChi: e.target.value });
                  }}
                  type="text"
                  placeholder="Địa chỉ"
                  error={textFieldDiaChiError}
                  helperText={textFieldDiaChiError && 'Vui lòng nhập địa chỉ'}
                />
              </FormControl>
            </div>
            <div className="container__diachi">
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="SDT *"
                  value={treEm.SDT || ''}
                  onChange={(e) => {
                    setTextFieldSDTError(false);
                    setTreEm({ ...treEm, SDT: e.target.value });
                  }}
                  label="Số điện thoại"
                  type="number"
                  fullWidth
                  error={textFieldSDTError}
                  helperText={textFieldSDTError && 'Vui lòng nhập số điện thoại'}
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="diaChi"
                  value={treEm.truong || ''}
                  onChange={(e) => {
                    setTextFieldTruongError(false);
                    setTreEm({ ...treEm, truong: e.target.value });
                  }}
                  label="Trường *"
                  type="text"
                  fullWidth
                  error={textFieldTruongError}
                  helperText={textFieldTruongError && 'Vui lòng nhập tên trường'}
                />
              </FormControl>
            </div>

            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                    <b style={{ fontSize: 20 }}>Thuộc diện đối tượng</b>
                  </label>

                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      handleClickOpenDialogListDoiTuong();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                  {doiTuongError && (
                    <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng chọn đối tượng trẻ em</div>
                  )}
                </div>
              </FormControl>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px', marginBottom: '10px' }}>
              {newDoiTuong.length > 0 &&
                newDoiTuong.map((doituong, index) => {
                  return (
                    <span
                      style={{
                        borderRadius: '16px',
                        backgroundColor: '#EEEEEE',
                        padding: '8px 1px 8px 12px',
                        marginLeft: '10px',
                        marginBottom: '5px',
                      }}
                    >
                      {' '}
                      {doituong.ten}
                      <IconButton
                        className="button_remove_doituong"
                        onClick={() => {
                          handleRemoveDoiTuong(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </span>
                  );
                })}
            </div>

            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <TextField
                  id="hoanCanh"
                  label="Hoàn Cảnh *"
                  type="text"
                  multiline
                  rows={4}
                  placeholder="Hoàn cảnh"
                  value={treEm.hoanCanh || ''}
                  onChange={(e) => {
                    setTextFieldHoanCanhError(false);
                    setTreEm({ ...treEm, hoanCanh: e.target.value });
                  }}
                  error={textFieldHoanCanhError}
                  helperText={textFieldHoanCanhError && 'Vui lòng nhập hoàn cảnh'}
                />
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label style={{ paddingTop: 10, mt: 3, paddingBottom: 15 }}>
                    <b style={{ fontSize: 20 }}>Học bổng</b>
                  </label>

                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      setIsEdit(false);
                      handleClickOpenDialogHocBong();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                  {hocBongError && (
                    <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng thêm thông tin học bổng</div>
                  )}
                </div>
                {hocBong.length > 0 &&
                  hocBong.map((hocbong, index) => {
                    return (
                      <Card
                        fullWidth
                        onDoubleClick={() => {
                          setSelectedHocBongIndex(index);
                          setIsEdit(true);
                          setInfoHocBong(hocbong);
                          handleClickOpenDialogHocBong();
                        }}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          marginBottom: 2,
                          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={hocbong.donViBaoTro.logo}
                            alt="Logo Đơn vị bảo trợ"
                            style={{
                              marginLeft: 20,
                              width: 80,
                              borderRadius: '15%',
                              height: 80,
                            }}
                          />
                          <div>
                            <h3 style={{ marginLeft: 20 }}>
                              {' '}
                              {hocbong.donViBaoTro.tenDonVi} - {hocbong.hocBong.tenHocBong}
                            </h3>
                            <p style={{ marginLeft: 40 }}>
                              Năm {hocbong.namNhan} - {hocbong.namHoanThanh}
                            </p>
                          </div>

                          <IconButton
                            className="button_remove_hoctap"
                            onClick={() => {
                              handleRemoveHocBong(index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </Card>
                    );
                  })}
              </FormControl>
            </div>
            <div className="container__hoancanh">
              <FormControl className="formcontrol__hoancanh" variant="standard" fullWidth>
                <div style={{ paddingTop: 15, mt: 3, paddingBottom: 15 }}>
                  <label>
                    <b style={{ fontSize: 20 }}>Học tập</b>
                  </label>
                  <Button
                    style={{ marginLeft: 5, paddingBottom: 10, paddingTop: 6 }}
                    onClick={() => {
                      setIsEdit(false);
                      handleClickOpenDialog();
                    }}
                  >
                    <Iconify style={{ color: 'green', padding: 0 }} icon={'material-symbols:add-circle-outline'} />
                  </Button>
                  {hocTapError && (
                    <div style={{ color: 'red', marginTop: 4, fontSize: '13px' }}>Vui lòng thêm thông tin học tập</div>
                  )}
                </div>
                {hocTap.length > 0 &&
                  hocTap.slice(0, 2).map((hoctap, index) => {
                    return (
                      <Card
                        fullWidth
                        onDoubleClick={() => {
                          setSelectedHocTapIndex(index);
                          setIsEdit(true);
                          setInfoHocTap(hocTap[index]);
                          handleClickOpenDialog();
                        }}
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          marginBottom: 2,
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
                              handleRemoveHocTap(index);
                              setSelectedHocTapIndex(index);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                        <p style={{ marginLeft: 40 }}>Học Lực: {hoctap.hocLuc}</p>
                      </Card>
                    );
                  })}
                {hocTap.length > 2 && (
                  <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" component="span" onClick={handleClickOpenDialogList}>
                      Xem tất cả
                    </Button>
                  </div>
                )}
              </FormControl>
            </div>
            <DialogListDoiTuong
              openDialog={openDialogListDoiTuong}
              addDoiTuong={handleAddDoiTuong}
              listDoiTuong={newDoiTuong}
              handleClose={handleCloseDialogListDoiTuong}
            />
            <DialogHocBong
              openDialogCreate={openDialogHocBong}
              isEdit={isEdit}
              infoHocBong={infoHocBong}
              handleCickAdd={handleCickAddHocBong}
              handleCickEdit={handleCickEditHocBong}
              handleClose={handleCloseDialogHocBong}
            />
            <DialogHocTap
              openDialogCreate={openDialogHocTap}
              isEdit={isEdit}
              infoHocTap={infoHocTap}
              handleCickAdd={handleCickAdd}
              handleCickEdit={handleCickEditHocTap}
              handleClose={handleCloseDialog}
            />
            <DialogListHocTap
              openDialog={openDialogList}
              listHocTap={hocTap}
              handleRemove={handleRemoveHocTap}
              handleCickAdd={handleCickAdd}
              handleCickEdit={handleCickEditHocTap}
              handleClose={handleCloseDialogList}
            />
            <DialogReasonReject
              openDialog={openDialogReasonReject}
              handleReject={handleReject}
              handleClose={handleCloseDialogReason}
            />
            <DialogReasonEdit
              openDialog={openDialogReasonEdit}
              handleRequestEdit={handleRequestEdit}
              handleClose={handleCloseDialogEdit}
            />
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {quyen === 3 ? (
                <>
                  {treEm.authStatus === 'DaDuyet' ? (
                    <LoadingButton
                      type="submit"
                      color="error"
                      variant="contained"
                      onClick={(e) => setOpenDialogReasonEdit(true)}
                    >
                      Yêu cầu chỉnh sửa
                    </LoadingButton>
                  ) : (
                    <>
                      {(treEm.authStatus === 'DeXuat' ||
                        treEm.authStatus === 'ChoChinhSua') && (
                          <LoadingButton type="submit" variant="contained" onClick={handleSubmit}>
                            Cập nhật
                          </LoadingButton>
                        )}
                    </>
                  )}
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {treEm.reasonEdit && treEm.isRequestEdit && (
                    <>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'red' }}
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                          handleRejectRequest();
                        }}
                      >
                        Từ chối
                      </LoadingButton>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'green' }}
                        type="submit"
                        variant="contained"
                        onClick={handleAcceptRequest}
                      >
                        Phê Duyệt
                      </LoadingButton>
                    </>
                  )}
                  {(treEm.authStatus === 'DeXuat' || (treEm.authStatus === 'ChoDuyet' && quyen === 1)) && (
                    <>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'red' }}
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                          setOpenDialogReasonReject(true);
                        }}
                      >
                        Trả Về
                      </LoadingButton>
                      <LoadingButton
                        style={{ marginRight: 20, background: 'green' }}
                        type="submit"
                        variant="contained"
                        onClick={handleAccept}
                      >
                        Duyệt
                      </LoadingButton>
                    </>
                  )}
                </div>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
