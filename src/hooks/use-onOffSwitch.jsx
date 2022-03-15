import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";
import useProperty from "./useProperty";


export default function useOnOffSwitch(thing) {
    const onProperty = useProperty(thing, thing.onProperty)

    return {onProperty}
}