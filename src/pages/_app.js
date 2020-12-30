import { useState } from 'react'
import 'styles/global.css'
import Link from 'next/link'
import Logo from 'compoments/Logo'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

function LoginSignup() {
    const [open, setOpen] = useState('NO')
    return (
        <div>
            <button onClick={() => setOpen('LOGIN')}>Login</button>
            <button onClick={() => setOpen('SIGNUP')}>Signup</button>

            <Dialog aria-label="Login From" isOpen={open === 'LOGIN'} onDismiss={() => setOpen('NO')}>
                <button onClick={() => setOpen('NO')}>Close</button>
                <h3>Login</h3>
                <form>

                </form>
            </Dialog>

            <Dialog aria-label="Signup From" isOpen={open === 'SIGNUP'} onDismiss={() => setOpen('NO')}>
                <button onClick={() => setOpen('NO')}>Close</button>
                <h3>Signup</h3>
                <form>

                </form>
            </Dialog>
        </div>
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