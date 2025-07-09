
export default function Footer() {

  const currentYear = new Date().getFullYear()

  return (
  <footer>
    <p>© {currentYear} Edwin Soto</p>
    <p>Diseñado y desarrollado por mí con React & Sass</p>
  </footer>

  )
}
