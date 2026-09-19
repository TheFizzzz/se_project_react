import "./UserAvatar.css";

function UserAvatar({ user, className = "" }) {
  const name = user?.name || "User";
  return user?.avatar ? (
    <img
      className={`user-avatar ${className}`}
      src={user.avatar}
      alt={`${name}'s avatar`}
    />
  ) : (
    <span
      className={`user-avatar user-avatar_placeholder ${className}`}
      aria-label={`${name}'s avatar`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export default UserAvatar;
