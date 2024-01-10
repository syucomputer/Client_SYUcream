import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';  // Login 컴포넌트를 import

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Login 컴포넌트 사용 */}
      </header>
      <div className="WhiteSquare">
        <h2><Login /></h2> 
      </div>
      <div className ="RegisterButton">회원가입</div>
    </div>
  );
}

export default App;
