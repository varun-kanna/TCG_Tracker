import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage/HomePage';
import SignUp from './routes/SignUp/SignUp'; // http://localhost:5173/signup
import LogIn from './routes/LogIn/LogIn'; // http://localhost:5173/login
import CardDetail from './routes/CardDetail/CardDetail'; // ex for card detail: http://localhost:5173/card-detail/base1-2
import PokemonCards from './routes/PokemonCards/PokemonCards'; // http://localhost:5173/pokemon-cards -> sends to pikachu for default
import ForgotPassword from './routes/ForgotPassword/ForgotPassword'; // http://localhost:5173/forgot-password
import Collection from './routes/Collection/Collection'; // http://localhost:5173/collection
import Upload from './routes/Upload/Upload'; // http://localhost:5173/upload
import BulkGrading from './routes/BulkGrading/BulkGrading'; // http://localhost:5173/bulk-grading
import Help from './routes/Help/Help'; // http://localhost:5173/help

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/upload' element={<Upload />} />
					<Route path='/collection' element={<Collection />} />
					<Route path='/card-detail/:id' element={<CardDetail />} />
					<Route path='/pokemon-cards' element={<PokemonCards />} />
					<Route path='/bulk-grading' element={<BulkGrading />} />
					<Route path='/help' element={<Help />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
