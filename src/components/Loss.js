import React from 'react';

const Loss = ({ salesData, productsData, selectedDate, selectedTime, selectedProduct, selectedStore }) => {
  // Function to calculate loss based on selected filters
  const calculateLoss = () => {
    // Calculate loss
    const groupedByStore = salesData.reduce((acc, sale) => {
      const product = productsData.find(p => p.Product_ID === sale.Product_ID);
      const store = sale.Store || 'Unknown Store'; // Default to 'Unknown Store'

      if (!product || !product.Product_Price || !product.Product_Cost) {
        console.warn(`Product, Product Price or Product Cost not found for Product ID: ${sale.Product_ID}`);
        return acc;
      }

      const productCost = parseFloat(product.Product_Cost.replace('$', ''));
      const productPrice = parseFloat(product.Product_Price.replace('$', ''));
      const revenue = productPrice * parseInt(sale.Units, 10);
      const cost = productCost * parseInt(sale.Units, 10);
      const profit = revenue - cost;

      if (!acc[store]) {
        acc[store] = 0;
      }
      if (profit < 0) {
        acc[store] += Math.abs(profit); // Calculate loss as absolute value of negative profit
      }

      return acc;
    }, {});

    return groupedByStore;
  };

  const losses = calculateLoss();

  return (
    <div className="bg-red-100 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-red-900">Loss Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(losses).map(([store, loss]) => (
          <div key={store} className="bg-red-100 p-4 rounded-md">
            <p className="text-2xl font-bold text-gray-900">${loss.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loss;
