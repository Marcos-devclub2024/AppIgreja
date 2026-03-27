export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>
        Sistema da Igreja - On-line
      </h1>

      <p style={{ marginBottom: "24px", color: "#4b5563" }}>
        Bem-vindo ao painel. Em breve aqui você verá:
      </p>

      <ul style={{ paddingLeft: "20px", color: "#111827" }}>
        <li>Cadastro de membros</li>
        <li>Agenda de cultos</li>
        <li>Eventos da igreja</li>
        <li>Relatórios financeiros</li>
      </ul>
    </main>
  );
}