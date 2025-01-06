import { Component } from 'react';
import { connect } from 'react-redux';
import { restartGame, setField, gameResult, actionCurrentPlayer } from '../../actions';
import {
	selectCurrentPlayer,
	selectField,
	selectIsDraw,
	selectIsGameEnded,
	selectWinPatterns,
} from '../../selectors';
import styles from './Field.module.css';
import { array } from 'prop-types';

export class Field extends Component {
	checkWinner = (field) => {
		const { WIN_PATTERNS, gameResult } = this.props;

		for (let combination of WIN_PATTERNS) {
			let [a, b, c] = combination;
			if (field[a] && field[a] === field[b] && field[b] === field[c]) {
				return field[a];
			}
		}

		if (field.every((item) => item !== '')) {
			gameResult(true, true);
		}

		return null;
	};

	handleMove = (index) => {
		const {
			field,
			currentPlayer,
			isGameEnded,
			setField,
			gameResult,
			actionCurrentPlayer,
		} = this.props;

		if (!isGameEnded && field[index] === '') {
			const newField = [...field];
			newField[index] = currentPlayer;

			setField(newField);

			const winner = this.checkWinner(newField);

			if (winner) {
				gameResult(false, true);
				actionCurrentPlayer(winner);
			} else {
				actionCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
			}
		}
	};

	resetGame = () => {
		this.props.restartGame();
	};

	render() {
		const { field, isDraw, isGameEnded } = this.props;

		if (!field || !array.isArray(field)) {
			return <div style={{ textAlign: 'center' }}>Загрузка...</div>;
		}

		return (
			<div className={styles.rootContainer}>
				{(isDraw || isGameEnded) && (
					<button className={styles.resetBtn} onClick={this.resetGame}>
						Начать сначала
					</button>
				)}
				<div className={styles.container}>
					{field.map((item, index) => (
						<div
							key={index}
							className={styles.containerCell}
							onClick={() => this.handleMove(index)}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	field: selectField(state),
	currentPlayer: selectCurrentPlayer(state),
	isDraw: selectIsDraw(state),
	isGameEnded: selectIsGameEnded(state),
	WIN_PATTERNS: selectWinPatterns(state),
});

const mapDispatchToProps = {
	restartGame,
	setField,
	gameResult,
	actionCurrentPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
