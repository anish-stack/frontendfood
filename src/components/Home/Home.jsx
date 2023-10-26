import React from 'react';
import Carsoul from '../Carasoul/Carsoul';
import Product from '../Product/product';
import Discount from '../extra/Discount';
import ContactForm from '../extra/Contact';


const Home = ({ addToCart }) => {
  return (
    <>
      <Carsoul />
      <Product addToCart={addToCart} />
      <Discount/>
      <ContactForm/>
    </>
  );
}

export default Home;
