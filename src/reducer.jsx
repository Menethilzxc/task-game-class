export const initialState = {
	field: ['', '', '', '', '', '', '', '', ''],
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	WIN_PATTERNS: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	],
};

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_CURRENT_PLAYER':
			return {
				...state,
				currentPlayer: payload,
			};
		case 'SET_FIELD':
			return {
				...state,
				field: payload,
			};
		case 'SET_GAME_RESULT':
			return {
				...state,
				isGameEnded: payload.isGameEnded,
				isDraw: payload.isDraw,
			};
		case 'RESTART_GAME':
			return {
				...initialState,
			};
		default:
			return state;
	}
};
