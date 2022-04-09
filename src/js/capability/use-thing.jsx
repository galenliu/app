import React, {useEffect, useState} from "react";
import constant from "src/js/constants";
import {gateway} from "../../main";
import {createThingFromCapability} from "src/schema-impl/capability/capabilities";
import ThingModel from "../../models/thing-model";
import Constants from "src/js/constants";


export default function useThing(description) {

    const [connected, setConnected] = useState(false)

    const thingModel = new ThingModel(description, gateway.ws, gateway.properties.get(description.id))

    useEffect(() => {
        if (gateway.connectedThings.has(description.id)) {
            setConnected(gateway.connectedThings.get(description.id));
        } else {
            setConnected(false)
        }

        const onConnected = (connected) => {
            setConnected(!!connected)
        }

        thingModel.subscribe(Constants.CONNECTED, onConnected)

        return () => {
            thingModel.unsubscribe(Constants.CONNECTED, onConnected)
        }

    }, [description])

    return {thingModel, connected}
}