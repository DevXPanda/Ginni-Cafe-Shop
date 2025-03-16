import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Pizza, Gift } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[500px]" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.4)"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Ginni's Cafe</h1>
            <p className="text-xl md:text-2xl mb-8">Delicious cakes, pastries, and savory treats made with love</p>
            <Link 
              to="/menu" 
              className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors inline-flex items-center"
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
                <Cake className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cakes & Pastries</h3>
              <p className="text-gray-600 mb-4">Delicious cakes for birthdays, anniversaries, and special occasions.</p>
              <Link to="/menu" className="text-pink-600 font-medium hover:text-pink-700">
                View Selection
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
                <Pizza className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Food</h3>
              <p className="text-gray-600 mb-4">Tasty pizzas, burgers, and rolls made with premium ingredients.</p>
              <Link to="/menu" className="text-pink-600 font-medium hover:text-pink-700">
                View Selection
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
                <Gift className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Party Decorations</h3>
              <p className="text-gray-600 mb-4">Everything you need for birthday decorations and celebrations.</p>
              <Link to="/menu" className="text-pink-600 font-medium hover:text-pink-700">
                View Selection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Popular Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-pink-600 font-bold">₹{item.price}</span>
                    <Link 
                      to="/menu" 
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4" 
                          fill={i < testimonial.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our menu and place your order now. We offer fast delivery and the best quality food in town!
          </p>
          <Link 
            to="/menu" 
            className="bg-white text-pink-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            View Our Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sample data
import { Star } from 'lucide-react';

const popularItems = [
  {
    id: 1,
    name: 'Chocolate Truffle Cake',
    price: '599',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    price: '299',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Cheese Burger',
    price: '199',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Birthday Decoration Kit',
    price: '999',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    comment: 'The cakes from Ginni\'s Cafe are absolutely delicious! I ordered a birthday cake and everyone loved it.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Rahul Patel',
    rating: 4,
    comment: 'Great food and quick delivery. The pizzas are amazing and the birthday decorations were perfect for my son\'s party.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Anita Desai',
    rating: 5,
    comment: 'I\'ve been ordering from Ginni\'s for all my events. Their pastries are the best in town and the service is excellent!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

export default Home;