import { Text, Title, TextInput, Button, Image } from '@mantine/core';
// import image from './image.svg';
import classes from './Productdetail.module.css';
import { useParams } from 'react-router-dom';
import {auth} from '../config/firebase';
import {getDoc,getDocs, doc, query, collection, where} from "firebase/firestore";
import {db} from "../config/firebase";
import {useState, useEffect} from 'react';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Productdetail() {

    const params = useParams();
    // console.log("----->",params.item);

    const [item, setItem] = useState([]);

  
    useEffect(() => {
        const getItem = async () => {
            try {
                // Construct the query to search for items where 'title' equals params.item
                const itemQuery = query(collection(db, "items"), where('title', '==', params.item));
    
                // Execute the query to get the snapshot of the matching document
                const querySnapshot = await getDocs(itemQuery);
    
                // Check if any matching documents exist
                if (!querySnapshot.empty) {
                    // Get the first document from the query results
                    const itemSnapshot = querySnapshot.docs[0];
    
                    // Extract data from the snapshot
                    const itemData = itemSnapshot.data();
    
                    // Update the component state with the fetched item data
                    setItem(itemData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        getItem();
    }, [params.item]);
    
    // console.log("item",item);



  return (
    <>
    <Navbar/>
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>{item.title}</Title>
        <Text fw={500} fz="lg" mb={5}>
          {item.cat}
        </Text>
        <Text fz="sm" c="dimmed">
          {item.desc}
        </Text>
    <br/>
        <Text  fz="xl" mb={5}>
          Rs. {item.price} /-
        </Text>

        <div className={classes.controls}>
          
        <Button
          mt="xl"
          size="md"
          style={{ backgroundColor: "#DE3163", marginRight:"10px" }}
        >
          Add to WishList ❤️
        </Button> 
        <Button

          mt="xl"
          size="md"
          style={{ backgroundColor: "#17B169" }}
        >
          Add to Cart 🛒
        </Button>
        </div>

      </div>
      <Image src={item.img} className={classes.image} />
    </div>
    <Footer/>
    </>
  );
}