import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const Page = () => {
  const teamMembers = [
    { name: 'Deniz Görkem Ater', id: '18330670' },
    { name: 'Kaan Sulkalar', id: '20000063' },
    { name: 'Göktuğ Fırat Çelik', id: '19000042' },
    { name: 'Mert Kaan Alpan', id: '18000058' },
    { name: 'Eylül Topçu', id: '22000207' },
  ];

  return (
    <Box className='flex flex-col justify-center items-center'>
      <a href="/">Go back to app</a>
      <Typography variant="h4" gutterBottom>This app was built by:</Typography>
      <Box className='flex flex-wrap justify-center'>
        {teamMembers.map((member, index) => (
          <Card key={index} sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/140"
              alt={member.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">{member.id}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Page;
