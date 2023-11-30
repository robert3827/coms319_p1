import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import MainPage from "./pages/mainPage";
import Pokemart from "./pages/pokemart";
import Carousel from 'react-bootstrap/Carousel';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Credits from "./pages/credits";
import YourCollection from "./pages/yourCollection";
import Menubar from "./components/menubar";





	function App() {
		return (
			<>
				<BrowserRouter>
					<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="pokemart" element={<Pokemart />} />
							<Route path="yourCollection" element={<YourCollection />} />
							<Route path="credits" element={<Credits />} />
						
					</Routes>
				</BrowserRouter>


			</>


		);
	}


export default App;
