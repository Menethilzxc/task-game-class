import { Component } from 'react';
import { Information, Field } from './components/';
import styles from './Game.module.css';

class Game extends Component {
	render() {
		return (
			<div className={styles.gameContainer}>
				<Information />
				<Field />
			</div>
		);
	}
}

export default Game;
