import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Fade, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useBlog} from "../hooks/useBlog.js";

const apiUrl = "/api/v1/blog/";

const actions = [
  {icon: <FileCopyIcon/>, name: 'New Post'},
  {icon: <SaveIcon/>, name: 'New Blog'},
  {icon: <PrintIcon/>, name: 'Print'},
  {icon: <ShareIcon/>, name: 'Share'},
];

function NewBlogModal({setOpenNewBlogModal, openNewBlogMoal, setOpenDialAction}) {
  const {handleSubmitNewBlog, isLoading, errorMsg} = useBlog(apiUrl);

  const defaultTheme = createTheme();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpenNewBlogModal(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNewBlogMoal}
        onClose={handleClose}
        closeAfterTransition
        slots={{backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openNewBlogMoal}>
          <Box sx={style}>
            <Typography variant="h3" gutterBottom>Create New Blog</Typography>
            <ThemeProvider theme={defaultTheme}>
              <Box component="form"
                // onSubmit={() => setOpenDialAction(false)}

                   onSubmit={(event) => {
                     const form = new FormData(event.currentTarget)
                     return handleSubmitNewBlog(event, {
                       title: form.get('title'),
                       blog_description: form.get('blog_description')
                     }).then(() => {
                       setOpenNewBlogModal(false)
                       // Added setTimeout to ensure setOpenNewBlogModal is run first
                       setTimeout(() => setOpenDialAction(false), 100)
                     })
                   }}
                   sx={{mt: 1}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Blog Title"
                  name="title"
                  autoFocus
                />
                <TextField
                  margin="normal"

                  fullWidth
                  label="Blog Description"
                  name="blog_description"
                  autoFocus
                />

                {/*{errorMsg &&*/}
                {/*  <Typography color="error" sx={{mt: 2}}>*/}
                {/*    {errorMsg}*/}
                {/*  </Typography>*/}
                {/*}*/}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                >
                  Create
                  {/*{!isLoading ? "Sign In" : <CircularIndeterminate/>}*/}
                </Button>


              </Box>
            </ThemeProvider>
            {/*<Typography id="transition-modal-title" variant="h6" component="h2">*/}
            {/*  Text in a modal*/}
            {/*</Typography>*/}
            {/*<Typography id="transition-modal-description" sx={{mt: 2}}>*/}
            {/*  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
            {/*</Typography>*/}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


function BlogsRadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="all" control={<Radio/>} label="All" defaultChecked={true}/>
        <FormControlLabel value="default" control={<Radio/>} label="Default"/>
        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio/>}
          label="other"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default function MyBlog() {
  const [openDialAction, setOpenDialAction] = React.useState(false);
  const [openNewBlogModal, setOpenNewBlogModal] = useState(false)
  const handleOpen = () => setOpenDialAction(true);
  const handleClose = () => setOpenDialAction(false);

  const handleDialAction = ({name}) => {
    console.log(name)
    // handleClose()

    switch (name) {
      case 'New Blog':
        setOpenNewBlogModal(true)
        break
      default:
        setOpenDialAction(false)
        break

    }
    // handleClose()
  }

  return (


    <>
      <Container sx={{mt: 20}}>
        <Typography variant="h3" gutterBottom>
          My Blogs
        </Typography>
        <Divider/>
        <BlogsRadioButtonsGroup/>
        <Backdrop open={openDialAction}/>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{position: 'absolute', bottom: 26, right: 26}}
          icon={<SpeedDialIcon/>}
          onClose={handleClose}
          onOpen={handleOpen}
          open={openDialAction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleDialAction(action)}
            />
          ))}
        </SpeedDial>


      </Container>
      <NewBlogModal openNewBlogMoal={openNewBlogModal} setOpenNewBlogModal={setOpenNewBlogModal}
                    setOpenDialAction={setOpenDialAction}/>

    </>
  );
}
