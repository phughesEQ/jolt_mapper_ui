import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const createJsonElement = id => {
    return {
        id: id, name: "Name", value: "", value1: "", delimiter: " ", inputType: "String", concat: false,
        required: false, properties: []
    }
}

const initialState = {
    jobCode: "",
    jsonProperties: [createJsonElement(uuidv4())],
    jsonSchema: {}
};

export const creatorSlice = createSlice({
    name: 'creator',
    initialState,
    reducers: {
        addJsonProperty: (state, action) => {
            state.jsonProperties = addFieldById(state.jsonProperties, action.payload.parentId, action.payload.id)
        },
        addNestedJsonPropertyById: (state, action) => {
            state.jsonProperties = addChildFieldById(state.jsonProperties, action.payload.parentId, action.payload.id)
        },
        removeJsonProperty: (state, action) => {
            state.jsonProperties = removeFieldById(state.jsonProperties, action.payload)
        },
        updateFieldById: (state, action) => {
            const field = (property, action) => {
                property[action.payload.field] = action.payload.value
                return property
            }
            state.jsonProperties = state.jsonProperties.map(property => updateField(property, action, field))
        },
        updateInputTypeById: (state, action) => {
            const field = (property, action) => {
                if (property.inputType === "Object" && property.properties.length >= 1) return property
                property[action.payload.field] = action.payload.value
                return {...property, concat: false}
            }
            state.jsonProperties = state.jsonProperties.map(property => updateField(property, action, field))
        },
        createSchema: (state, action) => {
            state.jsonSchema = {
                type: "object",
                properties: convertFieldToSchema(action.payload)
            }
        }
    }
});

const addFieldById = (fields, parentId, id) => {
    const newFields = []

    fields.forEach(field => {
        if (field.id === parentId) {
            newFields.push(field)
            newFields.push(createJsonElement(id))
        } else newFields.push({
            ...field,
            properties: addFieldById(field.properties, parentId, id)
        })
    })

    return newFields
}

const addChildFieldById = (fields, parentId, id) => {
    return fields.map(field => {
        return field.id === parentId ? {
                ...field,
                inputType: "Object",
                value: "",
                properties: [...field.properties, createJsonElement(id)]
            }
            : {...field, properties: addChildFieldById(field.properties, parentId, id)};
    })
}

function convertFieldToSchema(fields) {
    return fields.reduce((result, field) => ({
        ...result,
        [field.name]: {
            type: field.inputType.toLowerCase(),
            required: field.required,
            ...(field.inputType !== "Object") && {
                value: field.value,
                ...(field.concat) && {isConcat: field.concat, value: [field.value, field.value1, field.delimiter]},
            },
            ...(field.properties.length >= 1) && {properties: convertFieldToSchema(field.properties)}
        }
    }), {})
}

const removeFieldById = (fields, id) => {
    const filtered = fields.filter(field => field.id !== id)
    return filtered.map(field => {
        return {...field, properties: removeFieldById(field.properties, id)}
    })
}

const updateField = (field, action, updateMethod) => {
    if (field.id === action.payload.id) return updateMethod(field, action)
    return {...field, properties: field.properties.map(child => updateField(child, action, updateMethod))}
}

export const selectJsonProperties = (state) => state.creator.jsonProperties;

export const {
    addJsonProperty,
    addNestedJsonPropertyById,
    createSchema,
    removeJsonProperty,
    updateInputTypeById,
    updateFieldById
} = creatorSlice.actions;

export default creatorSlice.reducer;
