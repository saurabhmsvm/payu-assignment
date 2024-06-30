import React from 'react';

const FilterControls = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedStore,
  setSelectedStore,
  selectedProduct,
  setSelectedProduct,
  storesData,
  productsData,
}) => {
  const handleDateChange = event => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = event => {
    setSelectedTime(event.target.value);
  };

  const handleStoreChange = event => {
    setSelectedStore(event.target.value);
  };

  const handleProductChange = event => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div className="filter-controls sticky top-0 z-50 mb-8 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 p-4 shadow-md rounded-lg">
  <div className="flex flex-wrap items-center gap-4">
    <div className="flex items-center gap-2 text-white">
      <label htmlFor="date-select" className="font-semibold">Date:</label>
      <input
        id="date-select"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black"
      />
    </div>
    <div className="flex items-center gap-2 text-white">
      <label htmlFor="time-select" className="font-semibold">Time:</label>
      <input
        id="time-select"
        type="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black"
      />
    </div>
    <div className="flex items-center gap-2 text-white">
      <label htmlFor="store-select" className="font-semibold">Store:</label>
      <select
        id="store-select"
        value={selectedStore}
        onChange={handleStoreChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black"
      >
        <option value="">All Stores</option>
        {storesData.map(store => (
          <option key={store.Store_ID} value={store.Store_ID}>{store.Store_Name}</option>
        ))}
      </select>
    </div>
    <div className="flex items-center gap-2 text-white">
      <label htmlFor="product-select" className="font-semibold">Product:</label>
      <select
        id="product-select"
        value={selectedProduct}
        onChange={handleProductChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black"
      >
        <option value="">All Products</option>
        {productsData.map(product => (
          <option key={product.Product_ID} value={product.Product_ID}>{product.Product_Name}</option>
        ))}
      </select>
    </div>
  </div>
</div>
  );
};

export default FilterControls;
