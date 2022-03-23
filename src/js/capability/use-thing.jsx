import {useEffect, useState} from "react";
import {Capability,Constants} from "../constant";
import useLight from "./use-light";
import {use} from "i18next";


export default function useThing(description) {
    const [connected, setConnected] = useState(false)
    const [thing,setThing]= useState()
    const title = description.title
    const id = description.id
    const groupId = description.groupId

    function onConnected(connected) {
        setConnected(connected)
    }

    useEffect(() => {
        if(description.selectedCapability === Capability.Light){
            const {thing}=useLight(description)
            setThing(thing)
        }
        thing.model.subscribe(Constants.CONNECTED, onConnected)
    }, [])

    return {connected, title, id,groupId}
}