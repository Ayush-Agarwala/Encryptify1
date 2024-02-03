import './Navbar.css'

function Navbar() {
    return (
        <nav className="nav_class">
            <span>Encryptify.</span>
            <ul className="nav_ul">
                <li><a href="#">About.</a></li>
                <li><a href="#">Service.</a></li>
                <li><a href="#">Contact Us.</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
