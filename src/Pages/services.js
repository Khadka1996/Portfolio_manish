import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { ReactComponent as BackgroundSVG } from '../assets/mn.svg'; // Import your SVG file here

const servicesData = [
  {
    title: 'Responsive Web Design',
    description: 'We leverage the concept of mobile-first design. Through our work, we focus on designing an experience that works across different screen sizes.',
    color: '#f0f4f8',
  },
  {
    title: 'UX Auditing',
    description: 'If you are unsure of how your app behaves, we can help by doing a detailed UX audit that will highlight most of the issues in your product.',
    color: '#e0f7fa',
  },
  {
    title: 'Front End Development',
    description: 'We are Front End masters with a deep focus on HTML, CSS. The result of our work is responsive, accessible, and performant websites.',
    color: '#ffe0b2',
  },
  {
    title: 'UX Consultation',
    description: 'If you don’t know what kind of service to request from us, don’t worry. We can help and see what fits your business and budget.',
    color: '#e1bee7',
  },
  {
    title: 'Mobile Apps Design',
    description: 'To reach more customers and achieve your business goals, a mobile application is necessary these days. We will design the app from scratch to a final tested prototype.',
    color: '#c8e6c9',
  },
  {
    title: 'UX Research',
    description: 'It’s important to research deeply for the product you want to build. We help in that by defining the user audience and working on user stories.',
    color: '#ffccbc',
  },
];

const Services = () => {
  return (
    <Box sx={{ backgroundColor: '#fff', padding: 4, position: 'relative' }}>
      <Typography variant="h2" align="center" sx={{ marginBottom: 4 }}>
        Our Services
      </Typography>
      <BackgroundSVG style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: -1 }} />
      <Grid container spacing={4}>
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: service.color }}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {service.title}
              </Typography>
              <Typography variant="body1">{service.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
