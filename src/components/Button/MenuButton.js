const MenuButton = ({ label, title, onClick }) => {

    const style = {
        width: '100px',
        height: '100px',
        backgroundColor: '#6C63FF',
        color: 'white'
    }

    const handleClick = () => {
        onClick(title);
    }

    return <button title={title} style={style} onClick={handleClick}>
        {label}
    </button>
}

export default MenuButton;