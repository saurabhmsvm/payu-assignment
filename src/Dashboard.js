import React, { useState, useEffect } from 'react';
import { readString } from 'react-papaparse';
import Revenue from './components/Revenue';
import Profit from './components/Profit';
import Loss from './components/Loss';
import Inventory from './components/Inventory';
import OutOfStock from './components/OutOfStock';
import FilterControls from './FilterControls';
import UnitsSoldMap from './components/UnitsSoldMap';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch('https://raw.githubusercontent.com/saurabhmsvm/payu-assignment/main/public/sales-data.csv');
        const productsResponse = await fetch('https://raw.githubusercontent.com/saurabhmsvm/payu-assignment/main/public/products-data.csv');
        const inventoryResponse = await fetch('https://raw.githubusercontent.com/saurabhmsvm/payu-assignment/main/public/inventory-data.csv');
        const storesResponse = await fetch('https://raw.githubusercontent.com/saurabhmsvm/payu-assignment/main/public/stores-data.csv');

        const salesText = await salesResponse.text();
        const productsText = await productsResponse.text();
        const inventoryText = await inventoryResponse.text();
        const storesText = await storesResponse.text();

        const salesResult = readString(salesText, { header: true }).data;
        const productsResult = readString(productsText, { header: true }).data;
        const inventoryResult = readString(inventoryText, { header: true }).data;
        const storesResult = readString(storesText, { header: true }).data;

        setSalesData(salesResult);
        setProductsData(productsResult);
        setInventoryData(inventoryResult);
        setStoresData(storesResult);
      } catch (error) {
        console.error('Error fetching or parsing the files:', error);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on selected filters
  const filteredSalesData = salesData.filter(sale => {
    if (selectedDate && sale.Date !== selectedDate) return false;
    if (selectedTime && sale.Time !== selectedTime) return false;
    if (selectedProduct && sale.Product_ID !== selectedProduct) return false;
    if (selectedStore && sale.Store_ID !== selectedStore) return false;
    return true;
  });

  // Store map object
  const storeMap = {
    1: "Maven Toys Guadalajara 1",
    2: "Maven Toys Monterrey 1",
    3: "Maven Toys Guadalajara 2",
    4: "Maven Toys Saltillo 1",
    5: "Maven Toys La Paz 1",
    6: "Maven Toys Mexicali 1",
    7: "Maven Toys Monterrey 2",
    8: "Maven Toys Pachuca 1",
    9: "Maven Toys Ciudad de Mexico 1",
    10: "Maven Toys Campeche 1",
    11: "Maven Toys Cuernavaca 1",
    12: "Maven Toys Chetumal 1",
    13: "Maven Toys Mexicali 2",
    14: "Maven Toys Guanajuato 1",
    15: "Maven Toys Tuxtla Gutierrez 1",
    16: "Maven Toys San Luis Potosi 1",
    17: "Maven Toys Toluca 1",
    18: "Maven Toys Merida 1",
    19: "Maven Toys Puebla 1",
    20: "Maven Toys Zacatecas 1",
    21: "Maven Toys Santiago 1",
    22: "Maven Toys Guanajuato 2",
    23: "Maven Toys Chihuahua 1",
    24: "Maven Toys Aguascalientes 1",
    25: "Maven Toys Ciudad Victoria 1",
    26: "Maven Toys Campeche 2",
    27: "Maven Toys Oaxaca 1",
    28: "Maven Toys Puebla 2",
    29: "Maven Toys Xalapa 1",
    30: "Maven Toys Guadalajara 3",
    31: "Maven Toys Ciudad de Mexico 2",
    32: "Maven Toys Hermosillo 1",
    33: "Maven Toys Monterrey 3",
    34: "Maven Toys Villahermosa 1",
    35: "Maven Toys Chilpancingo 1",
    36: "Maven Toys Morelia 1",
    37: "Maven Toys Ciudad de Mexico 3",
    38: "Maven Toys Chihuahua 2",
    39: "Maven Toys Xalapa 2",
    40: "Maven Toys Toluca 2",
    41: "Maven Toys Hermosillo 2",
    42: "Maven Toys Hermosillo 3",
    43: "Maven Toys Durango 1",
    44: "Maven Toys Puebla 3",
    45: "Maven Toys Ciudad de Mexico 4",
    46: "Maven Toys Guadalajara 4",
    47: "Maven Toys Monterrey 4",
    48: "Maven Toys Saltillo 2",
    49: "Maven Toys Culiacan 1",
    50: "Maven Toys Guanajuato 3"
    };

    const productMap = {
      1: "Action Figure",
      2: "Animal Figures",
      3: "Barrel O' Slime",
      4: "Chutes & Ladders",
      5: "Classic Dominoes",
      6: "Colorbuds",
      7: "Dart Gun",
      8: "Deck Of Cards",
      9: "Dino Egg",
      10: "Dinosaur Figures",
      11: "Etch A Sketch",
      12: "Foam Disk Launcher",
      13: "Gamer Headphones",
      14: "Glass Marbles",
      15: "Hot Wheels 5-Pack",
      16: "Jenga",
      17: "Kids Makeup Kit",
      18: "Lego Bricks",
      19: "Magic Sand",
      20: "Mini Basketball Hoop",
      21: "Mini Ping Pong Set",
      22: "Monopoly",
      23: "Mr. Potatohead",
      24: "Nerf Gun",
      25: "PlayDoh Can",
      26: "PlayDoh Playset",
      27: "PlayDoh Toolkit",
      28: "Playfoam",
      29: "Plush Pony",
      30: "Rubik's Cube",
      31: "Splash Balls",
      32: "Supersoaker Water Gun",
      33: "Teddy Bear",
      34: "Toy Robot",
      35: "Uno Card Game"
    };

  return (
    <div className="dashboard-container">
      <h1 className="text-4xl font-bold mb-4"> Dashboard(PayU Assignment)</h1>
      <FilterControls
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        storesData={storesData}
        productsData={productsData}
      />

      {/* Render UnitsSoldMap only if all filters are null */}
      {!selectedDate && !selectedTime && !selectedStore && !selectedProduct && (
        <UnitsSoldMap salesData={filteredSalesData} storeMap={storeMap} />
      )}

      <div className="bg-white shadow-md rounded-lg flex mt-20 mb-10">
        {/* Revenue Component */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <Revenue
            salesData={filteredSalesData}
            productsData={productsData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedProduct={selectedProduct}
            selectedStore={selectedStore}
          />
        </div>

        {/* Profit Component */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <Profit
            salesData={filteredSalesData}
            productsData={productsData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedProduct={selectedProduct}
            selectedStore={selectedStore}
          />
        </div>

        {/* Loss Component */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <Loss
            salesData={filteredSalesData}
            productsData={productsData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedProduct={selectedProduct}
            selectedStore={selectedStore}
          />
        </div>
      </div>

      {/* Other Dashboard Components */}
      <Inventory
        inventoryData={inventoryData}
        selectedStore={selectedStore}
        selectedProduct={selectedProduct}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        storeMap={storeMap}
        productMap={productMap}
      />
      <OutOfStock
        inventoryData={inventoryData}
        selectedStore={selectedStore}
        selectedProduct={selectedProduct}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        storeMap={storeMap}
        productMap={productMap}
      />
    </div>
  );
};

export default Dashboard;
