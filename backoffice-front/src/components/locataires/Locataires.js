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

function Locataires({userList, selectedUser}){
    // const classes = useStyles();
    const [thisUser, setThisUser] = useState()

    const formattedUserList=userList;
    for(let i=0; i<formattedUserList.length; i++){
        formattedUserList[i].isLoge===true ? formattedUserList[i].isLoge='logé' : formattedUserList[i].isLoge='non logé';
    }

    const handleRowClick = (userData) => {
        setThisUser(userData);
        selectedUser(userData);
    }
    
    if(!thisUser){

        return(
            <div>
                <Drawer activeMenu='2'/>

                <MaterialTable
                    title=""

                    columns={[
                        { title: 'Nom', field: 'nom' },
                        { title: 'Prénom', field: 'prenom' },
                        { title: 'Adresse e-mail', field: 'email' },
                        { title: 'Numéro de téléphone', field: 'numeroTelephone' },
                        { title: 'Status', field: 'isLoge'}
                    ]}

                    data={formattedUserList}

                    options={{
                        search: true,
                        pageSize: 10,
                        headerStyle: {fontWeight: 'bold'},
                        actionsColumnIndex: -1
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
                    
                    actions={[
                        {
                          icon: 'visibility',
                          tooltip: 'Voir le profil',
                          onClick: (event, rowData) => handleRowClick(rowData)
                        }
                    ]}

                    // onRowClick= {()=>handleRowClick()}
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

function mapDispatchToProps(dispatch){
    return{
        selectedUser: function(user){
            dispatch({type: 'saveUser', user})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locataires);