import React, {useEffect, useState} from "react";
import constant, {Capability} from "src/js/constants";
import {gateway} from "../../App";
import {createThingFromCapability} from "src/schema-impl/capability/capabilities";


export default function useThing(description) {

    const [thing, setThing] = useState({})

    useEffect(() => {
        console.log("use Thing:", thing)
    }, [thing])

    useEffect(async () => {
        if (!description) {
            return Promise.reject("description null")
        }
        try {
            const thingDescription = await gateway.getThing(description?.id)
            const thingModel = await gateway.getThingModel(thingDescription?.id)
            if (!thingDescription || !thingModel) {
                return
            }
            const thing = createThingFromCapability(thingDescription.selectedCapability, thingModel, thingDescription, null)
            thing.connected = gateway.connectedThings.has(description.id)
            setThing({...thing})
        } catch (e) {
            return Promise.reject(e)
        }

        const onConnected = (connected) => {
            if (thing) {
                setThing({...thing, connected: connected})
            }
        }
        if (thing?.model) {
            thing.model.subscribe(constant.CONNECTED, onConnected)
        }

        return () => {
            if (thing?.model) {
                thing.model?.unsubscribe(constant.CONNECTED, onConnected)
            }
        }
    }, [description])
    return thing
}