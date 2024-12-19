import React, { useContext } from 'react';
import postImage from '../../assets/images/R15V3.jpg'
import Heart from '../../assets/Heart';
import './Post.css';
import { useEffect, useState } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import {db} from '../../api'
import {  PostDetailsContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const [Products, setProducts] = useState([])
  const q = query(collection(db, "Products"));
  const { setPostDetails } = useContext(PostDetailsContext);
  const history=useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setProducts(productsList);
        // console.log(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "Date not available";
    try {
      return timestamp.toDate().toLocaleDateString(); // Formats date as "MM/DD/YYYY"
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid Date";
    }
  };
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { Products.map(Products => ( 
            <div onClick={()=>{
              history(`/view/${Products.id}`)
            }} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={postImage} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {Products.Prize}</p>
              <span className="kilometer">{Products.Category}</span>
              <p className="name">{Products.Name}</p>
            </div>
            <div className="date">
              <span>{formatTime(Products.Time)}</span>
            </div>
          </div>
         ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={postImage} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
