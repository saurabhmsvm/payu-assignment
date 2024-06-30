import React from 'react';
import { Bar } from 'react-chartjs-2';

const Inventory = ({ inventoryData, selectedStore, selectedProduct, selectedDate, selectedTime, storeMap, productMap }) => {
  const calculateInventory = () => {
    // Filter inventoryData based on selectedStore, selectedProduct, selectedDate, selectedTime
    const filteredInventory = inventoryData.filter(item => {
      let dateCondition = true;
      let timeCondition = true;
      let storeCondition = true;
      let productCondition = true;

      // Apply filters if selected
      if (selectedDate && item.Date !== selectedDate) {
        dateCondition = false;
      }
      if (selectedTime && item.Time !== selectedTime) {
        timeCondition = false;
      }
      if (selectedStore && item.Store_ID !== selectedStore) {
        storeCondition = false;
      }
      if (selectedProduct && item.Product_ID !== selectedProduct) {
        productCondition = false;
      }

      // Return true only if all conditions match
      return dateCondition && timeCondition && storeCondition && productCondition;
    });

    return filteredInventory.map(item => ({
      ...item,
      Stock_On_Hand: parseInt(item.Stock_On_Hand, 10),
    }));
  };

  // Function to prepare data for bar graph
  const prepareBarChartData = () => {
    const inventory = calculateInventory();
    const labels = inventory.map(item => productMap[item.Product_ID]);
    const data = inventory.map(item => item.Stock_On_Hand);

    // Generate random colors for each bar
    const backgroundColors = inventory.map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Stock On Hand',
          backgroundColor: backgroundColors,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: backgroundColors.map(color => `${color.slice(0, -2)}0.8)`),
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: data,
        },
      ],
    };
  };

  // Options for bar graph
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold mt-4 mb-4">Inventory Data</h1>
      {!(storeMap[selectedStore]) ? (<h2>Inventory From Every Store</h2>) : (<h2 className='italic'>Store Name: {storeMap[selectedStore]}</h2>)}
      {calculateInventory().length > 0 ? (
        <Bar data={prepareBarChartData()} options={options} />
      ) : (
        <p className="text-center">No inventory data available for the selected filters.</p>
      )}
    </div>
  );
};

export default Inventory;
