import React from 'react';

// Sample product data fetched from backend or API
const products = [
  {
    id: 1,
    name: 'JssCrackers',
    description: 'High-quality fireworks for all celebrations.',
    price: '$300',
    offer: '50%',
    delivery: '1 day',
    stars: '⭐⭐⭐⭐⭐',
    image: 'https://via.placeholder.com/150', // Example image URL
    seller: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      address: '123 Main St, Cityville',
    },
  },
  {
    id: 2,
    name: 'JssCrackers',
    description: 'Great selection of fireworks for your party.',
    price: '$400',
    offer: '40%',
    delivery: '2 days',
    stars: '⭐⭐⭐⭐',
    image: 'https://via.placeholder.com/150', // Example image URL
    seller: {
      name: 'Jane Smith',
      phone: '+0987654321',
      email: 'jane@example.com',
      address: '456 Oak Ave, Townsville',
    },
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div className="overflow-x-auto ml-56">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b">Seller Details</th>
            <th className="p-4 border-b">Image</th>
            <th className="p-4 border-b">Product Name</th>
            <th className="p-4 border-b">Description</th>
            <th className="p-4 border-b">Price</th>
            <th className="p-4 border-b">Offer</th>
            <th className="p-4 border-b">Delivery</th>
            <th className="p-4 border-b">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="p-4 border-b text-center">{product.id}</td>
              <td className="p-4 border-b">
                <p className="font-medium">Name: {product.seller.name}</p>
                <p>Phone: {product.seller.phone}</p>
                <p>Email: {product.seller.email}</p>
                <p>Address: {product.seller.address}</p>
              </td>
              <td className="p-4 border-b text-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-4 border-b">{product.name}</td>
              <td className="p-4 border-b">{product.description}</td>
              <td className="p-4 border-b">{product.price}</td>
              <td className="p-4 border-b">{product.offer}</td>
              <td className="p-4 border-b">{product.delivery}</td>
              <td className="p-4 border-b">{product.stars}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
