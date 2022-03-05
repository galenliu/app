/**
 * Create a new "pair" action on the gateway.
 */
import {useEffect, useRef, useState} from "react";
import API from "../../js/api"

export default function UsePairing(timeout) {
    const [newThings, setNewThings] = useState([])
    const [actionUrl, setActionUrl] = useState()
    const ws = useRef(null)
    const timeOut = useRef(null)

    useEffect(() => {
        //第一次加载，发送配对请求
        if (typeof (actionUrl) !== "undefined" || ws.current !== null) {
            return
        }
        requestStartPairing()
    }, [])

    useEffect(() => {

        if (typeof actionUrl === "undefined" || ws.current !== null) {
            return
        }
        timeOut.current = setTimeout(() => {
            requestCancelPairing();
        }, timeout);

        let proto = 'ws';
        if (window.location.protocol === 'https:') {
            proto = 'wss';
        }
        const wsHref = window.location.origin.replace(/^http/, proto);
        const path = `${wsHref}/new_things?jwt=${API.jwt}`;
        console.log("new things websocket url", path)
        ws.current = new WebSocket(path);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");
        ws.current.onError = (e) => console.error(e)
        ws.current.onmessage = onMessage

        return () => {
            close()
        };
    }, [actionUrl]);


    function requestStartPairing() {
        API.startPairing(timeout)
            .then((json) => {
                console.log("href:", json.pair.href)
                setActionUrl(json.pair.href)
            })
            .catch((error) => {
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
        console.log("requestCancelPairing")
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
        let list = []
        if (event.data) {
            for (let [thing, index] of event.data) {
                list.push(thing)
            }
        }
        setNewThings(list)
    }

    const addThing = (thing) => {
        return API.addThing(thing)
    }

    return [newThings, addThing]
}

