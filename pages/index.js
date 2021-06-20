import {MongoClient} from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function Homepage(props) {
    
    return <MeetupList meetups ={props.meetups}></MeetupList>

}

export async function getStaticProps() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.REACT_APP_DB_ACCOUNT}:${process.env.REACT_APP_DB_PASSWORD}@cluster0.lg93n.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return { 
        props:{
            meetups:meetups.map( meetup => ({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString(),
            }))
        },
        revalidate:1
    }
}


export default Homepage;



