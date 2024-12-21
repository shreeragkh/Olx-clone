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
import { doc, getDoc } from "firebase/firestore";


function View() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  // const {postDetails} = useContext(PostDetailsContext)
  // const {id} =postDetails
  console.log(id)
  useEffect(() => {
    const fetchProductAndUserDetails = async () => {
      if (!id) {
        console.log("No product id provided for fetching product details");
        return;
      }
      try {
        // Fetch product details
        const productDocRef = doc(db, "Products", id);
        const productDoc = await getDoc(productDocRef);
        if (productDoc.exists()) {
          const productData = productDoc.data();
          console.log(productData)
          setProductDetails(productData);
          const userId = productData.userId;
          // console.log(userId)
        } else {
          console.log("No product found for the provided id");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductAndUserDetails();
  }, [id]);

  
 
  
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
