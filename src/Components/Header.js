import { Nav, Navbar } from 'react-bootstrap';

import {
    NavLink
} from "react-router-dom";

import styles from '../style/Home.module.css'

export default function Header () {
    return (
        <Navbar expand="sm" className={styles.fonte + " " + styles.nav + " h-16" }>
            <Nav>
                {/* <Nav.Link><NavLink className="text-white hover:no-underline" to="Casters">Casters</NavLink></Nav.Link> */}

                <Nav.Link><NavLink className="text-white hover:no-underline" to="Matchup">Matchup</NavLink></Nav.Link>

                <Nav.Link><NavLink className="text-white hover:no-underline" to="Picks">Picks and Bans</NavLink></Nav.Link>

                <Nav.Link><NavLink className="text-white hover:no-underline" to="LeagueOverlay">Spectator Overlay</NavLink></Nav.Link>
                
            </Nav>
        </Navbar>
    )
}