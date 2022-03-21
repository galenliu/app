import React, {useEffect, useState} from "react";
import Constants from "../constants";
import {createThingFromCapability} from "../schema-impl/capability/capabilities";
import useThing from "./use-thing";


export default function useThings(gateway) {
    const [things, setThings] = useState([])

    const refreshThings = async (thingDescriptions, ground) => {
        try {
            let list = []
            if (things.size !== 0) {
                for (let [thingId, description] of thingDescriptions) {
                    let thingModel = gateway.getThingModel(thingId).then(((model) => {
                        let t = createThingFromCapability(description.selectedCapability, thingModel, description)
                        let thing = useThing(t)
                        if(thing){
                            list.push(list)
                        }
                    }))


                }
            }
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {

    }, [things])

    useEffect(() => {
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return [things]
}