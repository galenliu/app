import React, {useContext, useState} from "react";
import {makeStyles} from "@mui/styles";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from "@mui/material/List";
import {useTranslation} from "react-i18next";
import DomainIcon from '@mui/icons-material/Domain';
import ExtensionIcon from '@mui/icons-material/Extension';
import {CssBaseline} from "@mui/material";
import clsx from "clsx";
import {AppContext} from "../App";
import Grid from "@mui/material/Grid";
import AddonsDialog from "./Addons";
import Divider from "@mui/material/Divider";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {drawerWidth} from "../js/constant";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  listItem: {
    maxWidth: 400,
    minWidth: 300,
  }

}))


export default function Settings(props) {

  const classes = useStyles();
  const {t} = useTranslation();
  const {drawerOpen, setNewThingsClose, setNewThingsOpen, newThingsOpen} = useContext(AppContext)
  const [addonsDialogShow, setAddonsDialogShow] = useState(false)

  return (
      <>
        <CssBaseline/>
        {/*<TopBar add={false} title={t("Settings")}/>*/}
        <main
            className={clsx(classes.content, {
              [classes.contentShift]: !drawerOpen,
            })}
        >
          <Grid container justify="flex-start" alignItems="center" direction="column">
            <div className={classes.drawerHeader}/>

            <List component="nav" aria-label="main mailbox folders" className={classes.list}>
              <Divider/>
              <ListItem button
                        className={classes.listItem} variant="contained" elevation={111}>
                <ListItemIcon>
                  <DomainIcon/>
                </ListItemIcon>
                <ListItemText primary={t("Domain")}/>
                <NavigateNextIcon/>
              </ListItem>
              <Divider/>
              <ListItem button
                        className={classes.listItem} variant="contained"
                        onClick={() => setAddonsDialogShow(true)}>
                <ListItemIcon>
                  <ExtensionIcon/>
                </ListItemIcon>
                <ListItemText primary={t("Addons")}/>
                <NavigateNextIcon/>
              </ListItem>
              <Divider/>
              <ListItem button
                        className={classes.listItem} variant="contained" elevation={111}>
                <ListItemIcon>
                  <DomainIcon/>
                </ListItemIcon>
                <ListItemText primary={t("Domain")}/>
                <NavigateNextIcon/>
              </ListItem>
              <Divider/>
              <ListItem button
                        className={classes.listItem} variant="contained" elevation={111}>
                <ListItemIcon>
                  <DomainIcon/>
                </ListItemIcon>
                <ListItemText primary={t("Domain")}/>
                <NavigateNextIcon/>
              </ListItem>
              <Divider/>
            </List>
          </Grid>

        </main>
        <AddonsDialog open={addonsDialogShow} show={setAddonsDialogShow}/>
      </>
  )
}
