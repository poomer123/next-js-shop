import 'styles/global.css'
import Logo from 'compoments/Logo'

function MyApp({ Component, pageProps}) {
    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div>
                    <Logo />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 6}}>
                    Menu
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                    Login / Signup
                </div>
            </div>
            <div>
                <Component {...pageProps} />
            </div>
            <footer>
                Photoshop @2020
            </footer>
        </div>
    )
}

export default MyApp