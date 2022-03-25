import useProperty from "./useProperty";


export default function useIntegerProperty(thing, name) {
    if (!thing || !name) {
        return null
    }
    const {property, value, setValue} = useProperty(thing, name)

    function setProperty(value) {
        if (typeof value === "number") {
            setValue(value)
        }
    }
    return {...property, value, setValue: setProperty}
}