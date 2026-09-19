import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  onCardLike,
  onSignOut,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <SideBar onSignOut={onSignOut} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
