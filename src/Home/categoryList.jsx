import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { categoryList } from "../_Actions/categoryActions";
import { CategoryAdd } from './categoryAdd';


export const CategoryList = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(categoryList({ staus: 1 })); }, [category.categorySingle]);
    const [isCategoryAdd, setCategoryAdd] = useState(false);

    //category add
    const CategoryAddmodal = () => {
        setCategoryAdd(true)
    }
    const handleCloseCategoryAdd = () => {
        setCategoryAdd(false);
    }

    const renderCategories = (catgories) => {
        let categoryArray = [];
        for (let category of catgories) {
            categoryArray.push(
                <tr>
                    <td>{category.name}</td>
                    <td>{category.parent_id ? category.parent_id.name : "-"}</td>
                </tr>
            )
        }
        return categoryArray;
    };

    return (
        <div>
            <Container className=" mt-3 mb-4">
                <Row >
                    <Col md={4} sm={8} style={{ marginLeft: "auto" }}>
                        <Button onClick={CategoryAddmodal} style={{ width: "100%" }}>Add</Button>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
                        <Container className="category-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {category.categoryfullData && category.categoryfullData.length > 0 &&
                                <Table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th >Name</th>
                                            <th >parent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCategories(category.categoryfullData)}
                                    </tbody>
                                </Table>}

                            {category.categoryfullData && category.categoryfullData.length == 0 && <p> No Categories Found</p>}

                        </Container>
                    </Col>
                </Row>
            </Container>

            <CategoryAdd
                title="Add  Category"
                show={isCategoryAdd}
                handleCloseCategoryAdd={handleCloseCategoryAdd}
            />

        </div>
    )
}

