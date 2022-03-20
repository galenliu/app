import React, {useEffect, useState} from "react";
import useOnOffSwitch from "./use-onOffSwitch";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {gateway} from "../App";
import constant from "../js/constant";


export default function useThing(thingId) {

    const [thing, setThing] = useState(null)

    useEffect(async () => {
        const description = await gateway.getThing(thingId)
        const thingModel = await gateway.getThingModel(thingId)
        let thing = createThingFromCapability(description.selectedCapability, thingModel, description, null)
        setThing({...thing, connected: thing.model.connected})

        const onDelete = (message) => {
            if (message.id === thing.id) {
                setThing(null)
            }
        }
        const onConnected = (connected) => {
            if (thing) {
                setThing({...thing, connected: connected})
            }
        }
        if (thing) {
            thing.model.subscribe(constant.CONNECTED, onConnected)
        }
        return () => {
            if (thing) {
                thing.model.unsubscribe(constant.CONNECTED, onConnected)
            }
        }

    }, [])

    const setProperty = async (name, value) => {
        await thing.model.setProperty(name, value)
    }

    return [thing]
}