import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UnitsSoldMap = ({ salesData, storeMap }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);  

  useEffect(() => {
    if (salesData.length === 0) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');
    const storeSales = {};

    // Group sales data by Store_ID and calculate units sold for each store
    salesData.forEach(sale => {
      const storeID = sale.Store_ID;
      if (!storeSales[storeID]) {
        storeSales[storeID] = 0;
      }
      storeSales[storeID] += parseInt(sale.Units, 10);
    });

    // Prepare data for chart
    const storeIDs = Object.keys(storeSales);
    const dataPoints = storeIDs.map(storeID => ({
      x: storeID,
      y: storeSales[storeID],
      r: Math.log(storeSales[storeID]) * 0.6 // Smaller point size
    }));

    // Generate dynamic colors for each store
    const dynamicColors = storeIDs.map((_, index) => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    });

    // Create new chart instance - Change type to 'bubble' for point size
    chartInstance.current = new Chart(ctx, {
      type: 'bubble', // Change chart type to 'bubble'
      data: {
        datasets: [{
          label: 'Units Sold',
          data: dataPoints,
          backgroundColor: dynamicColors,
          borderColor: dynamicColors,
          hoverBackgroundColor: dynamicColors,
          hoverBorderColor: dynamicColors,
          hoverRadius: 8, // Increase hover radius for better interaction
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const { x: storeID, y: unitsSold } = tooltipItem.raw;
                return `Store: ${storeMap[storeID]}, Units Sold: ${unitsSold}`;
              }
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false // Hide x-axis
          },
          y: {
            display: true // Show y-axis
          }
        }
      }
    });

    return () => {
      // Cleanup on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesData, storeMap]);

  return (
    <>
      <h2 className="mt-10 italic underline">Number of Units Sold by Every Store (Hover Over Points for exact data)</h2>
      <div className="chart-container mt-4" style={{ position: 'relative' }}>
        <canvas
          ref={chartContainer}
          id="unitsSoldChart"
          width="400"
          height="300"
          style={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
          onMouseEnter={() => { chartContainer.current.style.transform = 'scale(1.07)'; }}
          onMouseLeave={() => { chartContainer.current.style.transform = 'scale(1)'; }}
        ></canvas>
      </div>
    </>
  );
};

export default UnitsSoldMap;
