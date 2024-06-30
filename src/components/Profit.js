import React from 'react';

const Profit = ({ salesData, productsData, selectedDate, selectedTime, selectedProduct, selectedStore }) => {
  // Function to calculate profit based on selected filters
  const calculateProfit = () => {
    // Calculate profit
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
      acc[store] += profit;

      return acc;
    }, {});

    return groupedByStore;
  };

  const profits = calculateProfit();

  return (
    <div className="bg-green-100 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-red-900">Profit Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(profits).map(([store, profit]) => (
          <div key={store} className="bg-green-100 p-4 rounded-md">
            <p className="text-2xl font-bold text-gray-900">${profit.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profit;
