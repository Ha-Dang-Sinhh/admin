import Home from './pages/home/Home'
import React, {useEffect,useState} from 'react';
import {authService} from './services/authService'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

function App(props) {

    return (
        <div className="App pb-10">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;