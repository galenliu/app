import React, {createRef, useEffect, useState} from "react"
import ReopeningWebSocket from "../models_old/reopening-web-socket";
import API from "../js/api";


export function UseGateway() {

    const [thingModels, setThingModels] = useState(new Map())
    const [things, setThings] = useState(new Map())
    const [connected, setConnected] = useState(false)

    const ws = createRef()

    useEffect(() => {

    }, [things])

    useEffect(() => {
        console.log("use gateway create")
        connectWebSocket()
    }, [])


    function connectWebSocket() {
        try {
            const thingsHref = `${window.location.origin}/things`;
            const wsHref = thingsHref.replace(/^http/, 'ws');
            console.log("wsHref url: ",wsHref)
            console.log("thingsHref: ",thingsHref)
            ws.current =new ReopeningWebSocket(wsHref)
            ws.current.addEventListener('open', refreshThings);
            ws.current.addEventListener('message', onMessage);
        } catch (e) {
            console.log("app websocket err: ", e)
        }
    }

    function onMessage(event) {
        const message = JSON.parse(event.data);
        switch (message.messageType) {
            case 'connected':
                this.connectedThings.set(message.id, message.data);
                break;
            case 'thingAdded':
                this.refreshThings();
                break;
            case 'thingModified':
                refreshThing(message.id);
                break;
            case 'groupAdded':
            case 'groupModified':
            case 'groupRemoved':
            case 'layoutModified':
                this.refreshThings();
                break;
            default:
                break;
        }
    }

    function refreshThings() {
        API.getThings().then((things) => {
            if (things == null) {
                throw new Error("things null")
            }
            const map = new Map()
            things.forEach((description) => {
                const thingId = decodeURIComponent(description.id.split('/').pop());
                map.set(thingId, description);
            });
            setThings(map)
        }).catch((e) => {
            console.error(`Get things failed ${e}`);
            this.things = new Map()
        })
    }


    function refreshThing(thingId) {

    }

    return [thingModels, connected]
}