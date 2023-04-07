
import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
// form

import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, FormControl } from '@mui/material';




import BlogNewPostPreview from './PreviewNewBlog';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);


  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };


  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };






  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      handleClosePreview();
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      
      
    },
    
  );


  return (
    <>
      
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ và tên *"
                  type="text"
                  multiline rows={3}
                  fullWidth
                />
              </FormControl>
              

                {/* <div>
                  <LabelStyle>Content</LabelStyle>
                  <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                />
              </FormControl>
                </div>

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  
                </div> */}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              {/* <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />

<FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl className="formcontrol__inform" variant="standard" fullWidth>
                <TextField
                  htmlFor="demo-customized-textbox"
                  margin="dense"
                  id="hoTen"
                  label="Họ và tên *"
                  type="text"
                  fullWidth
                />
              </FormControl>
                <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                    />
                  )}
                />
              </Stack> */}
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      

      {/* <BlogNewPostPreview
        // values={values}
        // isOpen={open}
        // isValid={isValid}
        // isSubmitting={isSubmitting}
        // onClose={handleClosePreview}
        // onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
