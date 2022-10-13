import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Project</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link >
                            <Link to="/" >
                                Home
                            </Link>
                        </Nav.Link>

                        <Nav.Link >
                            <Link to="/categoryList" >
                                Categories
                            </Link>
                        </Nav.Link>


                        <Nav.Link >
                            <Link to="/productList" >
                                Products
                            </Link>
                        </Nav.Link>



                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
