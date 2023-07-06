import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/header";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import Addfood from "./components/Addfood";
import Order from "./components/Order";
function App() {
  const [foods, setFoods] = useState([]);
  const [orders, setorders] = useState([]);
  const [customers, setcustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetch("/foods")
      .then((r) => r.json())
      .then((foods) => setFoods(foods));
  }, []);

  function handleAddfood(newFood) {
    setFoods([...foods, newFood]);
  }


  function handleDeleteFood(id) {
    const updatedfoods = foods.filter((food) => food.id !== id);
    setFoods(updatedfoods);
  }

  function handleUpdateFood(updatedfoodObj) {
    const updatedfood = foods.map((food) => {
      if (food.id === updatedfoodObj.id) {
        return updatedfoodObj;
      } else {
        return food;
      }
    });
    setFoods(updatedfood);
  }
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
 
  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <div className="wrapper">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Main foods = {foods} user ={user}/>} />
          <Route path="/addfood" element={<Addfood user ={user}/>} />
          <Route path="/order" element={<Order foods = {foods} user ={user}/>} />

          {/* <Route path="/admin" element={<Admin user ={user}  foods ={foods} onFoodDelete={handleDeleteFood}
        onUpdateFood={handleUpdateFood}/>} /> */}

        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
