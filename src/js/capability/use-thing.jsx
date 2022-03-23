import {useEffect, useState} from "react";
import {Constants} from "../constant";


export default function useThing(thing) {
    const [connected, setConnected] = useState(false)
    const title = thing.title
    const id = thing.id
    const groupId = thing.groupId

    function onConnected(connected) {
        setConnected(connected)
    }

    useEffect(() => {
        thing.model.subscribe(Constants.CONNECTED, onConnected)
    }, [])

    return {connected, title, id,groupId}
}