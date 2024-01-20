import "./Button.css"
const Button = ({ label, onClick, className }) => {
    const defaultStyle = "defaultStyle"
    return (
        <button onClick={onClick} className={`${defaultStyle} ${className}`}>
            {label}
        </button>
    );
}

export default Button;