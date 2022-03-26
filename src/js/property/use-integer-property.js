import useProperty from "./use-property";


export default function useIntegerProperty(thing, name) {

    const {property, value, setValue} = useProperty(thing, name)

    function setProperty(value) {
        if (typeof value === "number") {
            setValue(value)
        }
    }
    return {property, value, setValue: setProperty}
}