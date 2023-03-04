import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img src={product.img} alt="" />
            <div className={'title'}>{product.title} ауцауц</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span><span className={'price-text'}>{product.price} </span> сум</span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
