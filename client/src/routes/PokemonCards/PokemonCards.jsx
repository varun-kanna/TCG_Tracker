import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import styles from './PokemonCards.module.css';
import PokemonBackground from '../../components/PokemonBackground/PokemonBackground';

function PokemonCards() {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const location = useLocation();

	const query = new URLSearchParams(location.search);
	const searchQuery = query.get('name') || 'Pikachu';

	const handleBackToSearch = () => {
		navigate('/');
	};

	const parseSearchQuery = (query) => {
		const parts = query.trim().toLowerCase().split(' ');
		const nameParts = [];
		let number = '';

		parts.forEach((part) => {
			if (!number && /^tg\d+/.test(part)) {
				number = part.match(/tg\d+(\/\d+)?/i)[0]; 
			} else if (!number && /^\d+/.test(part)) {
				number = part.match(/^\d+/)[0].replace(/^0+/, ''); // Remove leading zeros
			} else {
				nameParts.push(part);
			}
		});

		const name = nameParts.join(' ');
		return { name, number };
	};

	const { name: pokemonName, number: cardNumber } =
		parseSearchQuery(searchQuery);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				let query = `name:"${pokemonName}"`;

				if (cardNumber) {
					if (cardNumber.includes('TG')) {
						query += ` (number:"${cardNumber}" OR number:"${cardNumber.split('/')[0]}")`;
					} else {
						query += ` number:"${cardNumber}"`;
					}
				}

				const response = await axios.get(
					`https://api.pokemontcg.io/v2/cards?q=${query}`,
					{
						headers: { 'X-Api-Key': import.meta.env.VITE_POKEMON_KEY },
					}
				);
				setCards(response.data.data);
			} catch (err) {
				setError(`Failed to fetch cards. Error: ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, [pokemonName, cardNumber]);

	const renderContent = () => {
		if (loading) {
			return <h1 className={styles.centerContent}>Loading cards...</h1>;
		}

		if (error) {
			return (
				<h1 className={`${styles.centerContent} ${styles.errorMessage}`}>
					{error}
				</h1>
			);
		}

		return (
			<div
				className={
					cards.length > 0 ? styles.cardsGrid : styles.centerContainer
				}>
				{cards.length > 0 ? (
					cards.map((card) => (
						<Link
							to={`/card-detail/${card.id}`}
							key={card.id}
							className={styles.cardItem}>
							<h2>{card.name}</h2>
							<img src={card.images.large} alt={card.name} />
							<p>Set: {card.set.name}</p>
							<p>Rarity: {card.rarity}</p>
						</Link>
					))
				) : (
					<>
						<h5 className={styles.invalid}>
							No cards found for {pokemonName}.
						</h5>
						<Link to='/' className={styles.loginButton}>
							Back to Search
						</Link>
					</>
				)}
			</div>
		);
	};

	return (
		<div>
			<PokemonBackground />
			<nav className={styles.navbar}>
				<ul className={styles.navLinks}>
					<li>
						<Link to='/'>Search</Link>
					</li>
					<li>
						<Link to='/collection'>Collection</Link>
					</li>
					<li>
						<Link to='/upload'>Upload</Link>
					</li>
				</ul>
			</nav>
			<div className={styles.pokemonCards}>
				{cards.length > 0 && <h1>Cards for {searchQuery}</h1>}
				{renderContent()}
			</div>
		</div>
	);
}

export default PokemonCards;
