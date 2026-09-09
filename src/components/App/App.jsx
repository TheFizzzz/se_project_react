import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { getWeatherData, processWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(processWeatherData(data));
      })
      .catch(console.error)
      .finally(() => {
        setIsWeatherLoading(false);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleOpenAddGarmentModal = () => {
    setActiveModal("add-garment");
  };

  const handleOpenItemModal = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleAddItem = (item, resetForm) => {
    addItem({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleOpenConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        setCardToDelete({});
        handleCloseModal();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <h1 className="visually-hidden">WTWR — What to Wear?</h1>
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  isWeatherLoading={isWeatherLoading}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={handleCloseModal}
            onAddItem={handleAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            card={selectedCard}
            onOpenConfirmationModal={handleOpenConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCloseModal}
            onConfirm={handleCardDelete}
            card={cardToDelete}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
