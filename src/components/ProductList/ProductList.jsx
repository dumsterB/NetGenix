import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Биг Сандерс Бургер', price: '34 000', description: 'Синего цвета, прямые',img:'https://kfc.com.uz/admin/files/5122.jpg'},
    {id: '2', title: 'Боксмастер Оригинал', price: '27 000', description: 'Зеленого цвета, теплая',img:'https://kfc.com.uz/admin/files/4479.jpg'},
    {id: '3', title: 'Чизбургер', price:'16 000', description: 'Синего цвета, прямые',img:'https://kfc.com.uz/admin/files/4449.jpg'},
    {id: '4', title: 'Шефбургер Оригинал', price:'20 000', description: 'Зеленого цвета, теплая',img:'https://kfc.com.uz/admin/files/4449.jpg'},
    {id: '5', title: 'Биг Сендерс Бургер', price: '34 000', description: 'Синего цвета, прямые',img:'https://kfc.com.uz/admin/files/5122.jpg'},
    {id: '6', title: 'Биг Сендерс Острый', price: '34 000', description: 'Зеленого цвета, теплая',img:'https://kfc.com.uz/admin/files/5124.jpg'},
    {id: '7', title: 'Сендерс Бургер', price:'28 000', description: 'Синего цвета, прямые',img:'https://kfc.com.uz/admin/files/5121.jpg'},
    {id: '8', title: 'Лонгер', price:'13 000', description: 'Зеленого цвета, теплая',img:'https://kfc.com.uz/admin/files/4450.jpg'},
]
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
