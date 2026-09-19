import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";
import { getWeatherData, processWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }
    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

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
    if (isLoggedIn) setActiveModal("add-garment");
  };

  const handleOpenItemModal = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setFormError("");
  };

  const openModal = (name) => {
    setFormError("");
    setActiveModal(name);
  };

  const finishLogin = (credentials, resetForm) =>
    authorize(credentials)
      .then(({ token }) => {
        if (!token) throw new Error("The server did not return a token");
        localStorage.setItem("jwt", token);
        return checkToken(token).then((user) => ({ token, user }));
      })
      .then(({ user }) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm?.();
        handleCloseModal();
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setFormError(error.message);
        console.error(error);
      });

  const handleRegister = (values, resetForm) => {
    register(values)
      .then(() => {
        resetForm();
        return finishLogin({ email: values.email, password: values.password });
      })
      .catch((error) => {
        setFormError(error.message);
        console.error(error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  const handleAddItem = (item, resetForm) => {
    addItem(
      {
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather,
      },
      localStorage.getItem("jwt"),
    )
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        resetForm();
        handleCloseModal();
      })
      .catch((error) => {
        setFormError(error.message);
        console.error(error);
      });
  };

  const handleOpenConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = (card) => {
    deleteItem(card._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        setCardToDelete({});
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (item) => {
    if (!isLoggedIn) return;
    const token = localStorage.getItem("jwt");
    const isLiked = item.likes?.some(
      (id) => String(id?._id || id) === String(currentUser._id),
    );
    const request = isLiked ? removeCardLike : addCardLike;
    request(item._id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((card) => (card._id === item._id ? updatedItem : card)),
        );
      })
      .catch(console.error);
  };

  const handleUpdateProfile = (values) => {
    updateProfile(values, localStorage.getItem("jwt"))
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch((error) => {
        setFormError(error.message);
        console.error(error);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <h1 className="visually-hidden">WTWR — What to Wear?</h1>
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleOpenAddGarmentModal={handleOpenAddGarmentModal}
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => openModal("login")}
              onOpenRegister={() => openModal("register")}
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
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthLoading={isAuthLoading}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      handleOpenItemModal={handleOpenItemModal}
                      handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                      onEditProfile={() => openModal("edit-profile")}
                    />
                  </ProtectedRoute>
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
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegister={handleRegister}
              onOpenLogin={() => openModal("login")}
              error={formError}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={finishLogin}
              onOpenRegister={() => openModal("register")}
              error={formError}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              onUpdate={handleUpdateProfile}
              currentUser={currentUser}
              error={formError}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
