
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer';
import {
    Text,
    Card,
    Container,
    useMantineTheme,
  } from '@mantine/core';


export default function Cart() {
  const theme = useMantineTheme();
  return (
    <>
    <Navbar/>
    <Container my="md">
    <Card withBorder radius="md" padding="xl" style={{height:"500px"}}>
              <Text c="dimmed">Under Development 😅 <br/>
              Sorry couldn't complete this section, was busy with college assignment and Internals 😓😓</Text>
            </Card>
    </Container>
    <Footer />
    </>
  );
}