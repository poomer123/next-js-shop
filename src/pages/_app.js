import 'styles/global.css'
import Link from 'next/link'
import Logo from 'compoments/Logo'

function MyApp({ Component, pageProps}) {
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
                    Login / Signup
                </div>
            </div>
            <div>
                <Component {...pageProps} />
            </div>
            <footer style={{ marginTop: '60px'}}>
                Photoshop @2020
            </footer>
        </div>
    )
}

export default MyApp