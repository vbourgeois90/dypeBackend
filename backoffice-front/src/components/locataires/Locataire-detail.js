import React from 'react';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default function LocDetail(){
    const classes = useStyles();

    return(
        <div>
            <Drawer activeMenu='2'/>
            <h1 className={classes.root}>LOC DETAIL</h1>
        </div>
    )
}