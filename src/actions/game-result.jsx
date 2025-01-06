export const gameResult = (isDraw, isGameEnded) => ({
	type: 'SET_GAME_RESULT',
	payload: { isDraw, isGameEnded },
});
