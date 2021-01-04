import { useState, useEffect } from 'react';
import { db } from 'services/firebase';

// const photosRef = db.collection('photos')

// photosRef.add({
//     title: 'Lens',
//     owner: 'Markus Spiske',
//     url: 'https://source.unsplash.com/zssAC1KCzNs',
//     created_at: firebase.firestore.Timestamp.fromDate(new Date())
// })

function Home() {
    const [snapshot, setSnapshot] = useState(null)

    useEffect(() => {
        db.collection('photos').orderBy('created_at').limit(16)
        .get()
        .then( snapshot => {
            setSnapshot(snapshot)
        })
        .catch(
            err => console.log(err)
        )
    }, [])

    if (snapshot === null) {
        return <div>Loading..</div>
    }

    const data = snapshot.docs.map( e => {
        return {
            id: e.id,
            ...e.data(),
        }
    })

    return <div>
        <h1>Home Page</h1>
        {data.map(e => {
            return (
                <div key={e.id}>
                    <img src={e.url} alt={e.title} />
                    {e.title}
                </div>
            )
        })}
    </div>
}

export default Home