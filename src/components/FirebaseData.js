import React from 'react';
import { database } from '../firebase';
import { ref,   update, } from 'firebase/database';
import { UserAuth } from '../context/AuthContext';

const FirebaseData = () => {
    const { user } = UserAuth();
    //Setup the rtdb for new users 
    function getCurrentDate() {
      const newDate = new Date();
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    function writeNewPost() {
        // create a key for values and time in rh sensors 
        //every time i click 
        const newDate = new Date();
        const date = getCurrentDate();
        const time = newDate ? newDate.toTimeString().slice(0, 8) : '';
        console.log(newDate);
        console.log(date);
        console.log(time);  
      
        // create a random values in rh sensors
        const postDatarh = {
          Value: Math.floor(Math.random()*100)
        };
        // create a random values in temp sensors
        const postDatatemp = {
            Value: Math.floor(Math.random()*100)
          };
          const postDataec = {
            Value: Math.floor(Math.random()*100)
          };
          const postDataph = {
            Value: Math.floor(Math.random()*100)
          };
          const postDatawt = {
            Value: Math.floor(Math.random()*100)
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
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/RH/'+ `${date}` +'/'+ `${time}`] = postDatarh;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/Temp/'+ `${date}` +'/'+ `${time}`] = postDatatemp;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/EC/'+ `${date}` +'/'+ `${time}`] = postDataec;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/PH/'+ `${date}` +'/'+ `${time}`] = postDataph;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/WT/'+ `${date}` +'/'+ `${time}`] = postDatawt;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRPHUP/'] = postDatairphup;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRPHDOWN/'] = postDatairphdown;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRFERTILIZER/'] = postDatairfertilizer;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRWATERUP/'] = postDatairwaterup;
        updates['/Users/' + `${user?.uid}` + '/ESP1/data/IRWATER/'] = postDatairwater;

      
        return update(ref(database), updates, time, date);
      }
    
//

    return (
        <div>
           
                <button onClick={writeNewPost}>Create</button>
            
        </div >
    );
};

export default FirebaseData;
