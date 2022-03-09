import {useParams} from "react-router-dom";
import {gateway} from "../../App"


export default function Thing(){
    const params = useParams()
    const thing = gateway.getThingModel()

    return(
        <></>
    )

}