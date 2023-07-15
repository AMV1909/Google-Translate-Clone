import { useReducer } from "react";

import { AUTO_LANGUAGE } from "../Constants";
import {
    type Action,
    type FromLanguage,
    type Language,
    type State,
} from "../types";

const initialState = {
    fromLanguage: "auto",
    toLanguage: "en",
    fromText: "",
    result: "",
    loading: false,
};

function reducer(state: State, action: Action) {
    const { type } = action;
    const loading = state.fromText !== "";

    switch (type) {
        case "INTERCHANGE_LANGUAGES":
            if (state.fromLanguage === AUTO_LANGUAGE) return state;

            return {
                ...state,
                fromLanguage: state.toLanguage,
                toLanguage: state.fromLanguage,
                loading,
                fromText: state.result,
                result: "",
            };

        case "SET_FROM_LANGUAGE":
            if (state.fromLanguage === action.payload) return state;

            return {
                ...state,
                fromLanguage: action.payload,
                result: "",
                loading,
            };

        case "SET_TO_LANGUAGE":
            if (state.toLanguage === action.payload) return state;

            return {
                ...state,
                toLanguage: action.payload,
                result: "",
                loading,
            };

        case "SET_FROM_TEXT":
            return {
                ...state,
                loading: action.payload !== "",
                fromText: action.payload,
                result: "",
            };

        case "SET_RESULT":
            return {
                ...state,
                loading: false,
                result: action.payload,
            };

        default:
            return state;
    }
}

export function useStore() {
    const [{ fromLanguage, fromText, loading, result, toLanguage }, dispatch] =
        useReducer(reducer, initialState);

    const interchangeLanguages = () => {
        dispatch({ type: "INTERCHANGE_LANGUAGES" });
    };

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: "SET_FROM_LANGUAGE", payload });
    };

    const setToLanguage = (payload: Language) => {
        dispatch({ type: "SET_TO_LANGUAGE", payload });
    };

    const setFromText = (payload: string) => {
        dispatch({ type: "SET_FROM_TEXT", payload });
    };

    const setResult = (payload: string) => {
        dispatch({ type: "SET_RESULT", payload });
    };

    return {
        fromLanguage,
        fromText,
        loading,
        result,
        toLanguage,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    };
}
