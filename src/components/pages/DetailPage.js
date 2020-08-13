/* Libs */
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';

/* Bootstrap components */
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

/* Components */
import { toast } from 'react-toastify';
import { history } from '../../routers/AppRouter';
import { formatNumberPtBr } from '../../filters/formatNumberBr';
import { startGetDetailCountries, startGetCountryByName } from '../../actions/countries';

const DetailPage = () => {
    const { country } = useParams();
    const dispatch = useDispatch();
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

            if(countrySelected[0] !== undefined){
                if(!countrySelected[0].hasOwnProperty('distanceToOtherCountries')) {
                    startGetDetailCountries(countrySelected[0]._id)
                    .then((resCountries) => {                    
                        if (resCountries.success) {
                            countrySelected[0].distanceToOtherCountries = resCountries.data;
                            countrySelected[0].distanceToOtherCountries.forEach(countryDistance => {                                
                                let countryClose = listCountriesRedux.filter((countryList) => countryList.name === countryDistance.countryName);

                                /* Significa que não foi carregado no redux ainda */
                                if(countryClose.length === 0) {
                                    startGetCountryByName(countryDistance.countryName)
                                    .then((countrySearch) => {
                                        let newCountry = countrySearch.data;                                        
                                        countryDistance.flag = newCountry.flag;
                                        countryDistance.latitude = newCountry.location.latitude;
                                        countryDistance.longitude = newCountry.location.longitude;
                                        let newStateRedux = [...listCountriesRedux, newCountry];
                                        addCountries(newStateRedux);
                                        setSelectedCountry(countrySelected[0]);                                        
                                    })
                                } else {
                                    countryDistance.flag = countryClose[0].flag;
                                    countryDistance.latitude = countryClose[0].location.latitude;
                                    countryDistance.longitude = countryClose[0].location.longitude;
                                    setSelectedCountry(countrySelected[0]);
                                }
                            });
                        } else {
                            toast.error("Não foi possível realizar a comunicação com a API...");
                        }
                    });
                }else {
                    setSelectedCountry(countrySelected[0]);
                }
            }
        }
    }, [country, listCountriesRedux] );

    const addCountries = (countriesData) => {
        dispatch(addCountriesAction(countriesData));
    }
    
    const addCountriesAction = (countries) => {
        return { type: 'POPULATE_COUNTRIES', countries }
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
                                            <Form.Group as={Col} xs={12} sm={12} md={12} xl={12} controlId="toplvl">
                                                <Form.Label>
                                                    <strong>Domínios</strong>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Área" defaultValue={selectedCountry.topLevelDomains.length > 0 ? selectedCountry.topLevelDomains.map((domain) => `${domain.name} `) : '' } disabled/>
                                            </Form.Group>
                                        </Form.Row>
                                        { selectedCountry.hasOwnProperty('distanceToOtherCountries') && 
                                            <Form.Row>
                                                <Form.Group as={Col} xs={12} sm={12} md={12} xl={12} controlId="closeCountry">
                                                    <Form.Label>
                                                        <strong>Países próximos:</strong>
                                                    </Form.Label>
                                                    {selectedCountry.distanceToOtherCountries.map((country) => (
                                                        <Form.Row key={country.countryName}>
                                                            <Form.Group as={Col} xs={3} sm={3} md={3} xl={3} controlId="flagIcon">
                                                                <span className="icon-as-img-small">{country.flag?.emoji}</span>
                                                            </Form.Group>
                                                            <Form.Group as={Col} xs={9} sm={9} md={9} xl={9} controlId="nameDistance">
                                                                <strong>{country.countryName}</strong>: {formatNumberPtBr(country.distanceInKm)} (km)
                                                            </Form.Group>
                                                        </Form.Row>
                                                    ))}
                                                </Form.Group>
                                            </Form.Row>
                                        }
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
