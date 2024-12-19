import React, { Fragment , useState , useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/firebaseContext';
import {db} from '../../api'
import { addDoc,collection,serverTimestamp } from 'firebase/firestore';
import {  useNavigate } from 'react-router-dom';

const Create = () => {
  const [Name, setName] = useState('')
  const [Category, setCategory] = useState('')
  const [Image, setImage] = useState(null)
  const [Prize, setPrize] = useState('')
  const {User} = useContext(AuthContext)
  const history=useNavigate()

  // console.log(User.displayName)
  const Submit= async()=>{
    try {
      await addDoc(collection(db,"Products"),{
        Name,
        Category,
        Prize,
        userId:User.uid,
        Time:serverTimestamp()
      })
     alert('Successfully submitted')
     history('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=> setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e)=> setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e)=> setPrize(e.target.value)}/>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={Image ? URL.createObjectURL(Image) : ''}></img>
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={Submit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
