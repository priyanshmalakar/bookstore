import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, Star, MapPin, Phone, Mail, Calendar, User, Filter, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';

// Custom Hook for Cart Management
const useCart = () => {
  const [cart, setCart] = useState([]);
  const addToCart = (book) => setCart(prev => [...prev, book]);
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  return { cart, addToCart, removeFromCart, cartCount: cart.length };
};

// Sample Book Data
const sampleBooks = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", price: 499, rating: 4.5, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", category: "Fiction", tag: "Staff Pick" },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 599, rating: 4.8, cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=450&fit=crop", category: "Non-Fiction", tag: "Bestseller" },
  { id: 3, title: "Where the Crawdads Sing", author: "Delia Owens", price: 450, rating: 4.6, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop", category: "Fiction", tag: "New Arrival" },
  { id: 4, title: "The Hidden World", author: "Priya Sharma", price: 399, rating: 4.3, cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", category: "Fiction", tag: "Local Author" },
  { id: 5, title: "Stories for Children", author: "Multiple Authors", price: 299, rating: 4.7, cover: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=450&fit=crop", category: "Children", tag: "New Arrival" },
  { id: 6, title: "The Art of Thinking", author: "Ravi Menon", price: 549, rating: 4.4, cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=450&fit=crop", category: "Non-Fiction", tag: "Staff Pick" },
];

// Animated Bookmark Component
const FloatingBookmark = () => {
  return (
    <div className="absolute top-20 right-10 animate-float opacity-80 hidden lg:block">
      <div className="w-12 h-32 bg-gradient-to-b from-[#D4A017] to-[#B8860B] rounded-b-lg shadow-lg transform rotate-12">
        <div className="w-full h-4 bg-[#5C3A21] rounded-t-lg"></div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ cartCount, onCartClick }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F6F0E6] shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="text-2xl font-serif font-bold text-[#5C3A21]">Bibliophile</div>
          
          <nav className="hidden md:flex space-x-8">
            {['Shop', 'Events', 'Blog', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[#5C3A21] hover:text-[#0B4C4B] transition-colors duration-200 font-medium">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-[#0B4C4B]/10 rounded-lg transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-[#5C3A21]" />
            </button>
            <button className="p-2 hover:bg-[#0B4C4B]/10 rounded-lg transition-colors" aria-label="Wishlist">
              <Heart className="w-5 h-5 text-[#5C3A21]" />
            </button>
            <button onClick={onCartClick} className="p-2 hover:bg-[#0B4C4B]/10 rounded-lg transition-colors relative" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-[#5C3A21]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A017] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2" aria-label="Menu">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-[#F6F0E6] border-t border-[#5C3A21]/20">
          <nav className="px-4 py-4 space-y-3">
            {['Shop', 'Events', 'Blog', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-[#5C3A21] hover:text-[#0B4C4B] font-medium">
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#5C3A21] to-[#0B4C4B]">
      <div className="absolute inset-0 opacity-30">
        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover" />
      </div>
      
      <FloatingBookmark />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#F6F0E6] mb-6 animate-fadeIn">
          Find Your Next Story at Bibliophile
        </h1>
        <p className="text-xl md:text-2xl text-[#F6F0E6]/90 mb-10 animate-fadeIn" style={{animationDelay: '0.2s'}}>
          Curated books, local events, and a place to linger.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{animationDelay: '0.4s'}}>
          <a href="#shop" className="px-8 py-4 bg-[#D4A017] text-white font-semibold rounded-xl hover:bg-[#B8860B] transition-all duration-300 hover:shadow-xl hover:scale-105">
            Shop Bestsellers
          </a>
          <a href="#events" className="px-8 py-4 bg-transparent border-2 border-[#F6F0E6] text-[#F6F0E6] font-semibold rounded-xl hover:bg-[#F6F0E6] hover:text-[#5C3A21] transition-all duration-300">
            Visit Events
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#F6F0E6]" />
      </div>
    </section>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-20 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5C3A21] text-center mb-12">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-[#5C3A21]/80 leading-relaxed">
              At Bibliophile, we curate timeless reads, support local authors, and host community gatherings. 
              Our shelves are filled with carefully selected books that spark imagination, foster learning, 
              and bring people together.
            </p>
            <p className="text-lg text-[#5C3A21]/80 leading-relaxed">
              Founded in 2015, we've become a beloved neighborhood hub where book lovers discover their next 
              favorite story, meet fellow readers, and celebrate the written word.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop" alt="Bookstore interior" className="rounded-2xl shadow-lg h-48 w-full object-cover hover:scale-105 transition-transform duration-300" />
            <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop" alt="Reading corner" className="rounded-2xl shadow-lg h-48 w-full object-cover hover:scale-105 transition-transform duration-300 mt-8" />
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop" alt="Book shelves" className="rounded-2xl shadow-lg h-48 w-full object-cover hover:scale-105 transition-transform duration-300 -mt-8" />
            <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop" alt="Owner" className="rounded-2xl shadow-lg h-48 w-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Book Card Component
const BookCard = ({ book, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img src={book.cover} alt={book.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
        {book.tag && (
          <span className="absolute top-4 right-4 bg-[#D4A017] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {book.tag}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl text-[#5C3A21] mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-[#5C3A21]/70 mb-3">{book.author}</p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-[#D4A017] text-[#D4A017]' : 'text-gray-300'}`} />
          ))}
          <span className="ml-2 text-sm text-[#5C3A21]/70">{book.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#0B4C4B]">₹{book.price}</span>
          <div className="flex gap-2">
            <button className="p-2 bg-[#F6F0E6] hover:bg-[#0B4C4B]/10 rounded-lg transition-colors" aria-label="Add to wishlist">
              <Heart className="w-5 h-5 text-[#5C3A21]" />
            </button>
            <button onClick={() => onAddToCart(book)} className="px-4 py-2 bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-lg transition-colors font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shop Section
const Shop = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'New Arrivals', 'Fiction', 'Non-Fiction', 'Children', 'Local Authors', 'Staff Picks'];

  const filteredBooks = selectedCategory === 'All' 
    ? sampleBooks 
    : sampleBooks.filter(book => book.category === selectedCategory || book.tag === selectedCategory);

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5C3A21] text-center mb-12">Our Catalog</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'bg-[#0B4C4B] text-white shadow-lg' 
                  : 'bg-[#F6F0E6] text-[#5C3A21] hover:bg-[#0B4C4B]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Events Section
const Events = () => {
  const events = [
    { id: 1, title: "Author Signing: Priya Sharma", date: "Nov 15, 2025", time: "6:00 PM", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop" },
    { id: 2, title: "Book Club: Modern Classics", date: "Nov 20, 2025", time: "7:00 PM", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop" },
    { id: 3, title: "Children's Story Hour", date: "Nov 22, 2025", time: "3:00 PM", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop" },
  ];

  return (
    <section id="events" className="py-20 bg-[#0B4C4B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F6F0E6] text-center mb-12">Upcoming Events</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-[#D4A017] mb-3">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{event.date} • {event.time}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#5C3A21] mb-4">{event.title}</h3>
                <button className="w-full py-3 bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-lg font-semibold transition-colors">
                  RSVP Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    { name: "Anjali Verma", text: "Bibliophile is my happy place. The staff recommendations are always spot-on!", rating: 5 },
    { name: "Raj Malhotra", text: "Best bookstore in town. Love the cozy reading nooks and author events.", rating: 5 },
    { name: "Meera Iyer", text: "Found so many hidden gems here. The children's section is fantastic!", rating: 5 },
  ];

  return (
    <section className="py-20 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5C3A21] text-center mb-12">What Readers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4A017] text-[#D4A017]" />
                ))}
              </div>
              <p className="text-[#5C3A21]/80 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-[#5C3A21]">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5C3A21] text-center mb-12">Visit Us</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-[#D4A017] mt-1" />
              <div>
                <h3 className="font-bold text-lg text-[#5C3A21] mb-1">Location</h3>
                <p className="text-[#5C3A21]/70">123 Book Street, Literary Quarter<br/>Indore, Madhya Pradesh 452001</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-[#D4A017] mt-1" />
              <div>
                <h3 className="font-bold text-lg text-[#5C3A21] mb-1">Phone</h3>
                <p className="text-[#5C3A21]/70">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-[#D4A017] mt-1" />
              <div>
                <h3 className="font-bold text-lg text-[#5C3A21] mb-1">Email</h3>
                <p className="text-[#5C3A21]/70">hello@bibliophile.com</p>
              </div>
            </div>

            <a href="https://wa.me/919876543210?text=Hi%20Bibliophile!%20I%27d%20like%20to%20know%20more" 
               className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors font-semibold">
              Order on WhatsApp
            </a>
          </div>

          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-[#F6F0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-[#F6F0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
            <textarea placeholder="Message" rows="4" className="w-full px-4 py-3 bg-[#F6F0E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017]"></textarea>
            <button type="submit" className="w-full py-3 bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-lg font-semibold transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#5C3A21] text-[#F6F0E6] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Bibliophile</h3>
            <p className="text-[#F6F0E6]/70">Your neighborhood bookstore since 2015</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Shop', 'Events', 'Blog', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-[#F6F0E6]/70 hover:text-[#D4A017] transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Hours</h4>
            <p className="text-[#F6F0E6]/70">Mon - Sat: 10AM - 8PM<br/>Sunday: 11AM - 6PM</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-[#F6F0E6]/70 mb-3">Get monthly reading lists & events</p>
            <input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-[#F6F0E6]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017] mb-2" />
            <button className="w-full py-2 bg-[#D4A017] hover:bg-[#B8860B] rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="border-t border-[#F6F0E6]/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#F6F0E6]/70 mb-4 md:mb-0">© 2025 Bibliophile. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#D4A017] transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#D4A017] transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#D4A017] transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Cart Drawer
const CartDrawer = ({ isOpen, onClose, cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-[#5C3A21]">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b pb-4">
                  <img src={item.cover} alt={item.title} className="w-16 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#5C3A21]">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.author}</p>
                    <p className="font-bold text-[#0B4C4B] mt-1">₹{item.price}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-[#0B4C4B]">₹{total}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-xl font-semibold transition-colors">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

// Main App Component
export default function BibliophileBookstore() {
  const { cart, addToCart, removeFromCart, cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="font-sans bg-[#F6F0E6]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
        <main className="mt-20">
            <Hero />
            <About />
            <Shop onAddToCart={addToCart} />
            <Events />
            <Testimonials />
            <Contact />
        </main>
        <Footer />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={removeFromCart} />
    </div>
  );
}