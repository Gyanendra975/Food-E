import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Modal from '../components/modal';
import Cart from '../components/Cart';

export default function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getData = async () => {
    let response = await fetch("http://localhost:5000/item/display", {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      }
    });

    response = await response.json();
    console.log(response[0], response[1]);
    setFoodItems(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <Navbar openCart={openCart} />
      </div>
      <div>
        <Carousel onSearch={handleSearch} />
      </div>
      <div className='container'>
        {foodCategory.length > 0 ? (
          foodCategory.map((foodCat) => (
            <div className='row mb-3' key={foodCat._id}>
              <div className='fs-3 m-3'>
                {foodCat.CategoryName}
              </div>
              <hr />
              {filteredFoodItems.length > 0 ? (
                filteredFoodItems
                  .filter((item) => item.CategoryName === foodCat.CategoryName)
                  .map(item => (
                    <div key={item._id} className='col-12 col-md-6 col-lg-3' style={{ margin: '40px' }}>
                      <Card
                        foodItem={item}
                        options={item.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <p>No items found</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <Footer />
      </div>
      <Modal isOpen={isCartOpen} onClose={closeCart}>
        <Cart />
      </Modal>
    </div>
  );
}
