import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { productsList } from "../_Actions/productAction";
import { ProductsAdd } from './productsAdd';


export const ProductList = () => {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(productsList({ staus: 1 })); }, [product.productSingle]);
    const [isProductAdd, setProductAdd] = useState(false);

    //product add
    const ProductAddmodal = () => {
        setProductAdd(true)
    }
    const handleCloseProductAdd = () => {
        setProductAdd(false);
    }

    const renderProducts = (products) => {
        let productArray = [];
        for (let product of products) {
            productArray.push(
                <tr>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                </tr>
            )
        }
        return productArray;
    };

    return (
        <div>
            <Container className=" mt-3 mb-4">
                <Row >
                    <Col md={4} sm={8} style={{ marginLeft: "auto" }}>
                        <Button onClick={ProductAddmodal} style={{width:"100%"}}>Add</Button>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
                        <Container className="product-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                            {product.productfullData && product.productfullData.length > 0 &&
                                <Table className="table manage-candidates-top mb-0">
                                    <thead>
                                        <tr>
                                            <th >Name</th>
                                            <th >Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderProducts(product.productfullData)}
                                    </tbody>
                                </Table>}

                            {product.productfullData && product.productfullData.length == 0 && <p> No Products Found</p>}

                        </Container>
                    </Col>
                </Row>
            </Container>

            <ProductsAdd
                title="Add  product"
                show={isProductAdd}
                handleCloseProductsAdd={handleCloseProductAdd}
            />

        </div>
    )
}

