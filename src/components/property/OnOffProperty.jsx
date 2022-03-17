import {Fab, ListItem, ListItemText, Stack, SvgIcon} from "@mui/material";
import enTrans from "../../i18n/en-us.json"
import {useTranslation} from "react-i18next";
import Switch from '@mui/material/Switch';
import {useEffect} from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {borderRadius, spacing} from "@material-ui/system";
import {Path} from "../../js/menuList";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";


export default function OnOffProperty(props) {
    const {t} = useTranslation()
    const {property} = props

    useEffect(() => {
        console.log("onOffProperty data:", property)
    })

    return (
        <Card sx={{borderRadius: "30px", backgroundColor: [property.value ? "background.on" : "background.off"]}}>
            <Stack direction={"row"} sx={{mt: "20px", mb: "20px"}}>
                <Stack direction={"row"} sx={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{width: "20%"}}
                                variant="h5">{property.value ? t(enTrans.On) : t(enTrans.Off)}</Typography>
                </Stack>
                <Stack width="80%" mr={"20px"} direction={"row"} justifyContent={"flex-end"}>
                    <IconButton
                        variant="contained"
                        size="large"
                        onClick={() => property.setValue(!property.value)}
                        sx={{color: [property.value ? "icon.on" : "icon.off"]}}
                    >
                        <PowerIcon sx={{color: [property.value ? "primary.on" : "primary.off"]}}/>
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    )
}

export function PowerIcon(props) {
    return (
        <SvgIcon {...props}>
            <svg t="1646723432976" className="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="3191">
                <path
                    d="M835.555993 242.866051l-0.011087 0.011087c-4.649355-4.641292-11.067541-7.512745-18.157983-7.512745-14.193988 0-25.700964 11.506977-25.700964 25.700964 0 7.277908 3.030698 13.844253 7.891708 18.520821 73.286048 73.473514 118.597353 174.862307 118.597353 286.835866 0 224.324065-181.851962 406.176027-406.176027 406.176027s-406.176027-181.851962-406.176027-406.176027c0-111.868739 45.22765-213.170855 118.391745-286.628243 4.956759-4.684631 8.053977-11.316487 8.053977-18.675026 0-14.193988-11.506977-25.700964-25.700964-25.700964-7.065246 0-13.462266 2.852303-18.108597 7.465374l-0.017134-0.017134C105.637515 325.670527 54.422044 440.065016 54.422044 566.422044c0 252.713048 204.864908 457.577956 457.577956 457.577956s457.577956-204.864908 457.577956-457.577956C969.577956 440.065016 918.361477 325.670527 835.555993 242.866051z"
                    p-id="3192"></path>
                <path
                    d="M511.49606 449.643917l1.007881 0c13.915812 0 25.197024-11.281212 25.197024-25.197024L537.700964 41.316064c0-13.915812-11.281212-25.197024-25.197024-25.197024l-1.007881 0c-13.915812 0-25.197024 11.281212-25.197024 25.197024l0 383.130829C486.299036 438.362705 497.580247 449.643917 511.49606 449.643917z"
                    p-id="3193"></path>
            </svg>
        </SvgIcon>
    );
}
