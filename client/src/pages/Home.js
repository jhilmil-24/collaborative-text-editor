import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function Home() {
  const navigate = useNavigate();

  const createDocument = () => {
    const id = uuidV4();
    navigate(`/docs/${id}`);
  };

  return (
    <div>
      <button onClick={createDocument}>Create New Document</button>
    </div>
  );
}

export default Home;
