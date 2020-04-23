import React, {useEffect} from 'react';
import clsx from 'clsx';

import {Grid, Container, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Drawer from './Drawer'
import RDV from './RDV-card';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    }
}));

export default function MyDashboard(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // RECUPERE TOUS LES UTILISATEURS DE LA BDD
    useEffect(() => {
      const fetchData = async() => {
        
        var rawData = await fetch('/getUsers');
        var data = await rawData.json();
        console.log('data :>> ', data);
  
      }
      fetchData();
    }, []);

    return(
    <div className={classes.root}>

      <Drawer activeMenu='0'/>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* RDV */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <RDV />
              </Paper>
            </Grid>
            {/* STATISTIQUES */}
            <Grid item xs={12} md={8}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
              </Paper>
            </Grid>
            {/* DOSSIERS */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* ANNONCES */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* LOCATAIRES */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </main>
    </div>
    )
}