import React from "react";
import JsonElement from "./JsonElement";
import Buttons from "./components/Buttons";
import JsonField from "./components/JsonField";
import styled from "styled-components";

const Element = styled.section`
  padding: ${props => props.type === "Object" ? 1 : 0}em;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: gray groove 1px;
`

export default props => {
    const {jsonElement} = props
    const {id, name, value, inputType, required, properties, concat} = jsonElement

    return <Element key={`list-${id}`} type={inputType}>
        <JsonField id={id} name={name} inputType={inputType} required={required} value={value} concat={concat}/>
        <Buttons id={id} type={inputType}/>
        {
            properties
                .map(child => <JsonElement jsonElement={child} key={`element-${child.id}`}/>)
        }
    </Element>
}
