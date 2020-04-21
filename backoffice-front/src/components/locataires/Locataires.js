import React from 'react';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh', //SUPPRIMER LE STYLE ET REAJUSTER A VOTRE SAUCE SAMOURAI ALGERIENNE (CA MARCHE COMME LE STYLE REACT NATIVE)
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function Locataires(){
    const classes = useStyles();

    return(
        <div>
            <Drawer activeMenu='2'/>
            <h1 className={classes.root}>PAGE LOCATAIRES</h1>
        </div>
    )
}