import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from './ImageCard.module.css';
import { useParams } from 'react-router-dom';

export default function ImageCard({feature}) {
  const theme = useMantineTheme();
  const params = useParams();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
          `url(${feature.src})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {feature.title}
          </Text>
        </div>
      </div>
    </Card>
  );
}