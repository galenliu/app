import {useEffect, useState} from "react";
import Constants from "../../src/js/constant";
import useProperty from "./useProperty";
import useThing from "./use-thing";


export default function useOnOffSwitch({description}) {
    const {thing}=useThing(description={description})
    const onProperty = useProperty(thing, thing?.onProperty)

    return {thing,onProperty}
}