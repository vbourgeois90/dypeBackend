import React from 'react';
import Drawer from '../dashboard/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Avatar, Typography } from '@material-ui/core'

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
        marginLeft: theme.spacing(10)
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
                    <Avatar>MJ</Avatar>
                    <Typography variant='h6' className={classes.userName}>Michael Jordan</Typography>
                </div>

                <MaterialTable
                    title="Liste des documents personnels"
                    columns={[
                        { title: 'Type de document', field: 'doc' }
                    ]}
                    data={[
                        { doc: "Justificatif d'identité" },
                        { doc: "Relevé de compte" },
                        { doc: "Avis d'imposition" },
                        { doc: "Bulletins de salaire" },
                        { doc: "Attestation de l'employeur" },
                        { doc: "Autre documents" }
                    ]}
                    detailPanel={rowData => {
                        return (
                            <Typography variant='h7' className={classes.doc}>machin.pdf</Typography>
                        )
                    }}
                    options={{
                        search: false,
                        paging: false
                    }}
                />


            </Container>
        </main>
    </div>
    )
}
