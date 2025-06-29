import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import "../Styles/team.scss";

const Page = () => {
  const teamMembers = [
    { name: 'Deniz Görkem Ater', id: '18330670', imageUrl: 'https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/11.png' },
    { name: 'Kaan Sulkalar', id: '20000063', imageUrl: 'https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/3.png' },
    { name: 'Göktuğ Fırat Çelik', id: '19000042', imageUrl: 'https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/5.png' },
    { name: 'Mert Kaan Alpan', id: '18000058', imageUrl: 'https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/2.png' },
    { name: 'Eylül Topçu', id: '22000207', imageUrl: 'https://cdn.jsdelivr.net/gh/Gorcc/cdn@main/marketplaceapp/4.png' },
  ];

  return (
    <Box className='team-container flex flex-col justify-center items-center'>
      <a href="/">Go back to app</a>
      <Typography variant="h4" gutterBottom>This app was built by:</Typography>
      <Box className='flex flex-wrap justify-center'>
        {teamMembers.map((member, index) => (
          <Card key={index} sx={{ maxWidth: 345, m: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CardMedia
                component="img"
                sx={{ width: 'auto', height: '100%' }}
                image={member.imageUrl}
                alt={`${member.name}'s image`}
              />
            </Box>
            <CardContent>
              <Typography className='member-name' variant="h5" component="div">{member.name}</Typography>
              <Typography className='text-center' variant="body2" color="text.secondary">{member.id}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Page;
