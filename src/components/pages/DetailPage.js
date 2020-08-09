/* Libs */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";

/* Bootstrap components */
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';
import { formatNumberPtBr } from '../../filters/formatNumberBr';

const DetailPage = () => {
    const { country } = useParams();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const listCountriesRedux = useSelector(state => state.countries);

    useEffect(() => {
        /* Garante que só será realizada uma request para popular o storage */        
        if(listCountriesRedux.length === 0 ) {
            history.push('/');
        }

        if(country !== null){

            let countrySelected = listCountriesRedux.filter((countryList) => countryList.alpha3Code === country);

            if(countrySelected.length === 0){
                toast.success("Selecione um país da lista inicial para visualizar os detalhes...");
                history.push('/');
            }
            setSelectedCountry(countrySelected[0]);
        }
    }, [country, listCountriesRedux] );

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
                <>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} key={country.alpha3Code}>
                            <div className="breadcrumbs">
                                <span className="breadcrumbs-link">
                                    <Link to={`/`}>Home </Link>
                                </span>
                                <span className="breadcrumbs-text">
                                    <strong> / Detalhes </strong>
                                </span>
                            </div>
                            <h1 className="box-title__main-title">Detalhes do país: {selectedCountry.nativeName} </h1>
                        </Col>

                        <Col xs={12} sm={12} md={12} key={selectedCountry.alpha3Code} >
                            <Card className="align-items-center" >
                                <Card.Img variant="top" className="image-card-details" src={selectedCountry.flag.svgFile} title={selectedCountry.name}/>
                                <Card.Body>
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="name">
                                                <Form.Label>
                                                    <strong>Nome</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Nome" defaultValue={selectedCountry.name} disabled/>
                                            </Form.Group>
                                            <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="capital">
                                                <Form.Label>
                                                    <strong>Capital</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Capital" defaultValue={selectedCountry.capital === null ||selectedCountry.capital === "" ? selectedCountry.name : selectedCountry.capital } disabled/>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="area">
                                                <Form.Label>
                                                    <strong>Área</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Área" defaultValue={formatNumberPtBr(selectedCountry.area)} disabled/>
                                            </Form.Group>
                                            <Form.Group as={Col} xs={12} sm={6} md={6} xl={6} controlId="population">
                                                <Form.Label>
                                                    <strong>População</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="População" defaultValue={formatNumberPtBr(selectedCountry.population)} disabled/>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} xs={12} sm={6} md={12} xl={12} controlId="toplvl">
                                                <Form.Label>
                                                    <strong>Domínios</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Área" defaultValue={selectedCountry.topLevelDomains.length > 0 ? selectedCountry.topLevelDomains.map((domain) => `${domain.name} `) : '' } disabled/>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                </>
            )}
        </>
    );
};

export default DetailPage;
