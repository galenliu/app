import {useState} from "react";
import useProperty from "./useProperty";


export default function useStringProperty(){
    const [value,setValue]=useState(useProperty)

}