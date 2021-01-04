import { useEffect } from 'react';
import Router from 'next/router';
import { useCart } from 'context/CartContext';
import { useAuth } from 'context/AuthContext';

function Cart() {
    const { isAuth, loading } = useAuth()
    const { items } = useCart()

    useEffect(() => {
        if (!isAuth && !loading) {
            Router.push('/')
            return
        }
    }, [isAuth, loading])

    return (
        <div>
            {items.map(e => <div key={e.id}>{e.title}</div>)}
            <div style={{marginTop: 30}}>
                <button>Checkout</button>
            </div>
        </div>
    )
}

export default Cart