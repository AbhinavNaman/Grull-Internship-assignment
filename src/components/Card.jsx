import { IconBookmark, IconHeart, IconShare, IconShoppingCart } from '@tabler/icons-react';
import {
  Card,
  Image,
  Button,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from '@mantine/core';
import classes from './Card.module.css';
import { Link } from 'react-router-dom';
import { db, auth } from "../config/firebase";
import {getDocs, collection, query, where, doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { NavLink } from 'react-router-dom';

export default function ProCard(props) {
  const theme = useMantineTheme();

const itemName = props?.itemName;
const userEmail = auth?.currentUser?.email;
  
const addToishlist = async (title) =>{

  const newItem={
    title: title,
    cat : itemName,
    img: props?.img,
    price: props?.price,
    desc: props?.desc,
  }

  const collectionRef = collection(db, "users");
  const querySnapshot = await getDocs(query(collectionRef, where("email", "==", userEmail)));


  if (!querySnapshot.empty) {

    const documentSnapshot = querySnapshot.docs[0];
    const documentId = documentSnapshot.id;
    const documentRef = doc(db, "users", documentId);
    await updateDoc(documentRef, {
      wishlist: arrayUnion(newItem)
    });
  
    console.log("Item added to wishlist successfully.");
  } else {
    console.log("No document found with the specified email value.");
  }
}


const removeToWishlist = async (title) => {
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(query(collectionRef, where("email", "==", userEmail)));

    if (!querySnapshot.empty) {
      const documentSnapshot = querySnapshot.docs[0];
      const documentId = documentSnapshot.id;
      const documentRef = doc(db, "users", documentId);

      // Get the current wishlist array from Firestore
      const userData = documentSnapshot.data();
      const wishlist = userData.wishlist || [];

      // Filter out the item with the matching title
      const updatedWishlist = wishlist.filter(item => item.title !== title);

      // Update the wishlist field in Firestore with the filtered array
      await updateDoc(documentRef, {
        wishlist: updatedWishlist
      });
      props.setRerender(true);
      console.log("Item removed from wishlist successfully.");
    } else {
      console.log("No document found with the specified email value.");
    }
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
  }
};





      

  return (
    <Card withBorder radius="md" className={classes.card}>
    <Link to={`/catagory/${itemName}/${props?.title}`}>
      <Card.Section>
          <Image src={props?.img} height={180} />
      </Card.Section>
      </Link>

      

      <Text className={classes.title} fw={500} 
      // component="a" {...linkProps}
      >
        {props?.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
      {props?.desc}
       
      </Text>

      <Group justify="space-between" className={classes.footer}>


        <Group gap={8} mr={0}>

        {props?.price && 
        
        <Button className={classes.action} style={{border:"solid 1px #D3D3D3"}} >
            <IconShoppingCart style={{ width: rem(30), height: rem(30) }} color={theme.colors.blue[6]} /> 
            <Text style={{color:"gray"}}>BUY</Text>
          </Button> 
        }
          {props?.desc && 
          <Button  className={classes.action} onClick={()=>{addToishlist(props?.title)}}>
            <IconHeart style={{ width: rem(30), height: rem(30) }} color={theme.colors.red[6]} />
          </Button>
          } 

          {!props?.desc && 
            <Button className={classes.action} onClick={() => {userEmail && removeToWishlist(props?.title) }}>
  <Text style={{ color: "gray" }}>Remove</Text>
</Button>

}


         
        </Group>


        {props?.price && 
          <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        {props?.price}
      </Badge>
        }

        
      </Group>
    </Card>
    
  );
}