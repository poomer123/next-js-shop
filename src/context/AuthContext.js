import { createContext, useContext, useReducer, useEffect } from 'react';
import { firebase } from '../services/firebase'
const AuthContext = createContext()

function reducer(state, action) {
    switch (action.type) {
        case 'value':
            return {
                ...state,
                value: action.value,
                loading: false,
                error: undefined
            }
        case 'error':
            return {
                ...state,
                value: undefined,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

function getInitialState(initValue) {
    return {
        loading: initValue === null,
        value: initValue
    }
}

function useAuthState(auth) {
    const [state, dispatch] = useReducer(reducer, getInitialState(auth.currentUser))

    useEffect(() => {
        auth.onAuthStateChanged(
            (v) => {dispatch({type: 'value', value: v})},
            (e) => {dispatch({type: 'error', error: e})}
        )
    }, [auth])

    return {
        user: state.value,
        loading: state.loading,
        error: state.error,
        isAuth: state.loading === false && state.value !== null
    }
}

function AuthContextProvider({ children }) {

    const auth = useAuthState(firebase.auth())
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {
    AuthContextProvider,
    AuthContext,
    useAuth
}