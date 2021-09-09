import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    createSchema,
    selectJsonProperties,
} from "./CreatorSlice";
import styled from 'styled-components'
import JsonElement from "./JsonElement";
import {Button, makeStyles} from "@material-ui/core";
import {Create} from "@material-ui/icons";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex: 1;
`
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3)
    }
}));

export function Creator() {
    const fields = useSelector(selectJsonProperties);
    const dispatch = useDispatch()
    const classes = useStyles();

    return (
        <Container>
            {fields.map(field => <JsonElement key={`element-${field.id}`} jsonElement={field}/>)}
            <Button
                variant="contained"
                startIcon={<Create/>}
                className={classes.button}
                onClick={() => dispatch(createSchema(fields))}
            > Create </Button>
        </Container>
    );
}
