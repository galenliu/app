import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from "react-i18next";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DialogContent from '@material-ui/core/DialogContent';
import ThingIcons from "./icons";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
// import DomainIcon from "@material-ui/icons/Domain";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import ExtensionIcon from "@material-ui/icons/Extension";
import Slide from '@material-ui/core/Slide';
import {BooleanPropertyListItem, NumberPropertyListItem, StringPropertyItem} from "./thing-property";
import CloseIcon from "@material-ui/icons/Close";
import ThingsScreen from "../js/things-screen";
import {ThingType} from "../js/constant";
import {InputLabel, ListItem, ListItemIcon, MenuItem, Select, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {App} from "../App";
import API from "../js/api";
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    list: {
        display: "flex",
        width: '100%',
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },

    listItem: {
        flexGrow: 1,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: 400,
        minWidth: 300,
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function ThingPanel(props) {
    const {t} = useTranslation();
    const [thing, setThing] = useState()
    const [removeDialogOpen, setRemoveDialog] = useState(false)
    const [title, setTitle] = useState()
    const classes = useStyles();


    useEffect(() => {
        if (props.open) {
            let th = ThingsScreen.getThing(props.thingID)
            if (th) {
                setThing(th)
                setTitle(th.title)
            }
        } else {
            setThing({})
        }
    }, [props.open])

    useEffect(() => {

    }, [thing])


    const renderControlPanel = useCallback(() => {
        switch (thing.selectedCapability) {
            case ThingType.Light:
                return <ThingPanel open={props.open} {...thing} setProperty={thing.setProperty}/>
        }
    }, [thing])

    const remove = () => {
        thing.model.removeThing()
        App.showThings()
    }


    const save = () => {
        API.updateThing({title: title})
        App.showThings()
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.show(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("Confirm to remove this accessory")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setRemoveDialog(false)
                        props.show(true)
                    }} color="primary">
                        {t("Cancel")}
                    </Button>

                    <Button autoFocus onClick={() => {
                        remove()
                        setRemoveDialog(false)
                        props.show(false)
                    }} color="primary">
                        {t("Ok")}
                    </Button>
                </DialogActions>
            </Dialog>
            {!removeDialogOpen && thing !== undefined &&
            <Dialog fullScreen className={classes.root} open={props.open} onClose={() => props.show(false)}
                    TransitionComponent={Transition}>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <ThingIcons style={{fontSize: 30}} type={thing.selectedCapability}/>
                        <Typography variant="h6" className={classes.title}>
                            {thing.title}
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={() => props.show(false)} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className={classes.drawerHeader}/>
                    <Grid className={classes.content} container flow={1}>
                        {renderControlPanel()}
                        < List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                            <Divider/>
                            <ListItem className={classes.listItem} button>
                                <ListItemIcon>
                                    <ThingIcons edg="start" style={{fontSize: 30}} type={thing.selectedCapability}/>
                                </ListItemIcon>
                                <TextField edg="end" defaultValue={thing.title} onChange={(e) => {
                                    setTitle(e.target.value)
                                }}/>
                                {title !== thing.title &&
                                <button onClick={save}>{t("save")}</button>}
                            </ListItem>
                            <Divider/>
                            <ListItem button className={classes.listItem} variant="contained" elevation={111}>
                                <FormControl className={classes.formControl} style={{width: "100%"}}>
                                    <InputLabel id="demo-simple-select-label">{t("Room")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select">
                                        <MenuItem value={10}>客厅</MenuItem>
                                        <MenuItem value={20}>卧室</MenuItem>
                                        <MenuItem value={30}>厨房</MenuItem>
                                    </Select>
                                </FormControl>

                            </ListItem>

                            <ListItem className={classes.listItem} color={"red"} button
                                      onClick={() => setRemoveDialog(true)}>
                                <Button variant="contained" color="warning" style={{width: "100%"}}>
                                    {t("remove the accessories")}
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </DialogContent>
            </Dialog>}
        </>

    );
}


export function DetailsPanel(props) {

    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const [title, setTitle] = useState("121312")

    function update() {

    }

    function renderPropertyListItem() {

        const listItem = []
        for (const name in props.displayedProperties) {
            let prop = props.displayedProperties[name]
            if (prop.property.type === "integer") {
                let item = <NumberPropertyListItem key={name} {...prop.detail.listViewData}/>
                listItem.push(item)
            }
            if (prop.property.type === "OnOffProperty") {
                let item = <BooleanPropertyListItem key={name}  {...prop.detail.listViewData}/>
                listItem.push(item)
            }
            if (prop.property.type === "string") {
                let item = <StringPropertyItem key={name}  {...prop.detail.listViewData}/>
                listItem.push(item)
            }
        }
        return listItem
    }

    return (
        <>
            <List subheader={<ListSubheader>Control</ListSubheader>} className={classes.list}>
                <Divider/>

                {renderPropertyListItem()}

                <Divider/>

            </List>

        </>
    )
}

