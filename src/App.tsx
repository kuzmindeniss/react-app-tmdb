import React from 'react';
import logo from './logo.svg';
import 'styles/globals.scss';
import Header from 'components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LayoutHeader } from 'components/Layout/Layout';
import MainPage from 'pages/MainPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from 'pages/SearchPage';
import TVPage from 'pages/TVPage';
import MoviePage from 'pages/MoviePage';
import MoviesPage from 'pages/MoviesPage';
import TVsPage from 'pages/TVsPage';
import PersonsPage from 'pages/PersonsPage';
import PersonPage from 'pages/PersonPage';

function App() {
    return (<Router>
        <LayoutHeader>
            <Routes>
                <Route path="search" element={<SearchPage/>} />
                <Route path="tv" element={<TVsPage/>}/>
                <Route path="tv/:id" element={<TVPage/>}/>
                <Route path="movie" element={<MoviesPage/>} />
                <Route path="movie/:id" element={<MoviePage/>}/>
                <Route path="person" element={<PersonsPage/>} />
                <Route path="person/:id" element={<PersonPage/>} />
                <Route path="/" element={<MainPage/>} />
            </Routes>
            <ToastContainer
                autoClose={10000}
            />
        </LayoutHeader>
    </Router>);
}

export default App;
