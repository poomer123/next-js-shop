import { useRef, useEffect, useReducer } from 'react';
import { db } from 'services/firebase';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext'
import { useCart } from 'context/CartContext'

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
        loading: initValue === null || initValue === undefined,
        value: initValue
    }
}

function useDocument(query, docId) {
    const ref = useRef(query)
    const [state, dispatch] = useReducer(reducer, getInitialState())

    useEffect(() => {
        if (ref.current === null) {
            dispatch({ type: 'value', value: null })
            return
        }
        if (docId) {
            ref.current.doc(docId).get()
            .then( snapshot => 
                dispatch({ type: 'value', value: snapshot })
            )
            .catch( err => 
                dispatch({ type: 'error', error: err }) 
            )
        }
    }, [docId])

    return {
        data: state.value 
            ? {
                ...state.value.data(),
                id: state.value.id,
                created_at: state.value.get('created_at').toDate().toLocaleDateString()
            }
            : null,
        loading: state.loading,
        error: state.error,
        empty: state.value ? state.value.empty : null
    }
}

function ProductDatil() {
    const router = useRouter()
    const { isAuth } = useAuth()
    const { items, dispatch } = useCart()
    const { productId } = router.query
    const { loading, error, empty, data } = useDocument(
        db.collection('photos'),
        productId
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

    const isInCart = items.some(e => e.id === productId)
    return (
        <div>
            <h2>{data.title}</h2>
            <small>By {data.owner}</small>
            {isAuth && 
                <div style={{marginTop: 10}}>
                    <button disabled={isInCart} onClick={() => dispatch(['add', data])}>Add to Cart</button>
                </div>
            }
            <div>
                <img src={data.url} alt={data.title} style={{ width: '100%', marginTop: 30 }} />
            </div>
            <div>
                {data.description}
            </div>
        </div>
    )   
}

export default ProductDatil