import cx from 'clsx';
import { Title, Text, Container, Button, Overlay, Group } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import GridLayout from './Grid'
import FeaturesCards from './FeatureCards';
import Navbar from './Navbar';
import { Footer } from './Footer';
import {auth} from '../config/firebase';
import { useEffect } from 'react';
// import { GithubIcon } from '@mantinex/dev-icons';

export default function Hero() {
  useEffect(()=>{console.log(auth?.currentUser?.email);},[])
  
  return (
    <>
      <Navbar/>
    
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          ShopZone{' '}
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            We have the latest trendy item from all around the globe, never comprimise on fashion with ShopZone
          </Text>
        </Container>
      </div>
      <FeaturesCards/>
    </div>
    <Footer/>
    </>
  );
}