import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as tagActions from '../../store/tags'
import Deck from '../DecksPage/Deck'
import AddDeckFormModal from '../AddDeckModal';
import { NavLink } from 'react-router-dom';

function TagPage() {
    const dispatch = useDispatch()
    const { tagId } = useParams()
    const tags = useSelector(state => state.tags)
    const decks = useSelector(state => Object.values(state.decks));
    const tag = tags[tagId]

    useEffect(() => {
        dispatch(tagActions.getDecksByTag(tagId));
    }, [dispatch, tagId])

    return (
        <div className='browsePageContainer'>
            <div className="browseDecks">
                <div className="browseDecksTitleContainer">
                    <h1 className="browseDecksTitle">Decks with tag "{tag?.name}"</h1>
                </div>
                <div className='deckDisplay'>
                    <div className='allDecks'>
                        {decks?.map(deck =>
                            <NavLink className="eachDeck" to={`/decks/${deck.id}`} key={deck.id}>
                                <Deck deck={deck} />
                            </NavLink>)}
                    </div>
                </div>
              
            </div>



            {/* {decks?.map(deck => <div key={deck.id}> <Deck deck={deck} studyDecks={studyDecks}/> </div>)} */}
        </div>
    )



}

export default TagPage;
