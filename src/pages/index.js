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
                const d = e.data()
                return {
                    id: e.id,
                    ...d,
                    created_at: d.created_at.toDate().toLocaleDateString()
                }
            })
            : null,
        loading: state.loading,
        error: state.error,
        empty: state.value ? state.value.empty : null
    }
}

function Products({ data }) {
    return <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {data && data.map(e => {
            return (
                <div key={e.id} style={{flexBasis: '24%', paddingLeft: '.5%', paddingRight: '.5%', marginBottom: 24 }}>
                    <div style={{ width: '100%'}}>
                        <img src={e.url} alt={e.title} style={{ width: '100%'}} />
                    </div>
                    <h3 style={{ fontSize: 14, marginTop: 4, marginBottom: 4}}>
                        {e.title}
                    </h3>
                    <small>{e.created_at}</small>
                </div>
            )
        })}
    </div>
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
        <h1>Our products</h1>
        <Products data={data} />
    </div>
}

export default Home