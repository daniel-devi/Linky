import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

/**
 * LinkTreePage component for displaying user's link trees
 * @returns {JSX.Element} Rendered component
 */

function LinkTreePage() {
    // State to store the fetched link trees
    const [linkTrees, setLinkTrees] = useState<Array<{ id: string; title: string }>>([]);
    // State to store the link TREE UID from URL params
    const { uuid } = useParams();

    useEffect(() => {
        /**
         * Asynchronous function to fetch link trees from the API
         */
        const fetchLinkTrees = async () => {
            try {
                const response = await axios.get(`/api/linktrees/${uuid}/`,);
                setLinkTrees(response.data);
            } catch (error) {
                console.error('Error fetching link trees:', error);
                // TODO: Handle error (e.g., show error message to user)
            }
        };

        fetchLinkTrees();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div>
            <h2>Your Link Trees</h2>
            <ul>
                {linkTrees.map(linkTree => (
                    <li key={linkTree.id}>{linkTree.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default LinkTreePage;
