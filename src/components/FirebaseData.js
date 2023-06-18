import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref,  onValue, off, getDatabase, child, push, update} from 'firebase/database';
import { UserAuth } from '../context/AuthContext';

const FirebaseData = () => {
    const { user } = UserAuth();
    
    //Setup the rtdb for new users 
    function writeNewPost() {
        // create a key for values and time in rh sensors 
        //every time i click 
        const RHkeys = push(ref(database,'/Users/' + `${user?.uid}` + '/ESP1/data/RH' )).key;
        const Tempkeys = push(ref(database,'/Users/' + `${user?.uid}` + '/ESP1/data/Temp' )).key;
        const ECkeys = push(ref(database,'/Users/' + `${user?.uid}` + '/ESP1/data/EC' )).key;
        const PHkeys = push(ref(database,'/Users/' + `${user?.uid}` + '/ESP1/data/PH' )).key;
        const WTkeys = push(ref(database,'/Users/' + `${user?.uid}` + '/ESP1/data/WT' )).key;
        // create a random values in rh sensors
        const postDatarh = {
          Value: Math.floor(Math.random()*100),
          Time: parseInt(0),
        };
        // create a random values in temp sensors
        const postDatatemp = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDataec = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDataph = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDatawt = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDatairphup = {
            Value: Math.floor(Math.random()*55),
            Time: parseInt(0),
          };
          const postDatairphdown = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDatairfertilizer = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDatairwaterup = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
          const postDatairwater = {
            Value: Math.floor(Math.random()*100),
            Time: parseInt(0),
          };
        // return the value and time to
        const updates = {};
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/RH/'+ RHkeys] = postDatarh;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/Temp/'+ Tempkeys] = postDatatemp;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/EC/'+ ECkeys] = postDataec;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/PH/'+ PHkeys] = postDataph;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/WT/'+ WTkeys] = postDatawt;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRPHUP/'] = postDatairphup;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRPHDOWN/'] = postDatairphdown;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRFERTILIZER/'] = postDatairfertilizer;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRWATERUP/'] = postDatairwaterup;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRWATER/'] = postDatairwater;

      
        return update(ref(database), updates);
      }
    
// relative humidity
    const [data1, setData1] = useState(null); 

    useEffect(() => {

        const RH = `/Users/${user?.uid}/ESP1/RH/data/Value`;
    
        const path = (RH) ; // Replace with the actual path

        const onDataChange = (snapshot) => {
            const fetchedData1 = snapshot.val();
            setData1(fetchedData1);
        };

        const dataRef1 = ref(database, path);
        onValue(dataRef1, onDataChange);

        // Cleanup the listener when the component unmounts
        return () => {
            // Unsubscribe from the listener
            off(dataRef1, onDataChange);
        };
    }, [user?.uid]);


    return (
        <div>
            {data1 ? (
                <div>
                    <h2>Data from Firebase Realtime Database:</h2>
                    <p>Relative humidity : {data1}</p>
                    <p>Temperature: </p>
                    <p>{user?.uid}</p>
                    <button onClick={writeNewPost}>Create</button>
                </div>
            ) : (
                <button onClick={writeNewPost}>Create</button>
            )
            }
            
        </div >
    );
};

export default FirebaseData;
