import React from 'react';
import {Link} from 'react-router-dom';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Container, Paper, Avatar, Typography, Divider} from '@material-ui/core';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import PinDropIcon from '@material-ui/icons/PinDrop';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


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
    user: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    avatar: {
        height: '70px',
        width: '70px',
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2)
    },
    userName: {
        marginLeft: theme.spacing(2)
    },
    userPaper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: 480,
      borderRadius: '20px'
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    },
    rdvPaper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 180,
        borderRadius: '20px',
        marginBottom: theme.spacing(1)
    },
    annoncePaper: {
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      overflow: 'auto',
      height: 200,
      borderRadius: '20px',
      overflow: 'hidden'
    },
    rdvInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rdvPicture: {
        width: '80%',
        borderRadius: '20px'
    }
}));

export default function LocDetail(){
    const classes = useStyles();

    return(
    <div className={classes.root}>

        <Drawer activeMenu='2'/>

        <main className={classes.content}>

            <div className={classes.appBarSpacer} />

            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.user}>
                    <Avatar className={classes.avatar}>JR</Avatar>
                    <Typography variant='h3' className={classes.userName}>Joël Robuchon</Typography>
                </div>

                <Grid container spacing={2} className={classes.infoContainer}>
                    {/* USER INFO */}
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.userPaper}>
                            <Typography variant='h6'>Informations contact:</Typography>
                            <div className={classes.info}>
                                <AlternateEmailIcon style={{marginRight: '10px'}}/>
                                <Typography variant='h7'>joel.bubuche@free.fr</Typography>
                            </div>
                            <div className={classes.info}>
                                <PhoneIcon style={{marginRight: '10px'}}/>
                                <Typography variant='h7'>+33661846841</Typography>
                            </div>
                            <div className={classes.info}>
                                <PinDropIcon style={{marginRight: '10px'}}/>
                                <Typography variant='h7'>1 avenue des Rosiers, 92000 Nanterre</Typography>
                            </div>

                            <Divider variant="middle" style={{marginTop: '40px', marginBottom: '20px'}} />

                            <div className={classes.info}>
                                <DescriptionOutlinedIcon style={{marginRight: '10px', fontSize: '60px'}}/>
                                <Link to='/locataires/dossier' style={{color: 'black'}}>Voir ses documents</Link>
                            </div>

                            
                        </Paper>
                    </Grid>
                    {/* RDV ET ANNONCES */}
                    <Grid item container xs={12} md={8}>
                        <Grid item xs={12} md={8}>
                            <Paper className={classes.rdvPaper}>
                                <div className={classes.info}>
                                    <DateRangeOutlinedIcon style={{marginRight: '10px', fontSize: '80px'}}/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography variant='h6'>Prochain rendez-vous:</Typography>
                                        <Typography variant='h6'>Lundi 25 Mai 2020</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.annoncePaper}>
                                <Grid item container xs={12} sm={8} className={classes.rdvInfo}>
                                    <div style={{display: 'flex'}}>
                                        <AccessTimeIcon style={{marginRight: '10px'}}/>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <Typography variant='h7'>Lundi 25 Mai 2020</Typography>
                                            <Typography variant='h7'>11:00 - 11:30</Typography>
                                        </div>
                                    </div>
                                    <div className={classes.info}>
                                        <PinDropIcon style={{marginRight: '10px'}}/>
                                        <Typography variant='h7'>12 rue de la Paix, 75001 Paris</Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <img className={classes.rdvPicture} src='https://media-cdn.tripadvisor.com/media/photo-s/12/b0/c1/a9/adina-apartment-hotel.jpg'/>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Container>

        </main>
    </div>
    )
}