// src/app/page.js
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import SuccessStories from "./components/TestimonialsSection";
import MyWork from "./components/MyWork";
import IndustryPartnerships from "./components/Contactpage";
import WhatsAppButton from './components/WhatsAppButton';
import HomeDetails from "./components/HomeDetails";
import LatestPosts from "./components/LatestPosts";

const Page = () => {
  return (
    <>
      <Header />
      <main id="main">
        <Body />
        <MyWork />
        <HomeDetails />
        <LatestPosts />
        <SuccessStories />
        <IndustryPartnerships />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Page;
