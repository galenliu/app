import {useEffect, useRef, useState} from "react";
import API from "src/js/api"
import {Status} from "src/views/Things/NewThings"

export default function useAddThings(timeout) {

    const [actionUrl, setActionUrl] = useState()
    const ws = useRef(null)
    const timeOut = useRef(null)
    const [state, setState] = useState(Status[0])

    const [thingMaps, setThingMaps] = useState(new Map())

    const updateMap = (k, v) => {
        setThingMaps(thingMaps.set(k, v));
    }


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

        function onMessage(event) {
            console.log("onMessage!!!:", event.data)
            if (event.data) {
                const thing = JSON.parse(event.data)
                updateMap(thing.id, thing)
            }
        }

        const onErr = (e) => {
            setState(Status[1])
            console.log(e)
        }
        const wsHref = window.location.origin.replace(/^http/, proto);
        const path = `${wsHref}/new_things?jwt=${API.jwt}`;
        //const path = `${wsHref}/new_things`;
        console.log("new things websocket url", path)
        ws.current = new WebSocket(path);
        ws.current.addEventListener("message", onMessage)
        ws.current.addEventListener("error", onErr)


        return () => {
            ws.current.removeEventListener("error", onErr)
            ws.current.removeEventListener("message", onMessage)
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


    const addThing = (thing) => {
        console.log("add thing:", thing)
        return API.addThing(thing).then(() => {
            let copy = new Map(thingMaps)
            console.log("add thing copy:", copy)
            copy.delete(thing.id)
            console.log("add thing copy1:", copy)
            setThingMaps(copy)
        })
    }

    return [thingMaps, state, addThing]
}

