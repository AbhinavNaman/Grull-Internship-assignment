import { useEffect, useState } from 'react';
import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
  Center,

} from '@mantine/core';

import { } from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './FeaturesCards.module.css';
import ProCard from '../components/Card';
import SerachBar from '../components/SearchBar';
import Pagination from '../components/Pagination'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';


import {auth} from '../config/firebase';
import {getDocs, collection, query, where,} from "firebase/firestore";
import {db} from "../config/firebase";


export default function Wishlist() {
  const theme = useMantineTheme();
  const [rerender, setRerender] = useState(false);
  const params = useParams();
  const [userEmail, setUserEmail] = useState(auth?.currentUser?.email)
  useEffect(() => {setUserEmail(auth?.currentUser?.email)}, [])


  const [itemList, setItemList] = useState([]);

//   const itemCollectionRef = query(collection(db, "items"), where('cat', '==', params.itemName));

useEffect(() => {
    const getItemList = async () => {
        try {

            const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", userEmail)));

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                const Data = userData.wishlist;

                console.log("Particular field data:",Data);
                setItemList(Data);
            } else {
                console.log("No document found with the specified email value.");
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    getItemList();
}, [rerender]);


  console.log("cataogy",auth?.currentUser?.email);
  console.log("cataogy",params.itemName);




  return (
    <>
    <Navbar/>
    <Container size="lg" py="xl">

  <Title order={2} className={classes.title} ta="center" mt="sm">
    Wishlist
  </Title>

  <br/>

  <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
  {itemList.length>0 ? 
    <>
      {itemList.map((feature, index) => (
        <div key={index}>
          <ProCard
    title={feature.title}
    cat= {feature.cat}
    // desc={feature.desc}
    img={feature.img}
    price={feature.price}
    // itemName={params.itemName}
    setRerender={setRerender}
          />
        </div>
      ))}
    </>
    : 
  <Card withBorder radius="md" padding="xl" >
      <Text   c="dimmed">
        No items in this catagory 😅
      </Text>
    </Card>
  }
    
  </SimpleGrid>
    </Container>

    <Footer/>
    </>
  );
}
