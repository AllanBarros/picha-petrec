import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormDialog from './feedback';
import { Card, CardActionArea, CardContent, CardActions } from '@material-ui/core';
import axios from 'axios';
import BarChart from './chart';


function App() {

  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  const [barChartData, setBarChartData] = useState(null);

  const MINUTE_MS = 960000;

  const handleChart = () => {
    axios.get('http://localhost:8000/photos-count/')
      .then((response) => {
        console.log(response)
        return setBarChartData(response.data)
      }, (error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleChart();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  const useStyles = makeStyles({
    root: {
      minWidth:'40%'
    },
    media: {
      height: '50%',
      minWidth: '40%',
    },
  });

  const [open, setOpen] = useState(false);

  const [photos, setPhotos] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const options = {
    headers: { 'Content-Type': 'application/json' }
  }

  const handlePhotos = () => {
    axios.get('http://localhost:8000/photos/')
      .then((response) => {
        console.log(response)
        return setPhotos(response.data)
      }, (error) => {
        console.log(error);
      });
  };


  useEffect(() => {

    handlePhotos()
    handleChart()

  }, [])

  function PhotoGrid() {
    const classes = useStyles();
    var lista = []
    photos.map((entry) => {
      lista.push(
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <img src={entry.image_url} alt={entry.title} className={classes.media} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {entry.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {entry.created_on}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" href={entry.link}>
                go to link
        </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
    return lista
  };


  return (
    <div className="App">
      <Grid container spacing={2} style={{ 'marginTop' : '5%'}}>
        <Grid item xs={4}><Typography variant="h1" component="h2">Picha!</Typography></Grid>
        {barChartData != null ?

          <Grid item xs={4} ><BarChart
            data={barChartData}
          />
          </Grid>
          :
          <Grid item xs={4}></Grid>
        }
        <Grid item xs={4}><Button color="primary" variant='contained' onClick={handleClick} >GOT FEEDBACK?</Button></Grid>
      
        {photos != null ?
   
          <PhotoGrid />
          :
          null
        }
      <FormDialog handle={handleClick} state={open} />
    </Grid>
    </div>
  );
}

export default App;
