import { useRef, useEffect, useReducer } from 'react';
import { db } from 'services/firebase';

// const photosRef = db.collection('photos')

// photosRef.add({
//     title: 'Lens',
//     owner: 'Markus Spiske',
//     url: 'https://source.unsplash.com/zssAC1KCzNs',
//     created_at: firebase.firestore.Timestamp.fromDate(new Date())
// })

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

function useCollection(query) {
    const ref = useRef(query)
    const [state, dispatch] = useReducer(reducer, getInitialState())

    useEffect(() => {
        if (ref.current === null) {
            dispatch({ type: 'value', value: null })
            return
        }
        ref.current.get()
        .then( snapshot => 
            dispatch({ type: 'value', value: snapshot })
        )
        .catch( err => 
            dispatch({ type: 'error', error: err }) 
        )
    }, [])

    return {
        data: state.value 
            ? state.value.docs.map( e => {
                return {
                    id: e.id,
                    ...e.data(),
                }
            })
            : null,
        loading: state.loading,
        error: state.error,
        empty: state.value ? state.value.empty : null
    }
}

function Home() {
    const { loading, error, data, empty } = useCollection(
        db.collection('photos').orderBy('created_at').limit(16)
    )

    if (loading) {
        return <div>Loading..</div>
    }
    if (empty) {
        return <div>Nothing to show..</div>
    }
    if (error) {
        return <div>Error..</div>
    }

    return <div>
        <h1>Home Page</h1>
        {data && data.map(e => {
            return (
                <div key={e.id}>
                    <img src={e.url} alt={e.title} />
                    <h3>{e.title}</h3>
                </div>
            )
        })}
    </div>
}

export default Home