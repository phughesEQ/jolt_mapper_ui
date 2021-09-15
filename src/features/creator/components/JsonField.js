import React from "react";
import {useDispatch} from "react-redux";
import {Checkbox, makeStyles, MenuItem, TextField,} from "@material-ui/core";
import {updateInputTypeById, updateFieldById, updateValueById} from "../CreatorSlice";
import styled from "styled-components";
import schema from "../../resources/exampleJsonSchema.json"
import DropDown from "./DropDown";
import ConcatField from "./ConcatField";

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
  flex-wrap: wrap;
`

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(2),
    }
}));

const extractKeys = ({properties}) =>
    Object.keys(properties).reduce((acc, key) =>
        acc.concat(properties[key].type !== 'object' ? key : extractKeys(properties[key]).map(p => `${key}.${p}`)), []);

const options = extractKeys(schema)

const typeValues = [
    "Object",
    "String",
    "Date",
    "Number"
]

export default props => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {jsonElement} = props
    const {id, name, value, inputType, required, concat, value1, mappedValues} = jsonElement

    return <JsonBody>
        <StyledSection>
            <TextField key={`name-${id}`} type={"text"} label={"Name"} className={classes.input} value={name}
                       onChange={e => dispatch(updateFieldById({id, value: e.target.value, field: "name"}))}/>
            {inputType !== "Object" ? <StyledSection>
                <DropDown id={id} value={value} label={"Value"} onChange={updateValueById} field={"value"}
                          mappedValues={mappedValues}>
                    {options.map(x => <MenuItem key={x} value={x}>{x.substring(x.lastIndexOf(".") + 1)}</MenuItem>)}
                </DropDown>
                <ConcatField id={id} concat={concat} value={value1} options={options}/>
            </StyledSection> : ""}
        </StyledSection>
        <StyledSection>
            <DropDown id={id} value={inputType} label={"Input Type"} onChange={updateInputTypeById} field={"inputType"}>
                {typeValues.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
            </DropDown>
            <div> Required
                <Checkbox key={`check-${id}`} checked={required} className={classes.input}
                          onClick={() => dispatch(updateFieldById({id, value: !required, field: "required"}))}/>
            </div>
        </StyledSection>
    </JsonBody>
}
