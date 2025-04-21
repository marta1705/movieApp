import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from "./AppReducer";

// dane pobierane z local storage, jeżeli tam są 
const initialState = {
    watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
    ratings: localStorage.getItem('ratings') ? JSON.parse(localStorage.getItem('ratings')) : [],
};

//tworzenie kontekstu, do ktorego podajemy dane zapisane w local storage
export const GlobalContext = createContext(initialState);


//globalprovider dostarcza wartosci kontekstu
export const GlobalProvider = props => {
    //useReducer to alternatywa dla useState
    //AppReducer jest funkcją reduktora, ktora okresla jakie akcje maja wplyw na stan aplikacji
    // initalState to poczatkowy stan aplikacji
    // state przechowuje stan biezacy aplikacji a dispatch to funkcja do wywyolywania akcji, ktore zmieniaja stan
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // useEffect zapisuje dane do localStorage
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        localStorage.setItem('watched', JSON.stringify(state.watched));
        localStorage.setItem('ratings', JSON.stringify(state.ratings));
    }, [state]); // [state] oznacza, ze funkcje wewnatrz sa wywolywane po kazdej zmianie stanu

    // actions
    // akcje są wywoływane za pomocą funkcji dispatch - są odpowiedzialne za zmiane stanu aplikacji w zaleznosci od akcji
    // reducer przyjmuje aktualny stan i zwaraca nowy stan w zaleznosci od wykonanej akcji
    const addMovieToWatchlist = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie});
    };

    const removeMovieFromWatchlist = (id) => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id});
    }

    const addMovieToWatched = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie});
    };

    const moveToWatchlist = movie => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: movie});
    };

    const removeFromWatched = (id) => {
        dispatch({type: "REMOVE_FROM_WATCHED", payload: id});
    };

    const addRating = (rating, id) => {
        dispatch({type: "ADD_RATING", payload: rating, id});
    }

    const updateRating = (rating, id) => {
        dispatch({type: "UPDATE_RATING", payload:rating, id});
    }

    return (
        <GlobalContext.Provider value={{watchlist: state.watchlist, watched: state.watched, ratings: state.ratings, addMovieToWatchlist, removeMovieFromWatchlist, addMovieToWatched, moveToWatchlist, removeFromWatched, addRating, updateRating}}>
            {props.children}
        </GlobalContext.Provider>
    )
}