import React from 'react';
import {useSelector} from 'react-redux';
import {
    selectJsonProperties, selectValues
} from "./CreatorSlice";
import {List} from "@material-ui/core";
import styled from 'styled-components'
import JsonElement from "./JsonElement";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`

export function Creator() {
    const fields = useSelector(selectJsonProperties);
    const values = useSelector(selectValues);

    return (
        <Container>
            <List>
                {fields.map(field => <JsonElement key={`element-${field.id}`} jsonElement={field} values={values}/>)}
            </List>
        </Container>
    );
}

