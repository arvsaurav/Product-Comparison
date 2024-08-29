import React, { useEffect, useState } from 'react'
import './CompareProducts.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, Space, Table, notification } from 'antd';
import Column from 'antd/es/table/Column';
import { setCompareList } from '../../redux-store/slices/compareProductSlice';
import { useNavigate } from 'react-router-dom';

function CompareProducts() {
    const compareProducts = useSelector((state) => state.compareProducts.compareProductList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleRemoveProduct = (id) => {
        showNotification('success', 'Success!', 'Removed from comparison.');
        const updatedComparisonList = compareProducts.filter((product) => product.id !== id);
        dispatch(setCompareList(updatedComparisonList));
    }

    const [api, contextHolder] = notification.useNotification();
    const showNotification = (type, heading, description) => {
        api[type]({
            message: heading,
            description: description,
        });
    };

    useEffect(() => {
        if(compareProducts.length === 4) {
            setIsButtonDisabled(true);
        }
        else {
            setIsButtonDisabled(false);
        }
    }, [compareProducts]);

    return (
        <div className='compare-products-component-parent-div'>
            { contextHolder }
            <div className='compare-products-header'>
                <h2>Compare Products</h2>
                <Button 
                    disabled={isButtonDisabled}
                    onClick={() => navigate('../')}
                >
                    Add more
                </Button>
            </div>
            <Table
                dataSource={compareProducts}
            >
                <Column 
                    title='Image'
                    dataIndex='thumbnail'
                    key='thumbnail'
                    width='15%'
                    render={(_, record) => (
                        <Image
                            src={record.thumbnail} 
                            alt={record.title}
                        />
                    )}
                />
                <Column
                    title='Title'
                    dataIndex='title'
                    key='title'
                    width='15%'
                />
                <Column 
                    title='Description'
                    dataIndex='description'
                    key='description'
                    width='30%'
                />
                <Column
                    title='Brand'
                    dataIndex='brand'
                    key='brand'
                    width='15%'
                />
                <Column 
                    title='Price'
                    dataIndex='price'
                    key='price'
                    width='15%'
                />
                <Column
                    title='Action'
                    key='action'
                    render={(_, record) => (
                        <Space size='middle'>
                            <Button danger id={record.id} onClick={() => handleRemoveProduct(record.id)}>Remove</Button>
                        </Space>
                    )}
                    width='10%'
                />
            </Table> 

        </div>
    )
}

export default CompareProducts;