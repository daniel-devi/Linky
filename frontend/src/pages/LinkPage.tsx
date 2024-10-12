import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * LinkPage component for managing links in a LinkTree
 * @returns {JSX.Element} Rendered LinkPage component
 */
function LinkPage() {
    const { id } = useParams();  // LinkTree ID
    const [links, setLinks] = useState<Array<{ id: string; title: string; url: string }>>([]);
    const [newLink, setNewLink] = useState({ title: '', url: '' });

    useEffect(() => {
        /**
         * Fetches links associated with the LinkTree
         */
        const fetchLinks = async () => {
            try {
                const response = await axios.get(`/api/linktrees/${id}/links/`,);
                setLinks(response.data);
            } catch (error) {
                console.error('Error fetching links:', error);
            }
        };
        fetchLinks();
    }, [id]);

    /**
     * Handles adding a new link to the LinkTree
     */
    const handleAddLink = async () => {
        try {
            const response = await axios.post('/api/links/', {
                linktree: id,
                ...newLink
            }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setLinks([...links, response.data]);  // Add new link to the state
            setNewLink({ title: '', url: '' });  // Clear input fields
        } catch (error) {
            console.error('Error adding link:', error);
        }
    };

    /**
     * Handles deleting a link from the LinkTree
     * @param {string} linkId - ID of the link to be deleted
     */
    const handleDeleteLink = async (linkId: string) => {
        try {
            await axios.delete(`/api/links/${linkId}/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setLinks(links.filter(link => link.id !== linkId));  // Remove link from state
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    return (
        <div>
            <h2>Links in this LinkTree</h2>
            <ul>
                {links.map(link => (
                    <li key={link.id}>
                        <a href={link.url}>{link.title}</a>
                        <button onClick={() => handleDeleteLink(link.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3>Add New Link</h3>
            <input
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                placeholder="Title"
            />
            <input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="URL"
            />
            <button onClick={handleAddLink}>Add Link</button>
        </div>
    );
}

export default LinkPage;
