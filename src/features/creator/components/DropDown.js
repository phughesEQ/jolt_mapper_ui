import React from "react";
import {FormControl, InputLabel, makeStyles, Select} from "@material-ui/core";
import {useDispatch} from "react-redux";

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
    const {id, value, label, onChange, field, defaultV} = props

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
    </FormControl>
}