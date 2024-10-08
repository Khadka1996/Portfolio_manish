import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, Paper, Card, CardContent, Divider } from '@mui/material';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import EmailIcon from '@mui/icons-material/Email';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic (e.g., send to backend)
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
    <div class="flex items-center p-10 ">
    <div class="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
    <div class="px-3 text-[#25609A] text-3xl font-bold border-r-2 border-l-2 rounded-lg">Contact Me</div>
    <div class="border-t-2 border-b-2 h-2 border-[#7BB660] flex-grow"></div>
</div>       

      <Card elevation={4} sx={{ p: 4 }}>
        <CardContent>
          <Grid container spacing={4} alignItems="center">
            {/* Contact Info Column */}
            <Grid item xs={12} md={5}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FaPhone size={20} style={{ marginRight: 10 }} />
                    <Typography variant="body1" display="inline">+977-9823153502</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FaEnvelope size={20} style={{ marginRight: 10 }} />
                    <Typography variant="body1" display="inline">
                      <a href="mailto:mnzkhadka1996@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                        mnzkhadka1996@gmail.com
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FaMapMarkerAlt size={20} style={{ marginRight: 10 }} />
                    <Typography variant="body1" display="inline">Kathmandu, Nepal</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Vertical Divider */}
            <Grid item xs={12} md={1}>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
            </Grid>

            {/* Contact Form Column */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5 " gutterBottom>
                Send Me a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="Your Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Your Email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      name="message"
                      label="Your Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Button 
  type="submit" 
  variant="contained" 
  sx={{ backgroundColor: '#25609A' }} 
  fullWidth
  startIcon={<EmailIcon />}
>
  Send Email
</Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactMe;
