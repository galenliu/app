import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {makeStyles} from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import API from "../../js/api";
import {useTranslation} from "react-i18next";
import NewThing from "../../components/NewThing";
import Grid from "@mui/material/Grid";
import {AppContext} from "../../App";


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
    const ws = useRef()
    const [message, setMessage] = useState()
    const [readyState, setReadyState] = useState('正在链接中');
    const [availableThings, setAvailableThings] = useState([])
    const [actionUrl, setActionUrl] = useState()
    const {newThingShow, setNewThingShow} = useContext(AppContext);

    const webSocketInit = useCallback((path) => {
        const stateArr = [
            '正在链接中',
            '已经链接并且可以通讯',
            '连接正在关闭',
            '连接已关闭或者没有链接成功',
        ];
        if (!ws.current || ws.current.readyState === 3) {
            ws.current = new WebSocket(path);
            ws.current.onopen = _e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onclose = _e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onerror = e =>
                setReadyState(stateArr[ws.current?.readyState ?? 0]);
            ws.current.onmessage = e => {
                setMessage(JSON.parse(e.data));
            };
        }
    }, [ws]);


    function cancelPairing() {
        setActionUrl(null)
        setAvailableThings(null)
        if (actionUrl !== undefined) {
            API.cancelPairing(actionUrl).catch((err) => {
                console.log("cancelParing err:", err)
            })
        }
    }

    useEffect(() => {
        const addAvailableThings = (message) => {
            console.log(typeof (message))
            console.log("Paring message:", message)
            let copy = availableThings
            if (availableThings === [] || availableThings === undefined || availableThings === null) {
                copy = []
            }
            for (const th in availableThings) {
                console.log(th)
                if (th.id === message.id) {

                }
            }
            copy.push(message)
            setAvailableThings([...copy])
        }
        if (message) {
            addAvailableThings(message)

        }
    }, [message])


    useEffect(
        () => {

            API.startPairing(5000).then((action) => {
                setActionUrl(action.href)
                let proto = 'ws://';
                if (window.location.protocol === 'https:') {
                    proto = 'wss://';
                }
                let host = window.location.host
                const path = proto + "localhost:9090" + "/new_things"
                console.log("start websocket request Pairing websocket:", path)
                webSocketInit(path)
            }).catch((err) => {
                console.log("startPairing err:", err)
            })
            return () => {
                cancelPairing()
                ws.current?.close();
            }

        }, [props.open]
    )


    function renderAvailableThings() {
        let list = []
        if (availableThings === [] || availableThings === undefined || availableThings === null) {
            return
        }

        availableThings.forEach((thing, key) => {

            if (thing["@type"]) {
                const newThing = <NewThing key={key} newThing={thing}/>
                list.push(newThing)
            }
        })
        return list
    }


    return (
        <div>
            <Dialog fullScreen open={newThingShow} onClose={() => setNewThingShow(false)}
                    TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={() => {
                            {
                                setNewThingShow(false)
                            }
                        }} aria-label="close">
                            <CloseIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader}/>
                <Grid container justify="flex-start" alignItems="center" direction="column">
                    {renderAvailableThings()}
                </Grid>
            </Dialog>
        </div>
    );
}
