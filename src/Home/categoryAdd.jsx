import React, { useState, useEffect } from "react";
import {
    Row,
    Modal,
    Button,
    Container,
    Col
} from 'react-bootstrap';
import Select from 'react-select';
import { categorysAdd } from "../_Actions/categoryActions";
import { useDispatch ,useSelector} from 'react-redux';



export const CategoryAdd = (props) => {

    const { show, handleCloseCategoryAdd, title } = props;
    const dispatch = useDispatch();
    const categoryAll = useSelector(state => state.category);

    const [errmsg, setErrmsg] = useState(false);
    const [isError, setError] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setoptions] = useState(
        [
           
        ]
    );

    const [category, setcategorydetails] = useState({
        name: "",
        parent_id: 1,
    })

    useEffect(() => {
        let my=[];
        if (categoryAll.categoryfullData.length > 0) {
            for (let item of categoryAll.categoryfullData) {
                let obj = { value: item._id, label: item.name }
                my.push(obj);
            }
            setoptions(my);
            // array.map(({ _id, name }) => ({ value: _id, label: name }));
        }
    }, [show])

    // closemodal
    const handleClose = () => {
        setError(false);
        setcategorydetails({
            name: "",
            parent_id: 1,
        });
    }
    const handleChange = (name, value) => {
        console.log(value, name)
        setcategorydetails({
            ...category,
            [name]: value
        })
    }



   
    // selecting parent
    const getCategorySelect = (selectedOption) => {
        setSelectedOption(selectedOption.name);
        setcategorydetails({
            ...category,
            parent_id: selectedOption.value
        });
    }

    // submit
    const onSumbitcategory = (category) => {

        if (!category.name) {
            setError(true);
            setErrmsg("Please enter name");
            return null;
        }

        if (category.name) {
            dispatch(categorysAdd(category));
            setcategorydetails({
                name: "",
                parent_id: 1,
            });
            handleCloseCategoryAdd()
        }
    }

    return (
        <>
            <Modal show={show}
                onHide={
                    () => {
                        handleCloseCategoryAdd();
                        handleClose()
                    }
                }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="categoryadd">



                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Name  </label>
                            </Col>
                            <Col md={8}>
                                <input type="text" className="form-control" placeholder="Name"
                                    value={category.name}
                                    onChange={(e) => handleChange("name", e.target.value)}>
                                </input>
                            </Col>
                        </Row>

                        <Row className="form-row margin-2-res">
                            <Col md={4}>
                                <label>Select Parent  </label>
                            </Col>
                            <Col md={8}>
                                <Select
                                    value={selectedOption}
                                    onChange={getCategorySelect}
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
                            () => onSumbitcategory(category)
                        }>Save</Button>
                </Modal.Footer>
            </Modal>

        </>


    )
}
