import {
    SimpleGrid,
    Container,
    useMantineTheme,
  } from '@mantine/core';

  import ImageCard from './ImageCard'
  import { Link } from 'react-router-dom';

  
  const mockdata = [
    {
      title: 'Shoe',
      src:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: 'Sun Glasses',
      src:"https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuJTIwZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: 'Shorts',
      src:"https://images.unsplash.com/photo-1585145197082-dba095ba01ab?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: 'Tshirts',
        src:"https://images.unsplash.com/photo-1598522325074-042db73aa4e6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: 'Jeans',
        src:"https://media.istockphoto.com/id/1166716422/photo/american-man-jumping-and-enyoying-his-success.jpg?s=1024x1024&w=is&k=20&c=v8S7hntQyoCrcTcy_GFYO-lNMe4sc5WYjjdSUEMI_CQ=",
      },
      {
        title: 'Watch',
        src:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNofGVufDB8fDB8fHww",
      },
  ];
  
  export default function FeaturesCards() {
    const theme = useMantineTheme();
    const features = mockdata.map((feature, index) => (
      <Link key={index} to={`/catagory/${feature.title}`} >
        <ImageCard feature={feature} key={index}/>
      </Link>
    ));
  
    return (
      <>
        <Container size="lg" py="xl">
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50} >
            {features}
          </SimpleGrid>
        </Container>
      </>
    );
  }