import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


export default function NewThingCard(props) {
    let {thing} = props
    return (
        <Card sx={{height: "80",backgroundColor: "red"}}>
            <Typography>
                {props.thing.title}
            </Typography>
            <Typography>
                {thing.id}
            </Typography>
            <Typography>
               121312312312312312312312312312
            </Typography>
        </Card>
    )
}