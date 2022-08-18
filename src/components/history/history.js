
const initialState = {
    history: [],
}
export default function historyReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_HISTORY':
            
            const history = [...state.history, payload];
            return { history: history };

        case 'DELETE_HISTORY':
            return initialState;
        default:
            return state;
    }
}

export const addHistory = (history) => {
    return {
        type: 'ADD_HISTORY',
        payload: history
    }
}

export const emptyHistory = () => {
    return {
        type: 'DELETE_HISTORY',
        
    }
}

