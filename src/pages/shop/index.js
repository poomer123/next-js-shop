import { db } from 'services/firebaseAdmin';
import Link from 'next/link';

function Products({ data }) {
    return <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {data && data.map(e => {
            return (
                <div key={e.id} style={{flexBasis: '24%', paddingLeft: '.5%', paddingRight: '.5%', marginBottom: 24 }}>
                    <Link href='/shop/[productId]' as={`/shop/${e.id}`} >
                        <a>
                            <div style={{ width: '100%'}}>
                                <img src={e.url} alt={e.title} style={{ width: '100%'}} />
                            </div>
                            <h3 style={{ fontSize: 14, marginTop: 4, marginBottom: 4}}>
                                {e.title}
                            </h3>
                            <small>{e.created_at}</small>
                        </a>
                    </Link>
                </div>
            )
        })}
    </div>
}

function Shop({ data }) {
    return <div>
        <h1>Shop</h1>
        <Products data={data} />
    </div>
}

export async function getStaticProps(context) {
    let snapshot = null
    try {
        snapshot = await db.collection('photos').orderBy('created_at').limit(16).get()
    } catch (error) {
        console.log(error)
    }

    const data = snapshot.docs.map( e => {
        const d = e.data()
        return {
            id: e.id,
            ...d,
            created_at: d.created_at.toDate().toLocaleDateString()
        }
    })

    return {
        props: {data},
    }
}

export default Shop