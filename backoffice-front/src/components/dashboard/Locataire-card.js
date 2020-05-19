import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';


const useStyles = makeStyles({
    info: {
    display: 'flex'
  },
});

function LocCard({getUsers}) {
    const classes = useStyles();
    const [userList, setUserList] = useState([])

    // RECUPERE TOUS LES UTILISATEURS DE LA BDD
    useEffect(() => {
        const fetchData = async() => {
          var rawData = await fetch('/getUsers');
          var data = await rawData.json();
          setUserList(data)
          getUsers(data)
        }
        fetchData();
    }, [getUsers]);

    return (
    <React.Fragment>
        <Link to='/locataires' style={{textDecoration: 'none'}}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Gérer vos locataires
        </Typography>
        </Link>
        <div className={classes.info}>
            <Typography component="p" variant="h5" style={{fontWeight: 'bold', marginRight: '6px'}}>
                {userList.length}
            </Typography>
            <Typography component="p" variant="h6">
                locataires gérés
            </Typography>
        </div>
        <div className={classes.info}>
            <Typography component="p" variant="h5" style={{fontWeight: 'bold', marginRight: '6px'}}>
                3
            </Typography>
            <Typography component="p" variant="h6">
                locataires logés
            </Typography>
        </div>
        <div className={classes.info}>
            <Typography component="p" variant="h5" style={{fontWeight: 'bold', marginRight: '6px'}}>
                5
            </Typography>
            <Typography component="p" variant="h6">
                locataires en cours
            </Typography>
        </div>
    </React.Fragment>
    );
}


function mapDispatchToProps(dispatch){
    return {
        getUsers: function(users){
            dispatch({type: 'loadOnInit', users})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(LocCard)