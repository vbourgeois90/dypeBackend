import React from 'react';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Grid, Container, Paper} from '@material-ui/core'


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

export default function LocDetail(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return(
    <div className={classes.root}>

        <Drawer activeMenu='2'/>

        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper className={fixedHeightPaper}>
                        1
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className={fixedHeightPaper}>
                        2
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className={fixedHeightPaper}>
                        3
                    </Paper>
                </Grid>
                </Grid>

            </Container>
        </main>
    </div>
    )
}