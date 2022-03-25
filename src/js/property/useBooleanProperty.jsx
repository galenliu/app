import useProperty from "./useProperty";


export default function  useBooleanProperty(thing,name){
    if(!thing || !name){
        return null
    }
    const {property,value,setValue} = useProperty(thing,name)

    function setProperty(value){
        // if(typeof value === "boolean"){
            setValue(value)
        // }
    }

    return {...property,value,setValue:setProperty}
}