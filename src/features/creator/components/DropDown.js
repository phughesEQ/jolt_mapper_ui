import React from "react";
import {FormControl, InputLabel, makeStyles, Select, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {updateMappedValues} from "../CreatorSlice";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 167,
        paddingRight: theme.spacing(2)
    }
}));

export default props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {id, value, label, onChange, field, defaultV, mappedValues} = props

    return <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`${label}-native-simple-${id}`}>{label}</InputLabel>
        <Select
            key={`${label}-${id}`}
            value={value}
            onChange={e => dispatch(onChange({id, value: e.target.value, field}))}
            inputProps={{name: label, id: `${label}-native-simple-${id}`,}}
            defaultValue={defaultV}
        >
            {props.children}
        </Select>
        {
            (mappedValues) ? Object.keys(mappedValues).map(key =>
                <TextField key={`mapped-${key}-${id}`} type={"text"} label={key} value={mappedValues[key]}
                           onChange={e => dispatch(updateMappedValues({id, key, value: e.target.value}))}/>
            ) : ""
        }
    </FormControl>
}