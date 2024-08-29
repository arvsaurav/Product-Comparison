import React, { useCallback, useEffect, useRef, useState } from 'react'
import { productService } from '../../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { appendProducts } from '../../redux-store/slices/productSlice';
import { Button, Image, Space, Table, notification } from 'antd';
import Column from 'antd/es/table/Column';
import './ProductDetails.css';
import { setCompareList } from '../../redux-store/slices/compareProductSlice';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
    const products = useSelector((state) => state.products.productList);
    const compareProducts = useSelector((state) => state.compareProducts.compareProductList);
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    const [api, contextHolder] = notification.useNotification();
    const showNotification = useCallback((type, heading, description) => {
        api[type]({
            message: heading,
            description: description,
        });
    }, [api]);

    const getProducts = useCallback(async (page, pageSize) => {
        const skip = (page - 1) * pageSize;
        // already fetched data
        if (skip < products.length && skip + pageSize < products.length) {
            setPagination(prev => ({
                ...prev,
                current: page,
            }));
            return;
        }
        const response = await productService.getProducts(skip, pageSize);
        if(response) {
            dispatch(appendProducts(response.data.products));
            setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize,
                total: response.data.total,
            }));
        }
        else {
            showNotification('error', 'Error!', "Something went wrong.");
        }
    }, [dispatch, products.length, showNotification]);

    const handlePageChange = ({current, pageSize}) => {
        // scroll to top
        containerRef.current.scrollTop = '0';
        getProducts(current, pageSize);
    }

    const handleAddToCompare = (product) => {
        if(compareProducts.length === 4) {
            showNotification('warning', 'Warning!', "Maximum 4 products can be added for comparison.");
            return;
        }
        document.getElementById(product.id).disabled = true;

        var isAlreadyPresentInComparisonList = false;
        compareProducts.forEach((availableProduct) => {
            if(availableProduct.id === product.id) {
                isAlreadyPresentInComparisonList = true;
            }
        })
        if(isAlreadyPresentInComparisonList) {
            showNotification('warning', 'Warning!', "Already added for comparison.");
        }
        else {
            dispatch(setCompareList([...compareProducts, product]));
            showNotification('success', 'Success!', 'Added for comparison.');
            if(compareProducts.length === 1) {
                setTimeout(() => {
                    navigate('compareProducts');
                }, 500)
            }
        }    
    }

    useEffect(() => {
        if(products.length === 0) {
            getProducts(pagination.current, pagination.pageSize);
        }
    }, [products, pagination, getProducts]);

    return (
        <div className='products-component-parent-div' ref={containerRef}>
            { contextHolder }
            <h2>Products</h2>
            <Table 
                dataSource={products.map(product => ({ ...product, key: product.id }))} 
                // dataSource={products}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: false,
                    itemRender: (current, type, originalElement) => {
                        if(type === 'prev') {
                            return (
                                <Button>Previous</Button>
                            )
                        }
                        if(type === 'next') {
                            return (
                                <Button>Next</Button>
                            )
                        }
                        // Hide page numbers
                        return null;
                    }
                }}
                onChange={handlePageChange}
            >
                <Column 
                    title='Title'
                    dataIndex='title'
                    key='title'
                    width='12.5%'
                />
                <Column 
                    title='Description'
                    dataIndex='description'
                    key='description'
                    width='25%'
                />
                <Column 
                    title='Price'
                    dataIndex='price'
                    key='price'
                    width='6.25%'
                    // defaultSortOrder= 'descend'
                    // sorter={(a, b) => a.price - b.price} // Sorting function
                />
                <Column 
                    title='Discount %'
                    dataIndex='discountPercentage'
                    key='discountPercentage'
                    width='6.25%'
                />
                <Column 
                    title='Brand'
                    dataIndex='brand'
                    key='brand'
                    width='12.5%'
                />
                <Column 
                    title='Category'
                    dataIndex='category'
                    key='category'
                    width='12.5%'
                />
                <Column 
                    title='Image'
                    dataIndex='thumbnail'
                    key='thumbnail'
                    width='12.5%'
                    render={(_, record) => (
                        <Image
                            src={record.thumbnail} 
                            alt={record.title}
                        />
                    )}
                />
                <Column
                    title='Action'
                    key='action'
                    width='12.5%'
                    render={(_, record) => (
                        <Space size='middle'>
                            <Button id={record.id} onClick={() => handleAddToCompare(record)}>Add to compare</Button>
                        </Space>
                    )}
                />
            </Table>
        </div> 
    )
}

export default ProductDetails;