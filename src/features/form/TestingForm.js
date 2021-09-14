import React from 'react';
import styled from 'styled-components'
import Form from '@rjsf/material-ui';
import schema from "../resources/exampleJsonSchema.json"

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`

export function TestingForm() {
    return (
        <Container>
            <Form schema={schema}/>
        </Container>
    );
}
