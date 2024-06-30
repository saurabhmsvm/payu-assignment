import React from 'react';

const OutOfStock = ({ inventoryData, selectedStore, selectedProduct, selectedDate, selectedTime, storeMap, productMap }) => {
  const calculateInventory = () => {
    return inventoryData.map(item => ({
      ...item,
      Stock_On_Hand: parseInt(item.Stock_On_Hand, 10),
    }));
  };

  const outOfStockProducts = () => {
    const inventory = calculateInventory();
    const outOfStock = inventory.filter(item => item.Stock_On_Hand === 0);

    // Apply filters based on selectedStore, selectedProduct, selectedDate, selectedTime
    let filteredProducts = outOfStock;

    if (selectedStore && selectedStore !== '') {
      filteredProducts = filteredProducts.filter(item => item.Store_ID === selectedStore);
    }

    if (selectedDate && selectedDate !== '') {
      // Assuming item.date is the date field to compare against selectedDate
      filteredProducts = filteredProducts.filter(item => item.date === selectedDate);
    }

    if (selectedTime && selectedTime !== '') {
      // Assuming item.time is the time field to compare against selectedTime
      filteredProducts = filteredProducts.filter(item => item.time === selectedTime);
    }

    return filteredProducts;
  };

  return (
    <div className="max-w-full overflow-x-auto mt-20">
      <h2 className="text-3xl font-bold mb-4">Out of Stock Products</h2>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead className="bg-gray-700">
          <tr>
            <th className="border px-4 py-2">Store Name</th>
            <th className="border px-4 py-2">Product Name</th>
          </tr>
        </thead>
        <tbody>
          {outOfStockProducts().length > 0 ? (
            outOfStockProducts().map((item, index) => (
              <tr key={index} className={`bg-gray-${index % 2 === 0 ? '900' : '800'}`}>
                <td className="border px-4 py-2">{storeMap[item.Store_ID]}</td>
                <td className="border px-4 py-2">{productMap[item.Product_ID]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-center">
                No out of stock products available{selectedStore ? ` for Store ${selectedStore}` : ''}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OutOfStock;
