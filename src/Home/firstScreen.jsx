import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { getAllData } from "../_Actions/categoryActions";

export const FirstScreen = () => {

    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);

    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [parent, setParent] = useState("All Categories");

    // useEffect(() => { dispatch(productsList({ staus: 1 })); }, []);

    useEffect(() => { dispatch(getAllData({ staus: 1, parent: true })).then((res) => { setCount(count + 1) }) }, []);

    const changeParent=(item) => {
        setParent(item.name);
        dispatch(getAllData({ staus: 1, parent_id: item._id })).then((res) => { setCount(count + 1) }) 
    }

    const renderCategories = useMemo(() => {
        console.log("haaai")
        let categoryArray = [];
        if (category.categoryfullData && category.categoryfullData.length > 0) {
            console.log(category.categoryfullData, "catgories")

            for (let item of category.categoryfullData) {
                categoryArray.push(
                    <tr>
                        <td>{item.name +"("+item.count+")"}</td>
                        <td><a onClick={()=>changeParent(item)}>View</a></td>
                    </tr>
                )
            }
        }
        return categoryArray;
    }, [count]);


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
    }


    return (
        <div>

            <Container className="category-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                <Row><h5>{parent +"(" + (product.productCounts ? product.productCounts :"0") + ")"}</h5></Row>
                {category.categoryfullData && category.categoryfullData.length > 0 &&
                    <Table className="table manage-candidates-top mb-0">
                        <thead>
                            <tr>
                                <th >Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCategories}
                        </tbody>
                    </Table>}

                {/* {category.categoryfullData && category.categoryfullData.length == 0 && <p> No Categories Found</p>} */}

            </Container>

            <Container className="product-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                <Row><h5>Product List</h5></Row>
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

        </div>
    )
}

