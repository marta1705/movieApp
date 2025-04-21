export default (state, action) => {
    switch(action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
        return {
            ...state,
            watchlist: [action.payload, ...state.watchlist]
        };
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(movie => movie.id !== action.payload),
            };

        case "ADD_MOVIE_TO_WATCHED":
            return {
                ...state,
                watchlist: state.watchlist.filter(movie => movie.id !== action.payload.id),
                watched: [action.payload, ...state.watched]
            };

        case "MOVE_TO_WATCHLIST":
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id !== action.payload.id),
                watchlist: [action.payload, ...state.watchlist]
            };

        case "REMOVE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id !== action.payload)
            };
        
        case "ADD_RATING":
            return {
                ...state,
                ratings: [{ id: action.id, rating: action.payload }, ...state.ratings]
            };

        case "UPDATE_RATING":
            const updatedRating = state.ratings.map(item => {
                if (item.id ===action.id) {
                    return {...item, rating: action.payload};
                }
                return item;
            });
            return {
                ...state,
                ratings: updatedRating
            };
            
        default:
            return state;
    }
};