import { useState } from 'react'
import { firebase } from "services/firebase";
import 'styles/global.css'
import Link from 'next/link'
import Logo from 'compoments/Logo'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const login = ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

const signup = ({ email, password }) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

function LoginSignup() {
    const [open, setOpen] = useState('NO')
    // const auth = userAuthState(firebase.auth())
    return (
        <div>
            <button onClick={() => setOpen('LOGIN')}>Login</button>
            <button onClick={() => setOpen('SIGNUP')}>Signup</button>

            <Dialog aria-label="Login From" isOpen={open === 'LOGIN'} onDismiss={() => setOpen('NO')}>
                <button onClick={() => setOpen('NO')}>Close</button>
                <h3>Login</h3>
                <Form buttonText="Login" onSubmit={login} />
            </Dialog>

            <Dialog aria-label="Signup From" isOpen={open === 'SIGNUP'} onDismiss={() => setOpen('NO')}>
                <button onClick={() => setOpen('NO')}>Close</button>
                <h3>Signup</h3>
                <Form buttonText="Signup" onSubmit={signup} />
            </Dialog>
        </div>
    )
}

function Form({ buttonText, onSubmit }) {
    const [error, setError] = useState(null)
    function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        const { email, password } = event.target.elements
        onSubmit({
            email: email.value,
            password: password.value
        }).catch(err => {
            setError(`Something wrong! ${err.message}`)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" />
            </div>
            <div>
                <div style={{color: 'red'}}>{error ? error : null}</div>
                <button type="submit">{buttonText}</button>
            </div>
        </form>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div>
                    <Logo />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 6}}>
                    <Link href="/">
                        <a style={{ padding: '6px 4px' }}>Home</a>
                    </Link>
                    <Link href="/about">
                        <a style={{ padding: '6px 4px' }}>About</a>
                    </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                    <LoginSignup />
                </div>
            </div>
            <div>
                <Component {...pageProps} />
            </div>
            <footer style={{ marginTop: '60px'}}>
                Photoshop @2021
            </footer>
        </div>
    )
}

export default MyApp