import React from "react";
import DropDown from "./DropDown";
import {updateFieldById} from "../CreatorSlice";
import {Button, makeStyles, MenuItem} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {AddBox} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    button: {
        maxHeight: 50,
        margin: theme.spacing(2)
    }
}));

const StyledSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export default props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {id, concat, value, options} = props

    if (!concat) return <Button
        key={`add-${id}`}
        color={"primary"}
        variant="outlined"
        className={classes.button}
        onClick={() => dispatch(updateFieldById({id, value: true, field: "concat"}))}
        startIcon={<AddBox/>}
    >add value</Button>

    return <StyledSection>
        <DropDown id={id} label={"Join By"} onChange={updateFieldById} field={"delimiter"} defaultV={" "}>
            <MenuItem value={" "}>Space</MenuItem>
            <MenuItem value={"/"}>/</MenuItem>
            <MenuItem value={"-"}>-</MenuItem>
        </DropDown>
        <DropDown id={id} value={value} label={"Value"} onChange={updateFieldById} field={"value1"}>
            {options.map(x => <MenuItem key={x} value={x}>{x.substring(x.lastIndexOf(".") + 1)}</MenuItem>)}
        </DropDown>
        <Button key={`remove-${id}`} color={"primary"} variant="outlined" className={classes.button}
                onClick={() => dispatch(updateFieldById({id, value: false, field: "concat"}))}
                startIcon={<DeleteIcon/>}>
            remove value
        </Button>
    </StyledSection>

}