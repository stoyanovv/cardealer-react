import React, { Component } from 'react'
import Data from '../../../Data/Data'
import Car from '../../UI/Car/Car'
import styles from './Cart.module.css'

// const Cart = (props) => {
//     return (
//         <div>
//             kolichka
//         </div>
//     );
// }

// export default Cart;

export default class Cart extends Component {

    state = {
        id: window.localStorage.getItem('userId'),
        cars: [],
        price: 0
    }
    componentDidMount() {
        Data.get('boughtcars/' + this.state.id)
            .then(res => {
                console.log(res)
                const cart = res.cars
                const cars = []
                cart.forEach(c => {
                    cars.push(
                        <Car
                            {...this.state.props}
                            key={c.id}
                            id={c.id}
                            make={c.make}
                            model={c.model}
                            price={c.price}
                            imgUrl={c.imgUrl}
                            bought={c.bought} />
                    )
                })
                this.setState({
                    cars: cars,
                    price: res.price
                })
            })
    }
    render() {
        return (
            <div className={styles.Cart}>
                {this.state.price > 0 ? <h2 className={styles.Header}>Твоите покупки с обща стойност {this.state.price} лв</h2> :
                    <h2 className={styles.Header}>Нямате покупки</h2>}

                <div className={styles.Container}>
                    <div className={styles.Shop}>
                        {this.state.cars.map(car => (car))}
                    </div>
                </div>
            </div>
        );
    }
}