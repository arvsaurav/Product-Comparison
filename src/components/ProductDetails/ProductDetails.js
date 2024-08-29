import React, { useCallback, useEffect, useRef, useState } from 'react'
import { productService } from '../../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { appendProducts } from '../../redux-store/slices/productSlice';
import { Button, Image, Space, Table, notification } from 'antd';
import Column from 'antd/es/table/Column';
import './ProductDetails.css';

function ProductDetails() {
    const products = useSelector((state) => state.products.productList);
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    const getProducts = useCallback(async (page, pageSize) => {
        const skip = (page - 1) * pageSize;
        // already fetched data
        if (skip < products.length) {
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
            alert("Something went wrong");
        }
    }, [dispatch, products.length]);

    const handlePageChange = (pagination) => {
        // scroll to top
        containerRef.current.scrollTop = '0';
        //window.scrollTo({ top: 0, behavior: 'smooth' });
        getProducts(pagination.current, pagination.pageSize);
    }

    const handleAddToCompare = (id) => {
        document.getElementById(id).disabled = true;
        showNotification('success');
    }

    const [api, contextHolder] = notification.useNotification();
    const showNotification = (type) => {
        api[type]({
            message: 'Success!',
            description: 'Added for comparison.',
        });
    };

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
                dataSource={products} 
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
                    sorter={(a, b) => a.price - b.price} // Sorting function
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
                            <Button id={record.id} onClick={() => handleAddToCompare(record.id)}>Add to compare</Button>
                        </Space>
                    )}
                />
            </Table>
        </div> 
    )
}

export default ProductDetails;