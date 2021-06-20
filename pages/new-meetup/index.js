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
        <div>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </div>
    )
}

export default NewMeetupPage
