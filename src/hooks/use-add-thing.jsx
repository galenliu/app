/**
 * Create a new "pair" action on the gateway.
 */
import {useEffect, useRef, useState} from "react";
import API from "../js/api"
import {Status} from "../views/Things/NewThings"

export default function UseAddThings(timeout) {
    const [newThing, setNewThing] = useState({})
    const [actionUrl, setActionUrl] = useState()
    const ws = useRef(null)
    const timeOut = useRef(null)
    const [state, setState] = useState("")

    useEffect(() => {
        //第一次加载，发送配对请求
        if (typeof (actionUrl) !== "undefined" || ws.current !== null) {
            return
        }
        requestStartPairing()
        timeOut.current = setTimeout(() => {
            requestCancelPairing();
        }, timeout);

        let proto = 'ws';
        if (window.location.protocol === 'https:') {
            proto = 'wss';
        }
        const wsHref = window.location.origin.replace(/^http/, proto);
        const path = `${wsHref}/new_things?jwt=${API.jwt}`;
        //const path = `${wsHref}/new_things`;
        console.log("new things websocket url", path)
        ws.current = new WebSocket(path);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onError = (e) => {
            console.log(e)
            setState(Status[1])
        }
        ws.current.onmessage = onMessage

        return () => {
            close()
        };
    }, []);


    function requestStartPairing() {
        API.startPairing(timeout)
            .then((json) => {
                setState(Status[0])
                setActionUrl(json.pair.href)
            })
            .catch((error) => {
                setState(Status[1])
                console.error(`pairing request failed: ${error}`);
            });
    }

    function close() {
        let wsRef = ws.current
        if (wsRef === null) {
            return
        }
        if (typeof wsRef !== 'undefined') {
            if (
                wsRef.readyState === WebSocket.OPEN ||
                wsRef.readyState === WebSocket.CONNECTING
            ) {
                wsRef.close();
            }
        }
    }

    function requestCancelPairing() {

        setState(Status[2])
        if (timeOut.current != null) {
            clearTimeout(timeOut.current)
        }
        close()
        if (actionUrl !== undefined) {
            API.cancelPairing(actionUrl)
                .then(() => {
                    setActionUrl(undefined)
                })
                .catch((error) => {
                    console.error(`Error cancelling pairing request ${error}`);
                });
        }
    }

    function onMessage(event) {
        console.log("111111111111111",event)
        if (event.data) {
            if (!event.data) {
                return
            }
            setNewThing(JSON.parse(event.data))
        }
    }

    const addThing = (thing) => {
        return API.addThing(thing)
    }

    return [newThing, state, addThing]
}

