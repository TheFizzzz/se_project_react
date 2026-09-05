import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  const handleAddItem = (item) => {
    const newItem = {
      _id: Date.now(),
      name: item.name,
      weather: item.weather,
      link: item.imageUrl,
    };

    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  };

  const handleDeleteItem = (card) => {
    setClothingItems((items) => items.filter((item) => item._id !== card._id));
    handleCloseModal();
  };

  return (
    <div className="page">
      <h1 className="visually-hidden">WTWR — What to Wear?</h1>
      <div className="page__content">
        <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
        <Main
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
        />
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
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
}

export default App;
