import React from 'react';
import {connect} from 'react-redux';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';

import MaterialTable from 'material-table';


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
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3)
    },
    userName: {
        marginLeft: theme.spacing(2)
    },
    doc: {
        marginLeft: theme.spacing(14),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex'
    },
    listActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    action: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(2)
    }

}));

function Dossier({user}){
    const classes = useStyles();

    // const idDocs = []

    return(
    <div className={classes.root}>

        <Drawer activeMenu='2'/>

        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.user}>
                    <Avatar>{user.prenom[0]}{user.nom[0]}</Avatar>
                    <Typography variant='h6' className={classes.userName}>{user.prenom} {user.nom}</Typography>
                </div>

                <MaterialTable
                    title="Liste des documents personnels"
                    columns={[
                        { title: 'Type de document', field: 'doc' }
                    ]}
                    data={[
                        { doc: "Justificatif d'identité", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] },
                        { doc: "Relevé de compte", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] },
                        { doc: "Avis d'imposition", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] },
                        { doc: "Bulletins de salaire", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] },
                        { doc: "Attestation de l'employeur", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] },
                        { doc: "Autre documents", listDoc: [{docName: "Justif1.jpg"}, {docName: "Justf2.jpg"}] }
                    ]}
                    detailPanel={rowData => {
                        return (
                            <div className={classes.doc}>
                                <div style={{flex: '3'}}>
                                    <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                                        {rowData.listDoc[0].docName}
                                    </Typography>
                                    
                                </div>
                                <div className={classes.listActions}>
                                    <div className={classes.action}>
                                        <VisibilityIcon />
                                        <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>
                                    </div>
                                    <div className={classes.action}>
                                        <GetAppIcon />
                                        <Typography variant="subtitle">Télécharger</Typography>
                                    </div>
                                </div>                               
                            </div>
                        )
                    }}
                    options={{
                        search: false,
                        paging: false,
                    }}
                />


            </Container>
        </main>
    </div>
    )
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    null
)(Dossier)
