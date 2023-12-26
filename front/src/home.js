import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import image from "./road.png";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import axios from "axios";




const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'transparent',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#E2703A',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  }
}));
export const ImageUpload = () => { //imageupload is a component.
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  // This line uses the useState hook to create a state variable selectedFile and a corresponding function setSelectedFile
  // to update its value. It initializes selectedFile to undefined.
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData, 
      });
      // // If the response status is 200, it updates the data state with the response data.
      if (res.status === 200) {
        setData(res.data); 
      }
      setIsloading(false);
    }
  }
// This defines a function clearData which is responsible for resetting all the state variables to their initial values.
  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  // This is a useEffect hook that runs when selectedFile changes. 
  //If there is no selected file, it sets preview to undefined. 
  //Otherwise, it creates a URL for the selected file and sets it as the preview.
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  // This useEffect hook runs when preview changes. 
  // If preview is defined, it sets isLoading to true and calls sendFile

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);
// on selectfile, This function handles the event when a file is selected. It takes an array of files as an argument.
// If no files are provided or the array is empty, it resets the relevant state variables.
// If a file is selected, it updates selectedFile, sets data to undefined, and sets image to true.
  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Traffic Sign Detection System
          </Typography>
          <div className={classes.grow} />
          
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/**This is a Grid component from Material-UI. It's set as an item within a grid container.
xs={12} means that this item will take up 12 units of space in the grid, effectively spanning the entire width. This is used for responsiveness, where xs stands for extra small screens. */}
          <Grid item xs={12}>
            {/**Card has two classes: classes.imageCard and classes.imageCardEmpty. Which class is applied depends on the value of the image variable. */}
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {/** If image is true (or truthy), it will render the content inside <CardActionArea> */}
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media} //applies a specific style to the media element.
                  image={preview} /**specifies the image source, which is dynamically set based on the preview variable. */
                  component="image" /**indicates that the media component should be rendered as an <image> element. */
                  title="Contemplative Reptile" /**provides a title for the image  */
                />
              </CardActionArea>
              }
              {/**this will render the content inside <CardContent>...</CardContent> if image is false (or falsy). */}
              {!image && <CardContent className={classes.content}>
                {/**dropzone area is a component that allows users to drag and drop files, in this case, images. */}
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a traffic sign to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {/** If data is truthy (i.e., it exists), it will render the content inside the curly braces. */}
              {data && <CardContent className={classes.detail}>
                {/**aria-label="simple table" provides an accessible label for the table. */}
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>} 
               {/**If isLoading is truthy, it will render the content inside <CardContent> */}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} > 
              {/**By placing the button inside a grid item, you can position it relative to other elements on the page. */}
              {/* A customized button component named ColorButton is created using Material-UI's withStyles higher-order component (HOC). */}
              {/**variant="contained": This sets the button style to have a solid background color*/}
              {/**component="span": This specifies that the underlying HTML element for this button is a span. */}
              {/** This sets the size of the button to "large," making it larger than the default size. */}
              {/**startIcon={<Clear fontSize="large" />}: This places an icon (Clear) at the start of the button. */}
              {/**Clear icon from material ui material ui  */}
              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
    </React.Fragment >
  );
};