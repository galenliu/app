import {ListItem, ListItemText} from "@mui/material";
import enTrans from "../../i18n/en-us.json"
import {useTranslation} from "react-i18next";
import Switch from '@mui/material/Switch';
import {useEffect} from "react";


export default function OnOffProperty(props) {
    const {t} = useTranslation()

    return (
        <ListItem sx={{borderStyle: "solid"}}>
            <ListItemText  primary={props.value? t(enTrans.On): t(enTrans.Off)}/>
            <Switch
                onChange={()=>{props.setOn()}}
                checked={props.value? props.value:false}
                edge="end"
            />
        </ListItem>
    )
}