import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Row, Col } from "reactstrap";

import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

import damirBosnjak from "../../assets/img/damir-bosnjak.jpg";
import userDefault from "../../assets/img/userDefault.jpg";

import { getUser } from "../../utils/SetGetDatabase"
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "https://afternoon-peak-44756.herokuapp.com/";
const strapi = new Strapi(apiUrl);

class Infor extends React.Component {
    state = {
        userID: "",
        username: "",
        userimage: userDefault,
        email: "",
        addr: { 
            street: "", city: "", state: "", zipcode: ""
        },
        fName: "",
        lName: "",
    };

    async componentDidMount() {
        let response = await strapi.getEntry('users', getUser()._id);
        this.setState({ userID: getUser()._id});
        this.setState({ username: getUser().username});
        this.setState({ email: getUser().email});
        if(response.address !== undefined)
            this.setState({ addr: response.address});
        if(response.firstName !== undefined)
            this.setState({ fName: response.firstName});
        if(response.lastName !== undefined)
            this.setState({ lName: response.lastName});
    }

    handleChange = name => event => {
        event.persist();
        this.setState({ 
          [name]: event.target.value,
        });
    };

    handleChangeAddr = name => event => {
        event.persist();
        let addr = {...this.state.addr};
        addr[name] = event.target.value; 
        this.setState({addr});
        console.log(this.state.addr);
    };

    handleSubmit = async event => {
        console.log(getUser());
        const { userID, fName, lName, addr } = this.state;
        event.preventDefault();
        try{     
            await strapi.updateEntry('users', userID, {
                firstName: fName,
                lastName: lName,
                address: addr
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { username, userimage, email, fName, lName, addr } = this.state;

        return (
        <div className="content">
            <Row>
            <Col md={4} xs={12}>
                <Card className="card-user">
                <div className="image">
                    <img src={damirBosnjak} alt="..." />
                </div>
                <CardBody>
                    <CardAuthor
                    avatar={userimage}
                    avatarAlt="..."
                    title={fName+ " " + lName}
                    />
                    <p className="description text-center">
                    <br/><br/><br/><br/><br/>
                    </p>
                </CardBody>
                <CardFooter>
                    <hr />
                    <div className="button-container">
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={3} className="ml-auto">
                        <h5>
                            0
                            <br/>
                            <small>Ordered</small>
                        </h5>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={4} className="mr-auto ml-auto">
                        <h5>
                            0
                            <br/>
                            <small>Rated</small>
                        </h5>
                        </Col>
                        <Col lg={3} className="mr-auto">
                        <h5>
                            0$
                            <br/>
                            <small>Saved</small>
                        </h5>
                        </Col>
                    </Row>
                    </div>
                </CardFooter>
                </Card>
                <Card>              
                </Card>
            </Col>
            <Col md={8} xs={12}>
                <Card className="card-user">
                <CardHeader>
                    <CardTitle>PROFILE</CardTitle>
                </CardHeader>
                <CardBody>
                    <form>
                    <FormInputs
                        ncols={["col-md-5 pr-1", "col-md-3 px-1", "col-md-4 pl-1"]}
                        proprieties={[
                        {
                            label: "Member",
                            inputProps: {
                            type: "text",
                            disabled: true,
                            defaultValue: "Regular",
                            }
                        },
                        {
                            label: "Username",
                            inputProps: {
                            type: "text",
                            disabled: true,
                            defaultValue: username
                            }
                        },
                        {
                            label: "Email address",
                            inputProps: {
                            type: "email",
                            disabled: true,
                            defaultValue: email
                            }
                        }
                        ]}
                    />
                    <FormInputs
                        ncols={["col-md-6 pr-1", "col-md-6 pl-1"]}
                        proprieties={[
                        {
                            label: "First Name",
                            inputProps: {
                            type: "text",
                            defaultValue: fName,
                            onChange: this.handleChange("fName")
                            }
                        },
                        {
                            label: "Last Name",
                            inputProps: {
                            type: "text",
                            defaultValue: lName,
                            onChange: this.handleChange("lName")
                            }
                        }
                        ]}
                    />
                    <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                        {
                            label: "Address",
                            inputProps: {
                            type: "text",
                            defaultValue: addr.street,
                            onChange: this.handleChangeAddr("street")
                            }
                        }
                        ]}
                    />
                    <FormInputs
                        ncols={["col-md-4 pr-1", "col-md-4 px-1", "col-md-4 pl-1"]}
                        proprieties={[
                        {
                            label: "City",
                            inputProps: {
                            type: "text",
                            defaultValue: addr.city,
                            onChange: this.handleChangeAddr("city")
                            }
                        },
                        {
                            label: "State",
                            inputProps: {
                            type: "text",
                            defaultValue: addr.state,
                            onChange: this.handleChangeAddr("state")
                            }
                        },
                        {
                            label: "Postal Code",
                            inputProps: {
                            type: "number",
                            placeholder: "ZIP Code",
                            defaultValue: addr.zipcode,
                            onChange: this.handleChangeAddr("zipcode")
                            }
                        }
                        ]}
                    />
                    <Row>
                        <div className="update ml-auto mr-auto">
                        <Button color="primary" round onClick={this.handleSubmit}>Update Profile</Button>
                        </div>
                    </Row>
                    </form>
                </CardBody>
                </Card>
            </Col>
            </Row>
        </div>
        );
    }
}

export default Infor;
