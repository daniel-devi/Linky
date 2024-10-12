import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/**
 * EmailListPage component for displaying and managing email lists.
 * @returns {JSX.Element} The rendered EmailListPage component.
 */
function EmailListPage() {
  const { id } = useParams(); // Get LinkTree ID from URL params
  const [emails, setEmails] = useState<Array<{ id: number; email: string }>>([]);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    /**
     * Fetches emails associated with the current LinkTree.
     */
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`/api/emaillists/?linktree=${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [id]);

  /**
   * Handles adding a new email to the list.
   */
  const handleAddEmail = async () => {
    try {
      const response = await axios.post(
        "/api/emaillists/",
        {
          linktree: id,
          email: newEmail,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEmails((prevEmails) => [...prevEmails, response.data]); // Add new email to the state using functional update
      setNewEmail(""); // Clear input field
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  /**
   * Handles deleting an email from the list.
   * @param {number} emailId - The ID of the email to delete.
   */
  const handleDeleteEmail = async (emailId: number) => {
    try {
      await axios.delete(`/api/emaillists/${emailId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId)); // Remove email from state using functional update
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  /**
   * Handles exporting emails as CSV.
   */
  const handleExportCSV = () => {
    window.location.href = `/api/linktrees/${id}/export-emails/`;
  };

  return (
    <div>
      <h2>Email List</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            {email.email}
            <button onClick={() => handleDeleteEmail(email.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleExportCSV}>Export Emails as CSV</button>

      <h3>Add New Email</h3>
      <input
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleAddEmail}>Add Email</button>
    </div>
  );
}

export default EmailListPage;
