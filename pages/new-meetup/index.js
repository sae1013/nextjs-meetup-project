import {Fragment} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {

    const router= useRouter();
    const addMeetupHandler = async(enteredData)=>{
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body: JSON.stringify(enteredData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add a new Meetup</title>
                <meta name="description" content="Add your new Meetup and enjoy your networking!"></meta>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}

export default NewMeetupPage
