import React, { useState, useEffect } from "react";
//import {db} from '../firebase';
//import {collection, getDocs, onSnapshot} from 'firebase/firestore';

 const FirestoreData = () => {
    
 /*   const [data, setData] =  useState([]);
      
      useEffect(() =>{
    
        const getUsers = async () => {
            
                const querySnapshot = onSnapshot(collection(db,"users"), (snapShot)=>{
                    let list = [];
                    snapShot.docs.forEach((doc)=>{
                        list.push({id:doc.id, ...doc.data()});
                    });
                    setData(list);
                },
                (error) => {
                    console.log(error);
                });
                return () => {
                    querySnapshot();
                }
            };
    
            getUsers();
      
        
      },[]
    )
*/
  return (
    <div>
      {/*  <div>Dashboard</div>

        <div>{data.map((user)=>{
        return (
            <div>
            <h1> Temp: {user.Temp} </h1>
            <h1> RH: {user.RH} </h1>
            </div>

            );
        
        })}</div>*/}
    </div>
  )
}

export default FirestoreData;
