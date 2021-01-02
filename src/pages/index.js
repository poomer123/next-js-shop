import { db, firebase } from 'services/firebase';

const photosRef = db.collection('photos')

photosRef.add({
    title: 'Lens',
    owner: 'Markus Spiske',
    url: 'https://source.unsplash.com/zssAC1KCzNs',
    created_at: firebase.firestore.Timestamp.fromDate(new Date())
})

function Home() {
    return <div>
        <h1>Home Page</h1>
    </div>
}

export default Home