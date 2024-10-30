import { useState } from "react";
import axios from "axios";

function CreateLinkTree() {
  const [links, setLinks] = useState<
    Array<{ id: string; title: string; url: string }>
  >([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [id, setId] = useState<string>("");
  const [uuid, setUuid] = useState("");
  const [treeTitle, setTreeTitle] = useState<string>("");
  const [created, setCreated] = useState(false);

  /**
   * Asynchronous function to fetch link trees from the API
   */

  /**
   * Handles Creating a new LinkTree
   */
  const handleCreateLinkTree = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating LinkTree...", treeTitle);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/linktrees/",
        {
          title: treeTitle.toString(),
          user: localStorage.getItem("UserId"), // Assuming you have a token in localStorage
        }
      );
      setCreated(true);
      setId(response.data.id); // Set the ID of the newly created LinkTree
      setUuid(response.data.uuid);
      setTreeTitle(""); // Clear input fields
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  /**
   * Handles adding a new link to the LinkTree
   */
  const handleAddLink = async () => {
    console.log("ID:", id, "Title:", newLink.title, "URL:", newLink.url);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/links/",
        {
          linktree: id,
          title: newLink.title,
          url: newLink.url,
        }
        // TODO {
        //  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        //}
      );
      setLinks([...links, response.data]); // Add new link to the state
      setNewLink({ title: "", url: "" }); // Clear input fields
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };
  return (
    <>
      <h1>Create Link Tree</h1>
      <form>
        <label>Link Tree Name:</label> <br />
        <input
          type="text"
          value={treeTitle}
          onChange={(e) => setTreeTitle(e.target.value)}
        />{" "}
        <br />
        <br />
        <button type="submit" disabled={created} onClick={handleCreateLinkTree}>
          Create Link Tree
        </button>{" "}
        <br />
      </form>
      
        {created  &&  <button type="submit">Share</button> }

      {/* Display linkTree Name */}

      <em>Add New Link to {treeTitle}</em>

      <h2>Your Link Trees</h2>
      {links.length === 0 ? (
        <p>No link trees found.</p>
      ) : links.length == 1 ? (
        <ul>
          <li key={links[0].id}>
            <a href={links[0].url}>{links[0].title}</a>
          </li>
        </ul>
      ) : links.length > 1 ? (
        <ul>
          {links.map((link) => (
            <li key={link.id}>{link.title}</li>
          ))}
        </ul>
      ) : (
        <></>
      )}

      {created ? (
        <>
          <br />
          <label>Title:</label> <br />
          <input
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="Title"
          />{" "}
          <br />
          <label>URL:</label> <br />
          <input
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="URL"
          />{" "}
          <br />
          <button onClick={handleAddLink}>Add Link</button>
          <br />
        </>
      ) : (
        <>
          <h5>Create a Link Tree First</h5>
        </>
      )}
    </>
  );
}
export default CreateLinkTree;
