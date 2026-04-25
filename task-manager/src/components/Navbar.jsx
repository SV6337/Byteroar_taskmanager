function Navbar() {
  return (
    <nav style={{ background: "#1E293B", padding: "15px 0" }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        color: "white"
      }}>
        <h2>JIRA</h2>
        <button className="btn-primary">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;