import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Auth from '../../../Containers/Auth/Auth'
import Data from '../../../Data/Data'
import Button from '../Buttons/Button/Button'
import styles from './CarInfo.module.css'
import * as actions from '../../../Store/Actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'

class CarInfo extends Component {
    state = {
        id: window.localStorage.getItem('userId'),
        carInfo: [],
        carId: this.props.match.params.id
    }

    componentDidMount() {
        Data.get('carinfo/' + this.state.carId, Auth.isUserAuthenticated)
            .then(res => {
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
            })
    }

    buyHandler = () => {
        Data.post('buycar/' + this.state.id, { carId: this.state.carId }, Auth.isUserAuthenticated)
            .then(res => {
                this.props.setSnackbar('success', res.message)
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
            })
    }

    deleteHandler = () => {
        Data.post('deletecar/' + this.state.id, { carId: this.state.carId }, Auth.isUserAuthenticated)
            .then(res => {
                this.props.setSnackbar('info', res.message)
                const carInfo = res
                this.setState({
                    carInfo: carInfo
                })
            })
    }

    render() {
        let button = null
        if (!this.state.carInfo.bought) {
            button = <Link to={"/shop"} >
                <Button buttonType="Accept" clicked={this.buyHandler} >Купи сега</Button>
            </Link>
        }
        else {
            button = <Link to={"/cart"} >
                <Button buttonType="Decline" clicked={this.deleteHandler} >Премахни от покупки</Button>
            </Link>
        }
        return (
            <div className={styles.CarInfo}>
                <div className={styles.ImgContainer}>
                    <img className={styles.Img} alt='no pic' src={this.state.carInfo.imgUrl}></img>
                </div>
                <div className={styles.Description}>
                    <span className={styles.Info}>Марка: {this.state.carInfo.make}</span>
                    <span className={styles.Info}>Модел: {this.state.carInfo.model}</span>
                    <span className={styles.Info}>Цена: {this.state.carInfo.price} лв</span>
                    <span className={styles.Info}>Година: {this.state.carInfo.year}</span>
                </div>
                <div className={styles.Description}>
                    <span className={styles.Info}>Гориво: {this.state.carInfo.fuel}</span>
                    <span className={styles.Info}>Мотор: {this.state.carInfo.enginePower} кубика</span>
                </div>
                <span>
                    {button}
                </span>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSnackbar: (type, message, open) => dispatch(actions.setSnackbar(type, message, open)),
    }
}

export default connect(null, mapDispatchToProps)(CarInfo)

// const CarInfo = (props) => {

//     return (
//         <div className={styles.CarInfo}>
//             <div className={styles.ImgContainer}>
//                 <img className={styles.Img} alt='no pic' src='https://cdn.car-recalls.eu/wp-content/uploads/2020/05/Audi-A6-2020-recall-rsg-fire-768x432.jpg'></img>
//             </div>
//             <div className={styles.Description}>
//                 <span className={styles.Info}>Марка: {props.make}</span>
//                 <span className={styles.Info}>Модел: {props.model}</span>
//                 <span className={styles.Info}>Цена: {props.price}</span>
//                 <span className={styles.Info}>Година: {props.price}</span>
//             </div>
//             <div className={styles.Description}>
//                 <span className={styles.Info}>Гориво: {props.price}</span>
//                 <span className={styles.Info}>Мотор: {props.price} кубика</span>
//             </div>
//             <span>

//                 <Button buttonType="Accept">Купи сега</Button>
//             </span>
//         </div>
//     );
// }

// export default CarInfo;
