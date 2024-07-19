import "./MenuButton.css";
const MenuButton = ({ label, title, className, onClick }) => {
  const defaultStyle = "hello";
  const handleClick = () => {
    onClick(title);
  };

  return (
    <button
      title={title}
      className={`${defaultStyle} ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default MenuButton;
