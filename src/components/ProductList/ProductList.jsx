import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import sticker from '../../assets/images/sticker.webp'
import sticker1 from '../../assets/images/sticker1.webp'
import sticker2 from '../../assets/images/sticker3.webp'
import sticker3 from '../../assets/images/sticker3.webp'
import sticker4 from '../../assets/images/sticker4.webp'
import sticker5 from '../../assets/images/sticker5.webp'
import sticker6 from '../../assets/images/sticker6.webp'
import sticker7 from '../../assets/images/sticker7.webp'
import sticker8 from '../../assets/images/sticker8.webp'
import sticker9 from '../../assets/images/sticker9.webp'


const products = [
    {id: '1', title: 'Биг Сандерс Бургер', price: '34 000', description: 'Филе в уникальной панировке, картофель хашбраун, ломтик сыра, салат, помидоры и нежный соус в пшеничной лепешке.',img:sticker},
    {id: '2', title: 'Боксмастер Оригинал', price: '27 000', description: 'Сливочный соус, филе в уникальной панировке, салат айсберг и помидоры на пшеничной булочке с черно-белым кунжутом.',img:sticker1},
    {id: '3', title: 'Чизбургер', price:'16 000', description: 'Горчичный соус, кетчуп, 2 стрипса оригинальных, лук, сыр чеддер, огурцы на пшеничной булочке с кунжутом.',img:sticker3},
    {id: '4', title: 'Шефбургер Оригинал', price:'20 000', description: 'соус Цезарь, филе в оригинальной панировке, хашбраун, ломтик сыра, салат айcберг и помидоры на пшеничной булочке с черно-белым кунжутом.',img:sticker4},
    {id: '5', title: 'Биг Сендерс Бургер', price: '34 000', description: 'Филе в уникальной панировке, картофель хашбраун, ломтик сыра, салат, помидоры и нежный соус в пшеничной лепешке.',img:sticker5},
    {id: '6', title: 'Биг Сендерс Острый', price: '34 000', description: 'Горчичный соус, кетчуп, 2 стрипса оригинальных, лук, сыр чеддер, огурцы на пшеничной булочке с кунжутом.',img:sticker5},
    {id: '7', title: 'Сендерс Бургер', price:'28 000', description: 'соус Цезарь, филе в оригинальной панировке, хашбраун, ломтик сыра, салат айcберг и помидоры на пшеничной булочке с черно-белым кунжутом.',img:sticker8},
    {id: '8', title: 'Лонгер', price:'13 000', description: 'Горчичный соус, кетчуп, 2 стрипса оригинальных, лук, сыр чеддер, огурцы на пшеничной булочке с кунжутом.',img:sticker9},
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
