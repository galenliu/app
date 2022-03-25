import {useEffect, useState} from "react";
import constant, {Capability, Constants} from "../constant";
import {use} from "i18next";
import {gateway} from "../../App";
import {createThingFromCapability} from "../../schema-impl/capability/capabilities";


export default function useThing(description) {

    if (description === undefined || description === null) {
        return
    }
    const [thing, setThing] = useState({})
    const title = description?.title
    const id = description?.id
    const groupId = description?.groupId

    useEffect(() => {

    }, [thing])

    useEffect(async () => {
        if (!description?.id || !description.selectedCapability) {
            console.log("description error:", description)
            return Promise.reject("error")
        }
        const thingDescription = await gateway.getThing(description.id)
        const thingModel = await gateway.getThingModel(thingDescription.id)
        if (!thingDescription || !thingModel) {
            return
        }
        let t = createThingFromCapability(thingDescription.selectedCapability, thingModel, thingDescription, null)
        setThing({...t, connected: gateway.connectedThings.has(description.id)})

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
        if (thing.model) {
            thing.model.subscribe(constant.CONNECTED, onConnected)
        }

        return () => {
            if (thing.model) {
                thing.model.unsubscribe(constant.CONNECTED, onConnected)
            }
        }

    }, [])

    return {...thing, id: id, title: title, groupId: groupId}
}