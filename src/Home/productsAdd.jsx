import React, { useState, useEffect } from "react";
import {
    Row,
    Modal,
    Button,
    Container,
    Col
} from 'react-bootstrap';
import Select from 'react-select';
import { productsAdd } from "../_Actions/productAction";
import { useDispatch, useSelector } from 'react-redux';



export const ProductsAdd = (props) => {

    const { show, handleCloseProductsAdd, title } = props;
    const dispatch = useDispatch();
    const categoryAll = useSelector(state => state.category);

    const [errmsg, setErrmsg] = useState(false);
    const [isError, setError] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setoptions] = useState(
        [

        ]
    );

    const [products, setproductsdetails] = useState({
        name: "",
        category: "",
        price: ""
    })

    useEffect(() => {
        let my = [];
        if (categoryAll.categoryfullData.length > 0) {
            for (let item of categoryAll.categoryfullData) {
                let obj = { value: item._id, label: item.name }
                my.push(obj);
            }
            setoptions(my);
        }
    }, [show])

    // closemodal
    const handleClose = () => {
        setError(false);
        setproductsdetails({
            name: "",
            category: "",
            price: ""
        });
    }
    const handleChange = (name, value) => {
        console.log(value, name)
        setproductsdetails({
            ...products,
            [name]: value
        })
    }




    // selecting parent
    const getproductsSelect = (selectedOption) => {
        setSelectedOption(selectedOption.name);
        setproductsdetails({
            ...products,
            category: selectedOption.value
        });
    }

    // submit
    const onSumbitproducts = (products) => {

        if (!products.name) {
            setError(true);
            setErrmsg("Please enter name");
            return null;
        }
        if (!products.price) {
            setError(true);
            setErrmsg("Please enter price");
            return null;
        }
        if (!products.category) {
            setError(true);
            setErrmsg("Please enter category");
            return null;
        }
        if (products.name) {
            dispatch(productsAdd(products));
            setproductsdetails({
                name: "",
                category: "",
                price: ""
            });
            handleCloseProductsAdd()
        }
    }

    return (
        <>
            <Modal show={show}
                onHide={
                    () => {
                        handleCloseProductsAdd();
                        handleClose()
                    }
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="ProductsAdd">



                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Name  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Name"
                                    value={products.name}
                                    onChange={(e) => handleChange("name", e.target.value)}>
                                </input>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Price  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Price"
                                    value={products.price}
                                    onChange={(e) => handleChange("price", e.target.value)}>
                                </input>
                            </Col>
                        </Row>
                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Category  </label>
                            </Col>
                            <Col md={8}>
                                <Select
                                    value={selectedOption}
                                    onChange={getproductsSelect}
                                    options={options}
                                    isSearchable={true}
                                />
                            </Col>
                        </Row>

                        {
                            isError && <Row className="form-row margin-2-res">
                                <p className="text_danger">
                                    {errmsg}</p>
                            </Row>
                        }

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={
                            () => onSumbitproducts(products)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>

        </>


    )
}
