import React from "react";
import {useDispatch} from "react-redux";
import {Button, makeStyles} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {addJsonProperty, addNestedJsonPropertyById, removeJsonProperty} from "../CreatorSlice";
import {v4 as uuidv4} from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}));

const JsonButtons = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: ${props => props.type === "Object" ? 0 : 5}em;
  flex-wrap: wrap;
`

export default props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {id, type} = props

    return <JsonButtons type={type}>
        {type === "Object" ? <Button
            key={`add-${id}`}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddBox/>}
            onClick={() => dispatch(addJsonProperty({parentId: id, id: uuidv4()}))}
        > Add Field </Button> : ""}
        <Button
            key={`add-nested-${id}`}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddBox/>}
            onClick={() => dispatch(addNestedJsonPropertyById({parentId: id, id: uuidv4()}))}
        > Add Nested Field </Button>
        <Button
            key={`delete-${id}`}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon/>}
            onClick={() => dispatch(removeJsonProperty(id))}
        > Delete </Button>
    </JsonButtons>
}