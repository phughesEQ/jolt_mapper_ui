import React from "react";
import {useDispatch} from "react-redux";
import {Button, Checkbox, ListItem, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import {
    addJsonProperty,
    addNestedJsonPropertyById,
    removeJsonProperty,
    updateNameById,
    updateRequiredById, updateValueById
} from "./CreatorSlice";
import {AddBox} from "@material-ui/icons";
import {v4 as uuidv4} from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import JsonElement from "./JsonElement";

const JsonContents = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

const JsonButtons = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}));

export default props => {
    const {jsonElement, values} = props
    const {id, name, value, inputType, required, properties} = jsonElement
    const dispatch = useDispatch();
    const classes = useStyles();

    return <div key={`div-${id}`}>
        <ListItem key={`list-${id}`}>
            <JsonContents key={`contents-${id}`}>
                <TextField
                    key={`name-${id}`}
                    type={"text"} label={"name"}
                    value={name}
                    onChange={e => dispatch(updateNameById({id, name: e.target.value}))}/>
                <TextField key={`input-${id}`} type={"text"} label={"input"} value={inputType}/>
                <div>
                    Required <Checkbox key={`check-${id}`}
                                       checked={required}
                                       onClick={() => dispatch(updateRequiredById({id, required: !required}))}/>
                </div>
                <Select
                    key={`value-${id}`}
                    id={`value-${id}`}
                    value={value}
                    onChange={e => dispatch(updateValueById({id, value: e.target.value}))}
                >
                    {values.map(x => <MenuItem key={x} value={x}>{x.substring(x.lastIndexOf(".") + 1)}</MenuItem>)}
                </Select>
            </JsonContents>
            <JsonButtons>
                <Button
                    key={`add-${id}`}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddBox/>}
                    onClick={() => dispatch(addJsonProperty({parentId: id, id: uuidv4()}))}
                > Add </Button>
                <Button
                    key={`add-nested-${id}`}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddBox/>}
                    onClick={() => dispatch(addNestedJsonPropertyById({parentId: id, id: uuidv4()}))}
                > Add Nested </Button>
                <Button
                    key={`delete-${id}`}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon/>}
                    onClick={() => dispatch(removeJsonProperty(id))}
                > Delete </Button>
            </JsonButtons>
        </ListItem>
        {properties.map(child => <JsonElement jsonElement={child} key={`element-${child.id}`} values={values}/>)}
    </div>
}
