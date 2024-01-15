import Button from "./Button";
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const loginButton = {
        width: '80px',
        height: '30px',
        backgroundColor: '#ffffff',
        color: 'black',
        border: '1px solid black',
        borderRadius: '8px',
        marginRight: '10px'
    }
    const handlerLogin = () => {
        navigate('/login')
    }

    const signupButton = {
        width: '80px',
        height: '30px',
        backgroundColor: 'black',
        color: '#ffffff',
        borderRadius: '8px'
    }
    const handlerSignup = () => {
        navigate('/signup')
    }
    return (
        <nav style={{ width: '100%', height: '60px', backgroundColor: '#ffffff', position: 'relative' }}>
            <div style={{ display: 'flex', position: "absolute", right: 0, alignItems: 'center'}}>
                <Button label="로그인" style={loginButton} onClick={handlerLogin}/>
                <Button label="회원가입" style={signupButton} onClick={handlerSignup}/>
            </div>
        </nav>
    )
}

export default Nav;