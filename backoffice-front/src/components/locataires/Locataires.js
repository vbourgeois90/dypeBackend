import React, {useState} from 'react';
import {connect} from 'react-redux';
import Drawer from '../dashboard/Drawer'
// import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';


// const useStyles = makeStyles((theme) => ({
//     root: {

//     }
// }));

function Locataires({userList}){
    // const classes = useStyles();
    const [thisUser, setThisUser] = useState()
    const handleRowClick = () => {
        setThisUser('user')
    }
    
    if(!thisUser){

        return(
            <div>
                <Drawer activeMenu='2'/>

                <MaterialTable
                    title=""
                    columns={[
                    { title: 'Nom', field: 'nom' },
                    { title: 'Adresse e-mail', field: 'email' },
                    { title: 'Numéro de téléphone', field: 'numTel' },
                    { title: 'Status', field: 'status'}
                    ]}
                    data={[
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    { nom: 'Serge Lama', email: 'tungagnant@serge.com', numTel: '0684651684', status: 'Logé' },
                    { nom: 'Francis Lalane', email: 'lalalasalope@jtm.com', numTel: '0684651684', status: 'En cours' },
                    ]}
                    // data={userList}

                    options={{
                        search: true,
                        pageSize: 10,
                        headerStyle: {fontWeight: 'bold'}
                    }}

                    style={{
                        height: 'auto',
                        marginLeft: '240px',
                        marginTop: '60px'
                    }}

                    localization={{
                        body: {
                        emptyDataSourceMessage: 'Aucun utilisateur trouvé'
                        },
                        toolbar: {
                            searchPlaceholder: 'Rechercher...',
                        },
                        pagination: {
                        labelRowsSelect: 'Lignes',
                        labelDisplayedRows: ' {from}-{to} sur {count}',
                        firstTooltip: 'Première page',
                        previousTooltip: 'Page précédente',
                        nextTooltip: 'Page suivante',
                        lastTooltip: 'Dernière page'
                        }
                    }}

                    onRowClick= {()=>handleRowClick()}
                />

            </div>
        )

    } else {
        return(
            <Redirect to='/locataires/fiche' />
        )
    }
}

function mapStateToProps(state){
    return{
        userList: state.userList
    }
}

export default connect(
    mapStateToProps,
    null
)(Locataires);