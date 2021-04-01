import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import Auth from '../../../Containers/Auth/Auth'
import Data from '../../../Data/Data'
import Button from '../../UI/Buttons/Button/Button'
import Car from '../../UI/Car/Car'
import styles from './Shop.module.css'

export default class Shop extends Component {
    state = {
        id: window.localStorage.getItem('userId'),
        cars: []
    }

    input =
        <select className={styles.Select} type='select' >
            <option value="Ауди">Ауди</option>
            <option value="БМВ">БМВ</option>
            <option value="Бугати">Бугати</option>
            <option value="Волво">Волво</option>
            <option value="Мазда">Мазда</option>
            <option value="Мерцедес">Мерцедес</option>
            <option value="Порше">Порше</option>
            <option value="Тойота">Тойота</option>
            <option value="Фолксваген">Фолксваген</option>
            <option value="Шкода">Шкода</option>
        </select>

    componentDidMount() {
        Data.get('shop', Auth.isUserAuthenticated)
            .then(res => {
                const shop = res
                const cars = []
                shop.forEach(c => {
                    cars.push(
                        <Car
                            {...this.state.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought}
                            clicked={this.clickHandler} />
                    )
                })
                this.setState({
                    cars: cars
                })
            })
    }

    searchHandler() {
        console.log('asd')
        Data.get('search', { make: 'Мерцедес' }, Auth.isUserAuthenticated)
            .then(res => {
                console.log(res)
                const shop = res
                const cars = []
                shop.forEach(c => {
                    cars.push(
                        <Car
                            {...this.state.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought}
                            clicked={this.clickHandler} />
                    )
                })
                this.setState({
                    cars: cars
                })
            })
    }


    render() {
        return (
            <div className={styles.Shop}>
                <div className={styles.Search}>
                    <label>
                        Търси по марка:
                        </label>
                    {this.input}
                    <div style={{ maxWidth: 80, margin: '0 auto' }}>
                        <button className={styles.Button} onClick={this.searchHandler} type='submit'>Търси</button>
                    </div>
                </div>
                <div className={styles.Container}>
                    <div className={styles.Cars}>
                        {this.state.cars.map(car => (car))}
                    </div>
                </div>
            </div>
        );
    }
}
