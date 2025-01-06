import { Component } from 'react';
import { connect } from 'react-redux';
import { selectIsDraw, selectCurrentPlayer, selectIsGameEnded } from '../../selectors';
import styles from './Information.module.css';

export class Information extends Component {
	getTitle = () => {
		const { isDraw, isGameEnded, currentPlayer } = this.props;

		if (isDraw) {
			return 'Ничья';
		}

		if (isGameEnded) {
			return `Победа: ${currentPlayer}`;
		}

		return `Ходит: ${currentPlayer}`;
	};

	render() {
		return (
			<div className={styles.rootContainer}>
				<div className={styles.infoContainer}>
					<h1 className={styles.infoContainerTitle}>{this.getTitle()}</h1>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isDraw: selectIsDraw(state),
	isGameEnded: selectIsGameEnded(state),
	currentPlayer: selectCurrentPlayer(state),
});
console.log(selectCurrentPlayer);
export default connect(mapStateToProps)(Information);
