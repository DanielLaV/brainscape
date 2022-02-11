import { getResults } from "../../store/search";
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Deck from "../DecksPage/Deck";
import * as studyDeckActions from "../../store/decks_studying";
import CardBodyModal from "../CardModal";
import SearchCardBodyModal from "../SearchCardModal";

function SearchResults() {
    const dispatch = useDispatch();
    const { pathname, search } = useLocation()
    const userId = useSelector(state => state.session.user.id)
    const decks = useSelector(state => { if (state.search.decks) return Object.values(state.search.decks) })
    const cards = useSelector(state => { if (state.search.cards) return Object.values(state.search.cards) })
    const [errors, setErrors] = useState([]);
    const studyArr = useSelector(state => Object.values(state.studyDecks))
    const query = search.slice(1)
    useEffect(() => {
        dispatch(studyDeckActions.getStudyDecks(userId));
        if (query) {
            return dispatch(getResults(query.toLowerCase())).then(
                (response) => {
                    console.log("response.errors", response.errors)
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                }
            );
        }
    }, [dispatch, query, userId])
    const studyDecks = []
    studyArr.forEach((studyDeck) => {
        studyDecks.push(studyDeck.id)
        return studyDecks
    })

    let results
    if (!query) {
        results = <div className="">Please use the search bar to search the database!</div>
    }
    else {
        results = (
            <div className="">
                <ul className="error-list">
                    {errors.map((error, idx) => (
                        <li key={idx} className="errors">{error}</li>
                    ))}
                </ul>
                <div className="deckDisplay">
                    <h1 className="browseDecksTitle">Decks that Contain "{`${query}`}"</h1>
                    <div className='allDecks'>
                        {decks?.map(deck =>
                            <NavLink className="eachDeck" to={`/decks/${deck.id}`} key={deck.id}>
                                <Deck deck={deck} studyDecks={studyDecks} />
                            </NavLink>)}
                    </div>
                </div>
                <div className="deckDisplay">
                    <div className='allDecks'>
                        <h1 className="browseDecksTitle">Cards that Contain "{`${query}`}"</h1>
                        <div>
                            {cards?.map((card) => {
                                return (<div className="eachDeck">
                                    <SearchCardBodyModal card={card} key={card.id} />
                                    {/* <CardBodyModal card={card} key={card.id} /> */}
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        )

    }
    return (<div className="">{results}</div>)
}

export default SearchResults
