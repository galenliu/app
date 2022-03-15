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
        setThing(createThingFromCapability(description.selectedCapability, thingModel, description, null))

        const onDelete = (message) => {
            if (message.id === thing.id) {
                setThing(null)
            }
        }

        gateway.subscribe(constant.DELETE_THING, onDelete)

    }, [])

    const setProperty = async (name, value) => {
        await thing.model.setProperty(name, value)
    }

    return [thing, setProperty]
}