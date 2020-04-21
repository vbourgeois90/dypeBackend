import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function RDV() {
    const classes = useStyles();
    
    const jour=["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const mois=["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const today = new Date();
    const date =  today.getDate() + ' ' + (today.getMonth() + 1) + ' ' + today.getFullYear()


    return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Gérer vos rendez-vous
        </Typography>
        <Typography component="p" variant="h5">
            5 rendez-vous aujourd'hui
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
            {date}
        </Typography>
        <div>
        <Link color="primary" href="#" onClick={preventDefault}>
            View balance
        </Link>
        </div>
    </React.Fragment>
    );
}