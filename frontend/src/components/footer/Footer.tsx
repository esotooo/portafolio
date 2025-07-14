
export default function Footer() {

  const currentYear = new Date().getFullYear()

  return (
  <footer>
    <p>© {currentYear} Edwin Soto</p>
    <p>Portafolio diseñado y desarrollado con React y Sass.</p>
  </footer>

  )
}
