import {styled} from "@mui/material/styles";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import * as React from "react";
import ThingTitle from "src/static/images/thing-title";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import CheckIcon from '@mui/icons-material/Check';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, BottomNavigation, BottomNavigationAction, FormControlLabel,
    ListItemText, Radio, RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import enTrans from "src/js/i18n/en-us.json"
import {useTranslation} from "react-i18next";
import ThingIcons from "src/static/images/thing-icons/thingIcons";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import {gateway} from "../../main";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {fontSize} from "@material-ui/system";

export const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


export const ThingDialog = (props) => {
    const {children, onClose, open, thing, ...other} = props;
    const [value, setValue] = React.useState('control');
    const [expanded, setExpanded] = React.useState("")
    const [titleUpdate, updateTitle] = useState(thing.title)
    const {t} = useTranslation()


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        updateTitle(thing.title);
    }, [props])


    const readerThingTypes = () => {
        const list = []
        for (const th of thing["@type"] || []) {
            list.push(
                <AccordionDetails key={th} sx={{edge: "end"}}>
                    <FormControlLabel value={th} control={<Radio/>} label={t(th)}/>
                </AccordionDetails>)

        }
        return (
            <FormControl>
                <RadioGroup
                    onClick={() => setExpanded("")}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={thing.selectedCapability}
                    onChange={(event) => {
                        gateway.updateThing(thing.id, {title: thing.title, selectedCapability: event.target.value})
                    }}
                >
                    {list}
                </RadioGroup>

            </FormControl>)
    }


    return (
        <BootstrapDialog
            onClose={() => close()}
            aria-labelledby="customized-dialog-title"
            open={open}
            sx={{}}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                <ThingTitle title={thing.title}/>
                <Typography variant="body2">
                    {thing.group_id}
                </Typography>
            </BootstrapDialogTitle>

            <TabContext value={value}>
                <TabPanel value="control"> <Stack spacing={1} sx={{
                    borderRadius: "3px",
                    p: 1,
                    width: 500,
                    minWidth: 100
                }}>{children} </Stack></TabPanel>
                <TabPanel value="setting">
                    <Stack>
                        <Divider/>
                        <Stack sx={{
                            m: 2,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <ThingIcons selected={thing.selectedCapability}/>
                            <Stack sx={{flexDirection: "row", alignItems: "center"}}>
                                <TextField edge={"end"} defaultValue={thing.title} id="standard-basic"
                                           label={t(enTrans.Title)}
                                           variant="standard" onChange={(event) => {
                                    updateTitle(event.target.value)
                                }}/>
                                {thing.title !== titleUpdate &&
                                    <CheckCircleOutlinedIcon sx={{fontSize: 30}} onClick={() => {
                                        gateway.updateThing(thing.id, {
                                            title: titleUpdate,
                                            selectedCapability: thing.selectedCapability
                                        })
                                    }}/>}
                            </Stack>
                        </Stack>
                        <Accordion expanded={expanded === 'displayed'}
                                   onChange={() => setExpanded(expanded === "displayed" ? '' : "displayed")}>
                            <AccordionSummary
                                id="panel2a-header"
                            >
                                <ListItemText>
                                    {t(enTrans.Displayed)}
                                </ListItemText>
                                <Typography sx={{color: "info.light"}}>
                                    {t(thing.selectedCapability)}</Typography>
                            </AccordionSummary>

                            {
                                readerThingTypes()
                            }

                        </Accordion>
                        <Button sx={{mt: 2, backgroundColor: "warning.main"}} disableElevation
                                onClick={() => {
                                    gateway.removeThing(thing.id).catch((e) => {
                                        console.error(e)
                                    })
                                }}>
                            {t(enTrans.remove)}
                        </Button>

                    </Stack>
                </TabPanel>

                <BottomNavigation sx={{width: 500}} value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        label={t(enTrans.Control)}
                        value="control"
                        icon={<TuneIcon/>}
                    />
                    <BottomNavigationAction
                        label={t(enTrans.Settings)}
                        value="setting"
                        icon={<SettingsIcon/>}
                    />
                </BottomNavigation>

            </TabContext>


        </BootstrapDialog>
    )
}
