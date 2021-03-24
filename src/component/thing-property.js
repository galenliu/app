import React from "react";
import {ListItem, ListItemIcon, ListItemText, Slider} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";


export const useStyles = makeStyles((theme) => ({

}));


export function BooleanPropertyListItem(props) {

    const {t} = useTranslation();

    return (
        <ListItem style={{width: "100%"}}>
            <ListItemText primary={t(props.label)}/>
            <ListItemIcon edg="end">
                <Switch  disabled={props.disabled} checked={props.state} onClick={props.action}/>
            </ListItemIcon>
        </ListItem>
    )
}

export function NumberPropertyListItem(props) {

    const {t} = useTranslation();

    return (
        <>
            <ListItem style={{width: "100%"}}>
                <ListItemText primary={t(props.label)}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon edg="end">
                    <Slider disabled={props.disabled} value={props.state} onChange={props.action}
                            aria-labelledby="continuous-slider"/>
                </ListItemIcon>
            </ListItem>
        </>
    )
}

export function StringPropertyItem(props) {

    const {t} = useTranslation();

    return (
        <>
            <ListItem style={{width: "100%"}}>
                <ListItemText primary={t(props.label)}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon edg="end">
                    <Slider disabled={props.disable} value={props.state} onChange={props.action}
                            aria-labelledby="continuous-slider"/>
                </ListItemIcon>
            </ListItem>
        </>
    )
}