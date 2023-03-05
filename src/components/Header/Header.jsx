import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <Button className={'button-back'} onClick={onClose}> Закрыть</Button>
        </div>
    );
};

export default Header;
