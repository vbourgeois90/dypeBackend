import React from 'react';
import {connect} from 'react-redux';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';

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
        marginRight: theme.spacing(6),
        textDecoration: 'none',
        color: 'black'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));

function Dossier({user}){
    const classes = useStyles();
    
    const idDocs = [];
    const justifDomDocs = [];
    const bulletinSalaireDocs = [];
    const contratTravailDocs = [];
    const avisImposDocs = [];

    for(let i=0; i<user.documents.length; i++){
        if(user.documents[i].type === "id"){
            idDocs.push(user.documents[i])
        } else if(user.documents[i].type === "jd"){
            justifDomDocs.push(user.documents[i])
        } else if(user.documents[i].type === "bs"){
            bulletinSalaireDocs.push(user.documents[i])
        } else if(user.documents[i].type === "ct"){
            contratTravailDocs.push(user.documents[i])
        } else if(user.documents[i].type === "ai"){
            avisImposDocs.push(user.documents[i])
        }
    }

    let listIdDocs = idDocs.map((document) => {
        return <div className={classes.doc}>
                    <div style={{flex: '3'}}>
                        <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                            {document.filename}
                        </Typography>
                    </div>
                    <div className={classes.listActions}>
                        <a href={document.url} target='_blank' rel="noopener noreferrer" className={classes.action}>
                            <VisibilityIcon />
                            <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>       
                        </a>
                    </div>                               
                </div>
    })

    let listJustifDomDocs = justifDomDocs.map((document) => {
        return <div className={classes.doc}>
                    <div style={{flex: '3'}}>
                        <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                            {document.filename}
                        </Typography>
                    </div>
                    <div className={classes.listActions}>
                        <a href={document.url} target='_blank' rel="noopener noreferrer" className={classes.action}>
                            <VisibilityIcon />
                            <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>       
                        </a>
                    </div>                              
                </div>
    })

    let listBulletinSalaireDocs = bulletinSalaireDocs.map((document) => {
        return <div className={classes.doc}>
                    <div style={{flex: '3'}}>
                        <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                            {document.filename}
                        </Typography>
                    </div>
                    <div className={classes.listActions}>
                        <a href={document.url} target='_blank' rel="noopener noreferrer" className={classes.action}>
                            <VisibilityIcon />
                            <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>       
                        </a>
                    </div>                             
                </div>
    })

    let listContratTravailDocs = contratTravailDocs.map((document) => {
        return <div className={classes.doc}>
                    <div style={{flex: '3'}}>
                        <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                            {document.filename}
                        </Typography>
                    </div>
                    <div className={classes.listActions}>
                        <a href={document.url} target='_blank' rel="noopener noreferrer" className={classes.action}>
                            <VisibilityIcon />
                            <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>       
                        </a>
                    </div>                              
                </div>
    })

    let listAvisImposDocs = avisImposDocs.map((document) => {
        return <div className={classes.doc}>
                    <div style={{flex: '3'}}>
                        <Typography variant="subtitle" style={{fontStyle: 'italic'}}>
                            {document.filename}
                        </Typography>
                    </div>
                    <div className={classes.listActions}>
                        <a href={document.url} target='_blank' rel="noopener noreferrer" className={classes.action}>
                            <VisibilityIcon />
                            <Typography variant="subtitle" style={{marginLeft: '6px'}}>Voir</Typography>       
                        </a>
                    </div>     
                </div>
    })


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
                        { doc: "Justificatif d'identité", listDoc: idDocs },
                        { doc: "Justificatif de domicile", listDoc: justifDomDocs },
                        { doc: "Bulletins de salaire", listDoc: bulletinSalaireDocs },
                        { doc: "Contrat de travail", listDoc: contratTravailDocs },
                        { doc: "Avis Imposition", listDoc: avisImposDocs },
                        { doc: "Autre documents", listDoc: [] }
                    ]}
                    detailPanel={rowData => {
                        return (
                            rowData.listDoc.length===0 ? <div className={classes.doc} style={{fontStyle: 'italic'}}>pas de documents</div> :
                            rowData.tableData.id===0 ? <div> {listIdDocs} </div> :
                            rowData.tableData.id===1 ? <div> {listJustifDomDocs} </div> :
                            rowData.tableData.id===2 ? <div> {listBulletinSalaireDocs} </div> :
                            rowData.tableData.id===3 ? <div> {listContratTravailDocs} </div> :
                            rowData.tableData.id===4 ? <div> {listAvisImposDocs} </div> :
                            <div> Pas de données </div>
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