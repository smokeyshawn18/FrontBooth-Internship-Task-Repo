export function Footer() {
  return (
    <footer
      style={{
        padding: '16px 24px',
        borderTop: '1px solid #eee',
        marginTop: 40,
        color: '#666',
        fontSize: 14,
      }}
    >
      © {new Date().getFullYear()} MF Store — Host, Product, and Cart are three
      separately deployed apps.
    </footer>
  );
}
