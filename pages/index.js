import {MongoClient} from 'mongodb';
import {Fragment} from 'react';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

function Homepage(props) {
    
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="check up list of meetup"></meta>
            </Head>
            <MeetupList meetups ={props.meetups}/>
        </Fragment>
        )

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



