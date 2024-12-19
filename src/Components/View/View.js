import React from 'react';
import viewImage from '../../assets/images/R15V3.jpg'
import './View.css';
import { useContext } from 'react';
import {  PostDetailsContext } from '../../store/postContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../api';
import { collection, query, getDocs, where, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';


function View() {
  const id=useParams('id')
  const [userdetails, setuserdetails] = useState()
  // const {postDetails} = useContext(PostDetailsContext)
  // const {id} =postDetails
  console.log(id)
  useEffect(() => {
    
    console.log(id)
    const collectionRef = collection(db, "Products");
    const q = query(collectionRef, where("id", "==", "KPKYBkIIUuUmkYSr3JiuRpzSuUE3"));
    onSnapshot(q, (snapshot) => {
      let tempArray = [];
      snapshot.docs.forEach((doc) => {
        tempArray.push({ ...doc.data(), id: doc.id });
      });
      if (tempArray.length > 0) {
        setuserdetails(tempArray[0]);
      }
    });
 }, [])
  
 useEffect(() => {
   console.log(userdetails)
 
   
 }, [userdetails])
 
  
//   useEffect( ()=>{
//     const fetch_User_Details=async()=>{
//       // if(!id){
//       //   console.log("No id provided for fetching user")
//       //   return
//       // }
//     try {
//       const q = await query(collection(db, "users"), where("id", "==", "45Mp6aMOQWLoKEiCeJr5"));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//          console.log(doc.id, " => ", doc.data());
//          setuserdetails(doc.data())
//         }
//       );
      
//     } catch (error) {
//       console.log(error)
//     }
//     }
//     fetch_User_Details();
//   },[]
// )
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={viewImage}/>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 250000 </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
