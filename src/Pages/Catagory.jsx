import React, { useEffect, useState } from 'react';
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  useMantineTheme,
  Center,
} from '@mantine/core';
import classes from './FeaturesCards.module.css';
import ProCard from '../components/Card';
import SerachBar from '../components/SearchBar';
import Paginate from '../components/Pagination';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { auth } from '../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Catagory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useMantineTheme();
  const params = useParams();

  const itemCollectionRef = query(
    collection(db, 'items'),
    where('cat', '==', params.itemName)
  );

  useEffect(() => {
    const getItemList = async () => {
      try {
        const data = await getDocs(itemCollectionRef);
        const filteredItems = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItemList(filteredItems);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getItemList();
  }, []);

  // Filter items based on search query
  const filteredItems = itemList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = filteredItems.slice(firstPostIndex, lastPostIndex);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Card withBorder radius="md" padding="xl">
          <Text c="dimmed">loading ....⌚⌚⌚⌚</Text>
          <img src="https://external-preview.redd.it/lSaptk4guLyBkHs20H4iLLRRBmfy8ccH8iT7I-Of28M.png?format=pjpg&auto=webp&s=3d8fda136500a9c8be0eda3a7b284bd431e64a21" />
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          {params.itemName}
        </Title>
        <br />
        <SerachBar setSearchQuery={setSearchQuery} />
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {currentPosts.length > 0 ? (
            <>
              {currentPosts.map((feature) => (
                <div key={feature.id}>
                  <ProCard
                    title={feature.title}
                    desc={feature.desc}
                    img={feature.img}
                    price={feature.price}
                    itemName={params.itemName}
                  />
                </div>
              ))}
            </>
          ) : (
            <Card withBorder radius="md" padding="xl">
              <Text c="dimmed">No items in this catagory 😅</Text>
            </Card>
          )}
        </SimpleGrid>
      </Container>
      <Center>
        <Paginate
          totalPosts={filteredItems.length} 
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Center>
      <Footer />
    </>
  );
}

