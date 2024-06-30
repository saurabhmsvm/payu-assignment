import React from 'react';

const Revenue = ({ salesData, productsData, selectedDate, selectedTime, selectedProduct, selectedStore }) => {
  // Function to calculate revenue based on selected filters
  const calculateRevenue = () => {
    // Calculate revenue
    const totalRevenue = salesData.reduce((acc, sale) => {
      const product = productsData.find(product => product.Product_ID === sale.Product_ID);

      if (!product || !product.Product_Price) {
        console.warn(`Product or Product Price not found for Product ID: ${sale.Product_ID}`);
        return acc;
      }

      const productPrice = parseFloat(product.Product_Price.replace('$', ''));
      const revenue = productPrice * parseInt(sale.Units, 10);

      return acc + revenue;
    }, 0);

    return totalRevenue;
  };

  const revenue = calculateRevenue();

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-red-900">Revenue Metrics</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-200 p-4 rounded-md">
          <p className="text-2xl font-bold text-gray-900">${revenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
