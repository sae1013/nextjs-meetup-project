import { MongoClient } from 'mongodb';
// Called when request to api/new-meetup

async function handler(req, res) {
    
    if(req.method ==='POST'){
        const data = req.body;

        const client = await MongoClient.connect(`mongodb+srv://${process.env.REACT_APP_DB_ACCOUNT}:${process.env.REACT_APP_DB_PASSWORD}@cluster0.lg93n.mongodb.net/meetups?retryWrites=true&w=majority`);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        client.close();
        res.status(201).json({message:'Meetup instered'});
    }   
}
export default handler;


