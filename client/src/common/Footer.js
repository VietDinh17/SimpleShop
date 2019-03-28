import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class FooterPage extends React.Component {
    render() {
        return (
        <Footer color="black" className="font-small pt-4 mt-4">
        <Container fluid className="text-center text-md-left">
            <Row>
            <Col md="6">
            <h5 className="title">Get to Know Us</h5>
            <ul>
                <li className="list-unstyled">
                <a href="#!">Blog</a>
                </li>
                <li className="list-unstyled">
                <a href="#!">About Simple Shop</a>
                </li>
            </ul>
            </Col>
            <Col md="6">
            <h5 className="title">Let Us Help You</h5>
            <ul>
                <li className="list-unstyled">
                <a href="#!">Your Account</a>
                </li>
                <li className="list-unstyled">
                <a href="#!">Your Orders</a>
                </li>
                <li className="list-unstyled">
                <a href="#!">Shipping Rates & Policies</a>
                </li>
                <li className="list-unstyled">
                <a href="#!">Return Policies</a>
                </li>
                <li className="list-unstyled">
                <a href="#!">Help</a>
                </li>
            </ul>
            </Col>

            </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
            <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.SimpleShop.com"> SimpleShop.com </a>
            </Container>
        </div>
        </Footer>
        );
    }
}

export default FooterPage;
