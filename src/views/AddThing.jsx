import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from "@material-ui/icons/Close";
import Slide from '@material-ui/core/Slide';
import API from "../js/api";
import {useTranslation} from "react-i18next";
import NewThing from "../component/new-thing";
import Grid from "@material-ui/core/Grid";
import useWebSocket, {ReadyState} from 'react-use-websocket';


const useStyles = makeStyles((theme) => ({
    appBar: {},
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewThingsDialog(props) {

    const classes = useStyles();
    const {t} = useTranslation();

    const [socketUrl, setSocketUrl] = useState(null);
    const {
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const [availableThings, setAvailableThings] = useState(new Map())
    const [actionUrl, setActionUrl] = useState()

    useEffect(
        () => {
            try {
                if (lastMessage) {
                    console.log("message update :", lastMessage)
                    let newThing = JSON.parse(lastMessage.data)
                    const things = availableThings
                    if (availableThings.isEmpty() || availableThings.has(newThing.id) === null) {
                        things[newThing.id] = newThing
                        setAvailableThings(things)
                        console.log("AvailableThings update :", availableThings)
                    }
                }
            } catch (e) {
                cancelPairing()
                console.log("message err:", e)
            }

        }, [lastMessage]
    )


    function cancelPairing() {
        setActionUrl(null)
        setAvailableThings(null)
        if (actionUrl !== undefined) {
            API.cancelPairing(actionUrl).catch((err) => {
                console.log("cancelParing err:", err)
            })
        }
    }


    useEffect(
        () => {
            if (props.open) {
                API.startPairing(5000).then((action) => {
                    setActionUrl(action.href)
                    setTimeout(() => {
                        cancelPairing()
                    }, 5000)

                    let proto = 'ws://';
                    if (window.location.protocol === 'https:') {
                        proto = 'wss://';
                    }
                    let host = window.location.host
                    const path = proto + "localhost:9090" + "/new_things"
                    console.log("start websocket request Pairing websocket:", path)
                    setSocketUrl(path)
                }).catch((err) => {
                    console.log("startPairing err:", err)
                })
            }
            if (!props.open) {
                {
                    cancelPairing()
                }
            }

        }, [props.open]
    )


    function RenderAvailableThings() {
        let list = []
        for (let thingId in availableThings) {
            let thing = availableThings[thingId]
            console.log("render thing :", thing)
            const newThing = <NewThing key={thing.id} {...thing}

            />
            list.push(newThing)
        }
        return list
    }


    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={() => props.show(true)}
                    TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            {t(connectionStatus)}......
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={() => {
                            {
                                props.show(false)
                                cancelPairing()
                            }
                        }} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader}/>
                <Grid container justify="flex-start" alignItems="center" direction="column">
                    {RenderAvailableThings()}
                </Grid>
            </Dialog>
        </div>
    );
}