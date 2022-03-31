import React, {useEffect, useState} from "react";
import constant, {Capability} from "src/js/constants";
import {gateway} from "../../main";
import {createThingFromCapability} from "src/schema-impl/capability/capabilities";


export default function useThing(description) {

    const [thing, setThing] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const thingDescription = await gateway.getThing(description?.id)
                const thingModel = await gateway.getThingModel(thingDescription?.id)
                if (!thingDescription || !thingModel) {
                    return
                }
                const t = createThingFromCapability(thingDescription.selectedCapability, thingModel, thingDescription, null)
                t.connected = false
                if (gateway.connectedThings.has(description.id)) {
                    t.connected = gateway.connectedThings.get(description.id)
                }
                setThing({...t})
            } catch (e) {
                console.error(e)
            }
        }

        fetchData().then()

    }, [])

    useEffect(() => {
        const onConnected = (connected) => {
            if (thing.connected !== connected) {
                setThing({...thing, connected: connected})
            }
        }
        if (thing) {
            thing.model?.subscribe(constant.CONNECTED, onConnected)
        }

        return () => {
            if (thing) {
                thing.model?.unsubscribe(constant.CONNECTED, onConnected)
            }
        }
    }, [thing])

    return thing
}