const Button = ({ label, onClick, style }) => {
    const defaultStyle = {
        backgroundColor: '#D9D9D9',
        color: '#ffffff',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
    }

    const totalStyle = {...defaultStyle, ...style}
    return (
        <button onClick={onClick} style={totalStyle}>
            {label}
        </button>
    );
}

export default Button;