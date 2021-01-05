import { useRef, useEffect, useReducer } from 'react';
import { db } from 'services/firebase';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext'
import { useCart } from 'context/CartContext'


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

function ProductDatil({ data }) {
    const router = useRouter()
    const { isAuth } = useAuth()
    const { items, dispatch } = useCart()
    // const { productId } = router.query

    const isInCart = items.some(e => e.id === data.id)
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

export async function getStaticPaths() {
    let snapshot = null
    try {
        snapshot = await db.collection('photos').orderBy('created_at').limit(16).get()
    } catch (error) {
        console.log(error)
    }

    const paths = snapshot.docs.map( e => {
        return {
            params: {
                productId: e.id
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    let snapshot = null
    try {
        snapshot = await db.collection('photos').doc(params.productId).get()
    } catch (error) {
        console.log(error)
    }

    const d = snapshot.data()
    const data = {
        ...d,
        id: snapshot.id,
        created_at: snapshot.get('created_at').toDate().toLocaleDateString()
    }
    
    return {
        props: {data},
    }
}



export default ProductDatil