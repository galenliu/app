import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from "react-i18next";
import ListItem from '@material-ui/core/ListItem';
import List from "@material-ui/core/List";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import {App} from "../App";
import {BooleanPropertyListItem, NumberPropertyListItem, StringPropertyItem} from "./thing-property";
import CloseIcon from "@material-ui/icons/Close";
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
    const [thing, setThing] = useState(App.gatewayModel.things.get(props.thingId))
    const [properties, setProperties] = useState()
    const [removeDialogOpen, setRemoveDialog] = useState(false)
    const classes = useStyles();


    useEffect(() => {
        if (props.open) {
            console.log("++++++++++++++++++++++++", props)

        }

    }, [props.open])

    useEffect(() => {

    }, [thing])

    return (
        <>
            <Dialog
                open={props.open}
                onClose={() => props.show(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{t("accessories removed")}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t("accessories removed")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        props.show(false)
                    }} color="primary" autoFocus>
                        {t("Ok")}
                    </Button>
                </DialogActions>
            </Dialog>
            {!removeDialogOpen &&
            <Dialog fullScreen className={classes.root} open={props.open} onClose={() => props.show(false)}
                    TransitionComponent={Transition}>

                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <ThingIcons style={{fontSize: 30}} type={props.selectedCapability}/>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={() => props.show(false)} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className={classes.drawerHeader}/>
                    <Grid className={classes.content} container flow={1}>
                        <DetailsPanel displayedProperties={props.displayedProperties}/>
                        <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                            <Divider/>
                            <ListItem className={classes.listItem} button onClick={() => props.remove()}>
                                <ListItemIcon>
                                    <ThingIcons edg="start" style={{fontSize: 30}} type={props.selectedCapability}/>
                                </ListItemIcon>
                                <TextField edg="end" defaultValue={props.title}/>
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

                            <ListItem className={classes.listItem} color={"red"} button onClick={() => props.remove()}>
                                <Button variant="contained" color="secondary" style={{width: "100%"}}>
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

