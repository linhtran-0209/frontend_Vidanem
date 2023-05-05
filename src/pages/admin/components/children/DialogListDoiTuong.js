import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function DialogListDoiTuong(props) {
  const [listDoiTuong, setListDoiTuong] = useState([]);
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    getListDoiTuong()
  }, []);

  const getListDoiTuong = async() => {
    const url = `${process.env.REACT_APP_API_URL}/doituong/getAll?all=true`;
    const { data } = await axios.get(url, { withCredentials: true });
    setListDoiTuong(data.data);
  }

  useEffect(() => {
    if (props.listDoiTuong){
      const checked = [...props.listDoiTuong]
      console.log(checked);
      const indexes = checked.map((checkedItem) => {
        return listDoiTuong.findIndex((listItem) => {
          return listItem._id === checkedItem._id;
        });
      }).filter((index) => {
        return index !== -1;
      });
      setChecked(indexes)
    }
  }, [props.listDoiTuong])

  const handleToggle = (index) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSubmit = () => {
    const doiTuongs = checked.map((index) => listDoiTuong[index]);
    props.addDoiTuong(doiTuongs);
    props.handleClose()
  };

  return (
    <>
      <Dialog open={props.openDialog} onClose={props.handleClose}>
        <DialogContent>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {listDoiTuong.map((doituong, index) => {
              // const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText id={index} primary={`${doituong.ten}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Huỷ</Button>
          <Button autoFocus onClick={handleSubmit}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
