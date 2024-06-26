import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, {useEffect, useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Fade, Modal, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useBlog} from "../hooks/useBlog.js";
import {useNavigate} from "react-router-dom";
import BlogsRadioButtonsGroup from "../components/BlogsRadioButtonsGroup.jsx";
import {usePost} from "../hooks/usePost.js";
import UserArticlesList from "../components/UserArticlesList.jsx";
import Hero from "../components/Hero.jsx";

const apiUrl = "/api/v1/";

const actions = [
    {icon: <FileCopyIcon/>, name: 'New Post'},
    {icon: <SaveIcon/>, name: 'New Blog'},
];

function NewBlogModal({setOpenNewBlogModal, openNewBlogMoal, setOpenDialAction, handleFetchBlogDataByCurrentUserId}) {
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
                                         setTimeout(() => handleFetchBlogDataByCurrentUserId(), 200)

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

export default function MyBlog({fullName}) {
    const [openDialAction, setOpenDialAction] = React.useState(false);
    const [openNewBlogModal, setOpenNewBlogModal] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState('all')


    const navigate = useNavigate();

    const {handleFetchBlogDataByCurrentUserId, isLoading, errorMsg, myBlogData} = useBlog(apiUrl);
    const {handleFetchPostByUserId, userPostData} = usePost(apiUrl);
    const handleOpen = () => setOpenDialAction(true);
    const handleClose = () => setOpenDialAction(false);

    const handleDialAction = ({name}) => {

        switch (name) {
            case 'New Blog':
                setOpenNewBlogModal(true)
                break
            case 'New Post':
                // setOpenNewBlogModal(true)
                // console.log(`hello world`)
                navigate('/newpost')
                break
            default:
                setOpenDialAction(false)
                break

        }
        // handleClose()
    }

    useEffect(() => {
        handleFetchBlogDataByCurrentUserId();
        handleFetchPostByUserId();
    }, []);


    return (


        <>
            <Hero/>
            <Container sx={{mt: 0}}>
                <Typography variant="h3" gutterBottom>
                    {fullName ? fullName : ''} Blog
                </Typography>
                <Divider/>
                <BlogsRadioButtonsGroup options={myBlogData} selectedBlog={selectedBlog}
                                        setSelectedBlog={setSelectedBlog}/>


                {selectedBlog !== 'all' &&
                    <UserArticlesList postData={userPostData.filter(p => p.blog_id === selectedBlog)}/>}
                {selectedBlog === 'all' && <UserArticlesList postData={userPostData}/>}


            </Container>

            <Backdrop open={openDialAction}/>

            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{position: 'fixed', bottom: 30, right: 30}}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={openDialAction}
            >
                {(myBlogData && myBlogData.length === 0) ?


                    <SpeedDialAction
                        icon={<SaveIcon/>}
                        tooltipTitle={'New Blog'}
                        tooltipOpen
                        onClick={() => handleDialAction({name: 'New Blog'})}
                    />
                    : actions.map((action) => {


                        return <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleDialAction(action)}
                        />
                    })}

            </SpeedDial>

            <NewBlogModal openNewBlogMoal={openNewBlogModal} setOpenNewBlogModal={setOpenNewBlogModal}
                          setOpenDialAction={setOpenDialAction}
                          handleFetchBlogDataByCurrentUserId={handleFetchBlogDataByCurrentUserId}/>
            <div style={{marginTop: "200px"}}></div>
        </>
    );
}
