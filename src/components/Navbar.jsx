import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMegaMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from 'react';


import {auth} from '../config/firebase';
import {  signOut } from 'firebase/auth';

export default function HeaderMegaMenu() {
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(auth?.currentUser?.email)

  return (
    <Box className={isSticky ? classes.sticky : ''}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <span style={{fontWeight:600, fontSize:"30px", }}>ShoperZone</span>
          {/* backgroundColor:"black", color:"white", padding:"5px" */}

          <Group h="100%" gap={0} visibleFrom="sm">
            <NavLink to="/" className={classes.link}>
              Home 🏠    
            </NavLink>

            <NavLink to="/wishlist" className={classes.link}>
              Wishlist ❤️  
            </NavLink>
            <NavLink to="/cart" className={classes.link}>
              My Cart 🛒
            </NavLink>
          </Group>

          <Group visibleFrom="sm">
          {auth?.currentUser ? (
  <Button variant="default" onClick={logout}>Log Out</Button>
) : (
  <>
    <Button variant="default"><NavLink to="/auth">Log in</NavLink></Button>
    <Button variant="default"><NavLink to="/auth">Sign up</NavLink></Button>
  </>
)}

            
            
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink to="/" className={classes.link}>
              Home 🏠    
            </NavLink>

            <NavLink to="/wishlist" className={classes.link}>
              Wishlist ❤️  
            </NavLink>
            <NavLink to="/cart" className={classes.link}>
              My Cart 🛒
            </NavLink>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
          {auth?.currentUser ? (
            <Button variant="default" onClick={logout}>Log out</Button>
) : (
  <>
  <Button variant="default"><NavLink to="/auth">Log in</NavLink></Button>
    <Button variant="default"><NavLink to="/auth">Sign up</NavLink></Button>
            </>
)}
          </Group>

        </ScrollArea>
      </Drawer>
    </Box>
  );
}

