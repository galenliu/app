import {gateway} from "../App";
import {useEffect, useState} from "react";
import Constants from "../constants";


export function useThings() {
    const [things, SetThings] = useState(gateway.thingModels)
    useEffect(() => {
        const refreshThings = (things) => {
            SetThings(new Map(gateway.thingModels))
        }
        gateway.subscribe(Constants.REFRESH_THINGS, refreshThings, true)
        return () => {
            gateway.unsubscribe(Constants.REFRESH_THINGS, refreshThings)
        }
    }, [])

    return things
}