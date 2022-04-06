import Typography from "@mui/material/Typography";


//每一张卡片的Title
export function PropertyCardTitle(props) {
    const {children, ...other} = props;
    return <Typography {...other} variant="subtitle2"  sx={{color:"info.main"}}>
        {children}
    </Typography>

}

//每一张卡片的状态
export function PropertyCardState(props) {
    const {children, ...other} = props;
    return <Typography variant="h6" {...other}>
        {children}
    </Typography>
}