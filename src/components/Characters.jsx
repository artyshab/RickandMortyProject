import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/querie";
import { useState } from "react";

export default function Characters() {
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 6; 

    const { loading, error, data } = useQuery(GET_CHARACTERS);

    if (loading) return <div className="loader"><div className="spinner"></div></div>;
    if (error) return <p>Error: {error.message}</p>;


    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const currentCharacters = data.characters.results.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.characters.results.length / charactersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container">
            <div className="filter-container">
                {/* Add filter options here */}
            </div>

            <div className="characters">
                {currentCharacters.map(character => (
                    <div key={character.id} className="character-card">
                        <h2>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Origin: {character.origin.name}</p>
                    </div>
                ))}
            </div>

            <div className="pagination-buttons">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
