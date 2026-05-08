import { useState } from "react";

function GetUser() {
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`);
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Fetch User by ID</h2>

      <input
        type="number"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      <button onClick={fetchUser} className="btn-primary">
        Get User
      </button>

      {user && (
  <div className="card" style={{ marginTop: "30px" }}>
    <h3>Name: {user.name}</h3>
    <p>User ID: {user.id}</p>
    <p>Role: {user.Role}</p>
  </div>
)}
    </div>
  );
}

export default GetUser;