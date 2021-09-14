import React from "react";
import JsonElement from "./JsonElement";
import Buttons from "./components/Buttons";
import JsonField from "./components/JsonField";
import styled from "styled-components";
import {Divider, Typography} from "@material-ui/core";

const Element = styled.section`
  padding: ${props => props.type === "Object" ? 1 : 0}em;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: gray groove 1px;
`
const InputStyles = styled.section`
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

export default props => {
    const {jsonElement} = props
    const {id, name, value, inputType, required, properties, concat, value1} = jsonElement

    return <Element key={`list-${id}`} type={inputType}>
        <InputStyles>
            <JsonTitle>
                <Typography variant={inputType === "Object" ? "h5" : "h6"}>{name}</Typography>
                <Divider/>
            </JsonTitle>
        </InputStyles>

        <JsonField id={id} name={name} inputType={inputType} required={required} value={value} concat={concat} value2={value1}/>
        <Buttons id={id} type={inputType}/>
        {
            properties
                .map(child => <JsonElement jsonElement={child} key={`element-${child.id}`}/>)
        }
    </Element>
}
