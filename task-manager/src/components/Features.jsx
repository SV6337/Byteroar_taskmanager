function Features() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Features</h2>

        <div style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px"
        }}>
          <div className="card">📋 Task Tracking</div>
          <div className="card">⏰ Reminders</div>
          <div className="card">📊 Analytics</div>
        </div>
      </div>
    </section>
  );
}

export default Features;