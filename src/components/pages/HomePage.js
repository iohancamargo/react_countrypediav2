/* Libs */
import { toast } from 'react-toastify';
import { BsSearch } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

/* Bootstrap components */
import { Container, Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

/* Components */
import { history } from '../../routers/AppRouter';
import { startGetCountries } from '../../actions/countries';

const addCountriesAction = (countries) => {
    return { type: 'POPULATE_COUNTRIES', countries }
}

const HomePage = () => {
    const dispatch = useDispatch();
    const [textFilter, setTextFilter] = useState("");
    const [offSetSearch, setOffsetSearch] = useState(0);
    const [listCountries, setListCountries] = useState([]);
    const [alreadySearch, setAlreadySearch] = useState(false);
    const [alreadyFilter, setAlreadyFilter] = useState(false);
    const listCountriesRedux = useSelector(state => state.countries);
    const [listFilterdCountries, setListFilterdCountries] = useState([]);

    const verifyCountrisToAdd = (countries, witchList) => {
        let countriesToAdd = [];
        let arraySearch = witchList === 'redux' ? listCountriesRedux : listCountries;

        countries.forEach(newCountry => {
            let findCountry = false;
            arraySearch.forEach(countryRedux => {
                if(countryRedux.alpha3Code === newCountry.alpha3Code){
                    findCountry = true;
                }
            });
            if(!findCountry){
                countriesToAdd.push(newCountry);
            }
        });
        return countriesToAdd;
    }

    const orderByName = (arrayToOrder)  => {
        let orderArray = arrayToOrder.sort(function compare(a, b) {
            let nameA = a.name;
            let nameB = b.name;

            if(nameA === 'Åland Islands'){
                nameA = nameA.replace('Å', 'A');
            }
            if(nameB === 'Åland Islands'){
                nameB = nameB.replace('Å', 'A');
            }

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        return orderArray;
    }

    const ordenaArray = () => {
        setTextFilter('');
        let reduxArray = orderByName(listCountriesRedux);
        addCountries(reduxArray);
        setListCountries([...reduxArray.slice(0, 6)]);
    }

    const fetchMoreData = () => {
        if(listFilterdCountries.length === 0){
            if(listCountriesRedux.length < 250){
                startGetCountries('', offSetSearch)
                .then((resCountries) => {                    
                    if (resCountries.success) {
                        let countries = resCountries.data;
                        let countriesToAdd = verifyCountrisToAdd(countries, 'redux');
                        let newStateRedux = [...listCountriesRedux, ...countriesToAdd];
                        addCountries(newStateRedux);
                        setOffsetSearch(offSetSearch + 6);
                        setListCountries([...listCountries, ...newStateRedux.slice(listCountries.length, listCountries.length + 6)]);
                    } else {
                        toast.error("Não foi possível realizar a comunicação com a API...");
                    }
                });
            } else {
                setTimeout(() => {
                    setListCountries([...listCountries, ...listCountriesRedux.slice(listCountries.length, listCountries.length + 6)]);
                }, 500);
            }
        } else {
            setTimeout(() => {
                setListCountries([...listCountries, ...listFilterdCountries.slice(listCountries.length, listCountries.length + 6)]);
            }, 500);
        }
    };
    
    const addCountries = (countriesData) => {
        dispatch(addCountriesAction(countriesData));
    }
    
    const handleFilterCountries = (textTyped) => {        
        setAlreadyFilter(true);
        
        /* Filtra lista do redux */
        if(textTyped !== undefined && textTyped.trim() !== "" && textTyped.trim() !== null) {
            let filtredArr = [];
            listCountriesRedux.filter((country) => {
                if (country.name.toLowerCase().indexOf(textTyped.toLowerCase()) > -1  || country.nativeName.toLowerCase().indexOf(textTyped.toLowerCase()) > -1) {
                    filtredArr.push(country);
                }
            });
            switch (filtredArr.length) {
                case 0:
                    if(listCountriesRedux.length < 250) {
                        startGetCountries(textTyped, offSetSearch)
                        .then((resCountries) => {                    
                            if (resCountries.success) {
                                let countries = resCountries.data;
                                let countriesToAdd = verifyCountrisToAdd(countries, 'redux');
                                let newStateRedux = [...listCountriesRedux, ...countriesToAdd];
                                
                                console.log('newStateRedux', newStateRedux);
                                
                                let countriesList = verifyCountrisToAdd(countriesToAdd, 'list');

                                addCountries(newStateRedux);
                                setListFilterdCountries([...listCountries,...countriesList]);
                                setListCountries([...countriesList.slice(0, 6)]);
                            } else {
                                toast.error("Não foi possível realizar a comunicação com a API...");
                            }
                        });
                    } else {
                        setListCountries([]);
                        setListFilterdCountries([]);
                    }
                break;
            
                default:
                    if(textTyped !== textFilter){
                        setListCountries([...filtredArr.slice(0, 6)]);
                    }
                    setListFilterdCountries(filtredArr);
                break;
            }

        } else if((listFilterdCountries.length > 0) || (alreadyFilter && textTyped === '' && listCountries.length === 0)){
            setListCountries([...listCountriesRedux.slice(0, 6)]);
            setListFilterdCountries([]);
        }

        setTextFilter(textTyped);
    }

    useEffect(() => {
        /* Garante que só será realizada uma request para popular o storage */        
        if (listCountriesRedux.length === 0) {
            setOffsetSearch(6);
            startGetCountries('', offSetSearch)
                .then((resCountries) => {                    
                    setAlreadySearch(true);
                    if (resCountries.success) {
                        let countries = resCountries.data;
                        addCountries(countries);
                        setListCountries(countries.slice(listCountries.length, listCountries.length + 6));
                    } else {
                        toast.error("Não foi possível realizar a comunicação com a API...");
                    }
                });
        } else {
            setListCountries(listCountriesRedux.slice(listCountries.length, listCountries.length + 6));
            setAlreadySearch(true);
            setAlreadyFilter(true);
        }
    }, [] );

    return (
        alreadySearch === false ? (
            <>
                <div className="box-layout" id="content-part">            
                    <div className="box-layout__box">
                    <Container className="align-items-center">
                        <img className="loader__image" src="/images/loader.gif" alt="loading..."/>
                    </Container>
                    </div>
                </div>
            </>
        ) : 
        (
            <>
            {
                /* Caso não tenha retorno na api essa mensagem é exibida */
                listCountriesRedux.length === 0 && 
                <Container className="align-items-center">                    
                    <h1 className="box-title__main-title">Não existem países cadastrados na api.</h1>
                </Container>
            }
            {
                listCountriesRedux.length > 0 &&
                    <Container className="align-items-center">
                        {(alreadySearch && listCountries.length === 0) ?
                            (<h1 className="box-title__main-title">Não foi localizado registros com o filtro informado.</h1>) :
                            (<h1 className="box-title__main-title">Explore os países do mundo</h1>)
                        }
                        
                        <Form onSubmit={e => { e.preventDefault(); }}>
                            <Form.Row className="align-items-center">
                                <Col xs={12} sm={12} md={12} xl={12}>
                                    <Button onClick={ordenaArray} variant="secondary" className="button-order">
                                        Ordenar por alfabeto
                                    </Button>

                                </Col>
                                <Col xs={12} sm={12} md={12} xl={12}>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><BsSearch/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl 
                                            size="lg"
                                            type="text"
                                            id="searchCountry" 
                                            maxLength={50}
                                            placeholder="Procure por um país..."
                                            onChange={(e) => handleFilterCountries(e.target.value)} 
                                        />
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                        </Form>
                        
                        <InfiniteScroll
                            dataLength={listCountries.length}
                            next={fetchMoreData}
                            hasMore={
                                (listFilterdCountries.length <= 0  && listCountriesRedux.length < 250 ) || 
                                (listFilterdCountries.length > 0 && listCountries.length < listFilterdCountries.length) ||
                                (listCountries.length < listFilterdCountries.length || listCountriesRedux.length < 250)
                            }
                            loader={ 
                                <div className="box-layout__aling-middle">
                                    <img className="loader__image" src="/images/loader.gif" alt="loading..."/> 
                                </div>
                            }
                        >
                            <Row>
                                {listCountries.map((country) => (
                                    <Col xs={12} sm={12} md={4} key={country.alpha3Code} >
                                        <Card className="card-home align-items-center" >
                                            <Card.Img variant="top" className="image-card-home" src={country.flag.svgFile} title={country.name}/>
                                            <Card.Body className="box-layout__aling-middle">
                                                <Card.Title>{country.nativeName}</Card.Title>
                                                
                                                <Card.Subtitle variant="bottom">
                                                    {country.name}
                                                </Card.Subtitle>
                                                
                                                <Card.Text variant="bottom">
                                                    <strong>Capital:</strong> {country.capital === null ||country.capital === "" ? country.name : country.capital }
                                                </Card.Text>
                                            </Card.Body>
                                            <div className="card-block">
                                                <Button className="buttons__actions" variant="primary" onClick={() => history.push(`/detail/${country.alpha3Code}/`)}>
                                                    Detalhes
                                                </Button>
                                                <Button className="buttons__actions" variant="warning" onClick={() => history.push(`/edit/${country.alpha3Code}/`)} >
                                                    Editar
                                                </Button>
                                            </div>
                            
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </InfiniteScroll>
                    </Container> 
                }
            </>
        )
    )
};

export default HomePage;
