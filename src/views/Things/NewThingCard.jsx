import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {InputLabel, MenuItem, NativeSelect, Select, Stack, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import enTrans from "../../i18n/en-us.json"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import ThingIcons from "../../images/thing-icons/thingIcons";
import {useState} from "react";

export default function NewThingCard(props) {
    const {t} = useTranslation();
    const [thing, setThing] = useState(props.thing)
    return (
        <Card sx={{width: "430px", backgroundColor: "primary.light"}}>
            <Stack direction={"row"}>
                <Stack width={"30%"} justifyContent={"center"} alignItems={"center"}>
                    <ThingIcons selected={thing.selectedCapability} sx={{fontSize: 60}}/>
                </Stack>
                <Stack width={"70%"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Stack spacing={1} direction={"column"} sx={{mt: 1, mb: 1}}>
                        <Box>
                            <TextField
                                required
                                id="standard-required"
                                label={t(enTrans.Title)}
                                defaultValue={thing.title}
                                onChange={(event => {
                                    setThing({...thing, title: event.target.value})
                                })}
                                variant="standard"/>
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                {t(enTrans.Capability)}*
                            </InputLabel>
                            <NativeSelect
                                defaultValue={thing["@type"][0]} onChange={(event) => {
                                setThing({...thing, selectedCapability: event.target.value})
                            }}
                                inputProps={{
                                    name: 'Capability',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                {
                                    thing["@type"].map((type, index) => {
                                        return <option value={type} key={index}>{t(type)}</option>
                                    })
                                }
                            </NativeSelect>
                        </FormControl>
                        <Button variant="contained" onClick={()=>{props.save(thing)}}>
                            {t(enTrans.Save)}
                        </Button>
                    </Stack>

                </Stack>
            </Stack>

        </Card>
    )
}