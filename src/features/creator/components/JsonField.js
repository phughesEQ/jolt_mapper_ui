import React from "react";
import {useDispatch} from "react-redux";
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {
    updateConcatById,
    updateInputTypeById,
    updateNameById,
    updateRequiredById, updateValueById
} from "../CreatorSlice";
import styled from "styled-components";
import schema from "../../resources/exampleJsonStructure.json"
import {AddBox} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";


const JsonObjectStyle = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: ${props => props.type === "Object" ? 0 : 1}em;
  align-content: flex-start;
`

const JsonTitle = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 1em;
  padding-top: 0.5em;
`

const JsonBody = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`
const StyledSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 167,
        paddingRight: theme.spacing(2)
    },
    button: {
        maxHeight: 50,
        margin: theme.spacing(2)
    }
}));

// TODO: This function is a horrible abomination for parsing values. It's a temporary solution which doesn't work for arrays
// The arrays give a basic value and not the correct full parsing. This should read from schemas not json inputs but making do
// for innovation
const extractKeys = (obj, prefix = '') => Object.keys(obj)
    .reduce((res, key) => {
        if (Array.isArray(obj[key])) return [...res, ...extractKeys(obj[key], prefix + key + '.')];
        if (typeof obj[key] === 'object' && obj[key]) return [...res, ...extractKeys(obj[key], prefix + key + '.')];
        return [...res, prefix + key];
    }, []);

const everquoteValues = extractKeys(schema)

const typeValues = [
    "Object",
    "String",
    "Date",
    "Number"
]

export default props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {id, name, value, inputType, required, concat} = props

    return <JsonObjectStyle key={`contents-${id}`} type={inputType}>
        <JsonTitle>
            <Typography variant={inputType === "Object" ? "h5" : "h6"}>{name}</Typography>
            <Divider/>
        </JsonTitle>
        <JsonBody>
            <StyledSection>
                <TextField
                    key={`name-${id}`}
                    type={"text"} label={"Name"}
                    className={classes.input}
                    value={name}
                    onChange={e => dispatch(updateNameById({id, name: e.target.value}))}/>

                {inputType !== "Object" ? <StyledSection><FormControl className={classes.formControl}>
                    <InputLabel htmlFor={`value-native-simple-${id}`}>Value</InputLabel>
                    <Select
                        key={`value-${id}`}
                        id={`value-${id}`}
                        value={value}
                        onChange={e => dispatch(updateValueById({id, value: e.target.value}))}
                        inputProps={{
                            name: 'value',
                            id: `value-native-simple-${id}`,
                        }}
                    >
                        {everquoteValues.map(x => <MenuItem key={x}
                                                            value={x}>{x.substring(x.lastIndexOf(".") + 1)}</MenuItem>)}
                    </Select>
                </FormControl>
                    {concat ? <div><FormControl className={classes.formControl}>
                        <InputLabel htmlFor={`join-native-simple-${id}-1`}>Join By</InputLabel>
                        <Select
                            key={`join-${id}-1`}
                            id={`join-${id}-1`}
                            inputProps={{
                                name: 'join',
                                id: `join-native-simple-${id}-1`,
                            }}
                        >
                            <MenuItem value={" "}>Space</MenuItem>
                            <MenuItem value={"/"}>/</MenuItem>
                            <MenuItem value={"-"}>-</MenuItem>
                        </Select>
                    </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={`value-native-simple-${id}-1`}>Value</InputLabel>
                            <Select
                                key={`value-${id}-1`}
                                id={`value-${id}-1`}
                                value={value}
                                onChange={e => dispatch(updateValueById({id, value: e.target.value}))}
                                inputProps={{
                                    name: 'value',
                                    id: `value-native-simple-${id}-1`,
                                }}
                            >
                                {everquoteValues.map(x => <MenuItem key={x}
                                                                    value={x}>{x.substring(x.lastIndexOf(".") + 1)}</MenuItem>)}
                            </Select>
                        </FormControl></div> : ""}
                    {concat ? <Button
                        key={`add-${id}`}
                        color={"primary"}
                        variant="outlined"
                        className={classes.button}
                        onClick={() => dispatch(updateConcatById({id, concat: false}))}
                        startIcon={<DeleteIcon/>}
                    >remove value</Button> : <Button
                        key={`add-${id}`}
                        color={"primary"}
                        variant="outlined"
                        className={classes.button}
                        onClick={() => dispatch(updateConcatById({id, concat: true}))}
                        startIcon={<AddBox/>}
                    >add value</Button>}

                </StyledSection> : ""}
            </StyledSection>
            <StyledSection>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor={`input-native-simple-${id}`}>Input Type</InputLabel>
                    <Select
                        key={`input-${id}`}
                        id={`input-${id}`}
                        value={inputType}
                        onChange={e => dispatch(updateInputTypeById({id, type: e.target.value}))}
                        inputProps={{
                            name: 'input',
                            id: `input-native-simple-${id}`,
                        }}
                    >
                        {typeValues.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>

                <div>
                    Required <Checkbox key={`check-${id}`}
                                       checked={required}
                                       onClick={() => dispatch(updateRequiredById({id, required: !required}))}
                                       className={classes.input}
                />
                </div>
            </StyledSection>
        </JsonBody>
    </JsonObjectStyle>
}
