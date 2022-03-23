import React, {useEffect, useState} from "react";
import useOnOffSwitch from "./use-onOffSwitch";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import {gateway} from "../App";
import constant from "../js/constant";


export default function useThing(thingDescription) {

    const [thing, setThing] = useState(null)

    useEffect(async () => {
        const description = await gateway.getThing(thingDescription.id)
        const thingModel = await gateway.getThingModel(thingDescription.id)
        let thing = createThingFromCapability(thingDescription.selectedCapability, thingModel, description, null)
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