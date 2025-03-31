import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Editor() {
  const { id } = useParams(); // Get document ID from URL
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Fetch document from backend and handle socket connections
  useEffect(() => {
    socket.emit("join-document", id);

    // Fetch initial document content
    axios.get(`http://localhost:5000/api/docs/${id}`).then((res) => {
      setContent(res.data.content);
    });

    // Listen for changes from other clients
    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("receive-changes"); // Clean up the event listener on unmount
    };
  }, [id]);

  // Handle text changes & emit changes to other clients
  const handleChange = (e) => {
    setContent(e.target.value);
    setIsTyping(true);
    socket.emit("send-changes", { documentId: id, content: e.target.value });
  };

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        axios.patch(`http://localhost:5000/api/docs/${id}`, { content });
        setIsTyping(false); // Reset typing status
      }
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [content, isTyping, id]);

  // Copy Document Link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Document link copied!");
  };

  return (
    <div>
      {/* Copy Link Button */}
      <button onClick={copyLink}>Copy Document Link</button>
      
      {/* Text Editor */}
      <textarea 
        value={content} 
        onChange={handleChange} 
        rows="10" 
        cols="50" 
      />
    </div>
  );
}

export default Editor;
