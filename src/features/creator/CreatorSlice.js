import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import schema from "../resources/exampleJsonStructure.json"

const createJsonElement = id => {
    return {
        id: id,
        name: "",
        value: "",
        inputType: "String",
        required: false,
        properties: []
    }
}

// TODO: This function is a horrible abomination for parsing values. It's a temporary solution which doesn't work for arrays
// The arrays give a basic value and not the correct full parsing. This should read from schemas not json inputs but making do
// for innovation
const extractKeys = (obj, prefix = '') => Object.keys(obj)
    .reduce((res, key) => {
        if (Array.isArray(obj[key])) return [...res, ...extractKeys(obj[key], prefix + key + '.')];
        if (typeof obj[key] === 'object' && obj[key]) return [...res, ...extractKeys(obj[key], prefix + key + '.')];
        return [...res, prefix + key];
    }, []);

const initialState = {
    jobCode: "",
    inputValues: extractKeys(schema),
    jsonProperties: [createJsonElement(uuidv4())]
};

export const creatorSlice = createSlice({
    name: 'creator',
    initialState,
    reducers: {
        addJsonProperty: (state, action) => {
            state.jsonProperties = addFieldById(state.jsonProperties, action.payload.parentId, action.payload.id)
        },
        removeJsonProperty: (state, action) => {
            state.jsonProperties = removeFieldById(state.jsonProperties, action.payload)
        },
        addNestedJsonPropertyById: (state, action) => {
            state.jsonProperties = addChildFieldById(state.jsonProperties, action.payload.parentId, action.payload.id)
        },
        updateNameById: (state, action) => {
            const name = (property, action) => {
                return {...property, name: action.payload.name}
            }
            state.jsonProperties = state.jsonProperties.map(property => updateFieldById(property, action, name))
        },
        updateInputTypeById: (state, action) => {
            const type = (property, action) => {
                return {...property, inputType: action.payload.type}
            }
            state.jsonProperties = state.jsonProperties.map(property => updateFieldById(property, action, type))
        },
        updateRequiredById: (state, action) => {
            const required = (property, action) => {
                return {...property, required: action.payload.required}
            }
            state.jsonProperties = state.jsonProperties.map(property => updateFieldById(property, action, required))
        },
        updateValueById: (state, action) => {
            const value = (property, action) => {
                return {...property, value: action.payload.value}
            }
            state.jsonProperties = state.jsonProperties.map(property => updateFieldById(property, action, value))
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
        return field.id === parentId ? {...field, inputType: "Object", properties: [...field.properties, createJsonElement(id)]}
            : {...field, properties: addChildFieldById(field.properties, parentId, id)};
    })
}

const removeFieldById = (fields, id) => {
    const filtered = fields.filter(field => field.id !== id)
    return filtered.map(field => {
        return {...field, properties: removeFieldById(field.properties, id)}
    })
}

const updateFieldById = (field, action, updateMethod) => {
    if (field.id === action.payload.id) return updateMethod(field, action)
    return {...field, properties: field.properties.map(child => updateFieldById(child, action, updateMethod))}
}

export const selectJsonProperties = (state) => state.creator.jsonProperties;
export const selectValues = (state) => state.creator.inputValues;

export const {
    addJsonProperty,
    updateRequiredById,
    updateNameById,
    removeJsonProperty,
    addNestedJsonPropertyById,
    updateValueById
} = creatorSlice.actions;

export default creatorSlice.reducer;
