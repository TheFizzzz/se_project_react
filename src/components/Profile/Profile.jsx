import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
      />
    </div>
  );
}

export default Profile;
