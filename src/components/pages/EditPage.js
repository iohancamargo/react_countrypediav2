/* Libs */
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';

const editCountriesAction = (country) => {
    return { type: 'EDIT_COUNTRIES', country }
}

const EditPage = () => {
    const dispatch = useDispatch();
    const { country } = useParams();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const listCountriesRedux = useSelector(state => state.countries);

    const [area, setArea] = useState(0);
    const [name, setName] = useState("");
    const [capital, setCapital] = useState("");
    const [population, setPopulation] = useState(0);
    const [nativeName, setNativeName] = useState("");

    useEffect(() => {
        if(listCountriesRedux.length === 0 ) {
            history.push('/');
        }

        if(country !== null){

            let countrySelected = listCountriesRedux.filter((countryList) => countryList.alpha3Code === country);

            if(countrySelected.length === 0){
                toast.success("Select a country from the initial list to edit...");
                history.push('/');
            } else {
                setSelectedCountry(countrySelected[0]);
                setName(countrySelected[0].name);
                setArea(countrySelected[0].area);
                setCapital(countrySelected[0].capital);
                setNativeName(countrySelected[0].nativeName);
                setPopulation(countrySelected[0].population);
            }

        }
    }, [country, listCountriesRedux] );

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/`);
    }

    function editCountry(countryData) {
        dispatch(editCountriesAction(countryData));
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(nativeName === '' || name === '' || capital === '' || area === '' || population === '' ) {
            toast.warn("Fill in all information on the form...");
            return false;
        }

        selectedCountry.name = name;
        selectedCountry.area = area;
        selectedCountry.capital = capital;
        selectedCountry.nativeName = nativeName;
        selectedCountry.population = population;

        editCountry(selectedCountry);
        toast.success("Information changed successfully...");
        history.push(`/detail/${country}/`);
    }

    return (
        <>
            { selectedCountry === null ? (
            <>
                <div className="box-layout" id="content-part">            
                    <div className="box-layout__box">
                        <img className="loader__image" src="/images/loader.gif" alt="loading..."/>
                    </div>
                </div>
            </>
            ) : (
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={12} key={country.alpha3Code}>
                        <div className="breadcrumbs">
                            <span className="breadcrumbs-link">
                                <Link to={`/`}>Home </Link>
                            </span>
                            <span className="breadcrumbs-text">
                                <strong> / Edition </strong>
                            </span>
                        </div>                        
                    </Col>

                    <Col xs={12} sm={12} md={12} key={selectedCountry.alpha3Code} >
                        <Card className="align-items-center" >
                            <Card.Img variant="top" className="image-card-details" src={selectedCountry.flag.svgFile} title={selectedCountry.name}/>
                            <Card.Body>
                                <Form noValidate autoComplete="off" onSubmit={(e) => ( handleSubmitForm(e) )}>
                                    <Form.Row>
                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="name">
                                            <Form.Label>
                                                <strong>Code</strong>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Code" defaultValue={selectedCountry.alpha3Code} disabled/>
                                        </Form.Group>

                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="nativeName">
                                            <Form.Label>
                                                <strong>Native name</strong>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Native name" onChange={(e) => ( setNativeName(e.target.value) )} defaultValue={selectedCountry.nativeName} isInvalid={nativeName === ''} />
                                            <Form.Control.Feedback type="invalid">
                                                Field native name is requiered...
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="name">
                                            <Form.Label>
                                                <strong>Name</strong>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Name" defaultValue={selectedCountry.name} onChange={(e) => ( setName(e.target.value) )} isInvalid={name === ''}/>
                                            <Form.Control.Feedback type="invalid">
                                                Field name is requiered...
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="capital">
                                            <Form.Label>
                                                <strong>Capital</strong>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Capital" defaultValue={selectedCountry.capital} onChange={(e) => ( setCapital(e.target.value) )} isInvalid={capital === ''}/>
                                            <Form.Control.Feedback type="invalid">
                                                Field capital is requiered...
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="area">
                                            <Form.Label>
                                                <strong>Area</strong>
                                            </Form.Label>
                                            <Form.Control type="number" placeholder="Area" defaultValue={selectedCountry.area} onChange={(e) => ( setArea(e.target.value) )} isInvalid={area === ''}/>
                                            <Form.Control.Feedback type="invalid">
                                                Field area is requiered...
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="population">
                                            <Form.Label>
                                                <strong>Population</strong>
                                            </Form.Label>
                                            <Form.Control type="number" placeholder="Population" defaultValue={selectedCountry.population} onChange={(e) => ( setPopulation(e.target.value) )} isInvalid={population === ''}/>
                                            <Form.Control.Feedback type="invalid">
                                                Field population is requiered...
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <div className="card-block">
                                        <Button type="submit" className="buttons__actions" variant="success" disabled={nativeName === '' || name === '' || capital === '' || area === '' || population === ''}>
                                            Save
                                        </Button>
                                        <Button className="buttons__actions" variant="warning" onClick={(e) => handleCancel(e)} >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )}
        </>
    );
};

export default EditPage;
