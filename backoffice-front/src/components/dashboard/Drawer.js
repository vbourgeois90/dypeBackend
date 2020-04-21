import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import TodayIcon from '@material-ui/icons/Today';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: '55px',
    marginLeft: drawerWidth,
    display: 'flex',
    justifyContent: 'center'
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#125ce0'
  },
  logo: {
      width: '120px',
      alignSelf: 'center',
      margin: '20px'
  },
  navlink: {
    color: 'white',
    textDecoration: 'none'
  }
}));

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();
  
  const [selectedIndex, setSelectedIndex] = useState(props.activeMenu);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
            //   aria-controls={menuId}
              aria-haspopup="true"
            //   onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >

        <img 
            className={classes.logo}
            src={ require('../../images/DYPE_logo_NB.png') } 
            alt="DYPE logo"
        />

        <List className={classes.listNav}>

          <Link 
            to='/'
            onClick={() => setSelectedIndex(0)}
            className={classes.navlink}
          >
            <ListItem 
                button
                selected={selectedIndex === '0'}
            >
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link 
            to='/rdv'
            onClick={() => setSelectedIndex(1)}  
            className={classes.navlink}
            
          >
            <ListItem 
                button
                selected={selectedIndex === '1'}
                // onClick={(event) => handleListItemClick(event, 1)}      
            >
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
              <ListItemText primary="Mes rendez-vous" />
            </ListItem>
          </Link>
          
          <Link 
            to='/locataires' 
            className={classes.navlink}
            onClick={() => setSelectedIndex(2)} 
          >
            <ListItem 
                button
                selected={selectedIndex === '2'}     
            >
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
              <ListItemText primary="Locataires" />
            </ListItem>
          </Link>

          <Link 
            to='/annonces' 
            className={classes.navlink}
            onClick={() => setSelectedIndex(3)}  
          >
            <ListItem 
                button
                selected={selectedIndex === '3'}    
            >
              <ListItemIcon>
                  <HomeWorkRoundedIcon />
                </ListItemIcon>
              <ListItemText primary="Mes annonces" />
            </ListItem>
          </Link>

          <Link 
            to='/stats' 
            className={classes.navlink}
            onClick={() => setSelectedIndex(4)}    
          >
            <ListItem 
                button
                selected={selectedIndex === '4'}
            >
                <ListItemIcon>
                  <BarChartRoundedIcon />
                </ListItemIcon>
              <ListItemText primary="Statistiques" />
            </ListItem>
          </Link>

        </List>
        
        {/* <Divider /> */}
      </Drawer>
    </div>
  );
}
