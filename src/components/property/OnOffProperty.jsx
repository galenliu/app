import {ListItem, ListItemText} from "@mui/material";
import enTrans from "../../i18n/en-us.json"
import {useTranslation} from "react-i18next";
import Switch from '@mui/material/Switch';
import useProperty from "../../hooks/useProperty";


export default function OnOffProperty(props) {
    const {t} = useTranslation()
    const {thing} = props
    const [value, set] = useProperty(thing)


    return (
        <ListItem>
            <ListItemText id="switch-list-label-wifi" primary={t(enTrans.Save)}/>
            <Switch
                edge="end"
                onChange={set(!value)}
                checked={value}
                inputProps={{
                    'aria-labelledby': 'switch-list-label-wifi',
                }}
            />
        </ListItem>
    )
}