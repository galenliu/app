import React, {useContext} from 'react';
import {makeStyles} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/material/Icon';
import AddIcon from '@mui/material/Icon';
import {useTranslation} from 'react-i18next';
import clsx from "clsx";
import {AppContext} from "../App";
import Tooltip from "@mui/material/Tooltip";
import {drawerWidth} from "../js/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  appBar: {
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  toolbar: {},
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },


}));

export default function TopBar(props) {

  const classes = useStyles();
  const {t} = useTranslation();

  const {drawerOpen, setDrawerOpen} = useContext(AppContext)

  return (
    <div className={classes.root}>
      <AppBar position="static"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
              })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.title}
          </Typography>
          {props.add && <IconButton edge="end" aria-label="show 4 new mails" color="inherit" onClick={() => {
            props.show(true)
          }}>
            <Badge badgeContent={0} color="secondary">
              <Tooltip title={t("add things")} arrow>
                <AddIcon edge="end"/>
              </Tooltip>
            </Badge>
          </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
