import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as searchActions from "../../store/cards";
import { Link } from 'react-router-dom'
function SearchForm() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const [searchBarVis, setSearchBarVis] = useState(true)
    const [success, setSuccess] = useState("");

    const enterSubmit = (e) => {
        const key = e.code;
        if (key === 'Enter') {
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        setErrors([]);
        const payload = {
            query,
            is_logged_in: Boolean(user)
        }
        console.log("success!")
        setSuccess("Searching!")
        setSearchBarVis(false)
        // return dispatch(cardActions.createCard(payload))
        //     .then(
        //         (response) => {
        //             if (response.errors) {
        //                 setErrors(response.errors)
        //                 return
        //             }
        //             setShowSearchForm(false)
        //             setSuccess("Searching!");
        //             setTimeout(() => {
        //                 // setShowModal(false); history.push?
        //             }, 1500);
        //         }
        //     );
    };
    return (
        <>
            <div className="search">
                {searchBarVis ?
                <><input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    placeholder="SEARCH"
                    onKeyPress={(e) => enterSubmit(e)}
                />
                <Link to="#"><i class="fa-solid fa-magnifying-glass" onClick={handleSubmit}></i></Link>
                </> :
                 <>{success}{errors}</>}
            </div>
        </>
    )
}

export default SearchForm
