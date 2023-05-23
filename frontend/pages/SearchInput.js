import { useRouter } from 'next/navigation'
import React, { useState } from "react";

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter()
    
    const onSearch = async (event) => {
        event.preventDefault() //we don't want refresh the page
        const encodedSearchQuery  = encodeURI(searchQuery); 
        // console.log("current query", searchQuery) //sanity check
        // console.log("encoded query:", encodedSearchQuery) //sanity check

        router.push(`/search?query=${encodedSearchQuery}`) //push the search query into the url 
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(event);
        }
    };

    return ( 
        <form className = "search-bar" onSubmit={onSearch}>
            <input 
                placeholder = "Search Topic" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="search-bar"
            />
        </form>
    )
}