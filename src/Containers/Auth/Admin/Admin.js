import React, { Component } from 'react';
import { checkValidity } from '../../../Shared/HelperFunctions';
import Data from '../../../Data/Data'
import styles from './Admin.module.css'
import { faCar, faDollarSign, faEnvelope, faVolleyballBall } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Buttons/Button/Button';
import Auth from '../Auth';


class Admin extends Component {
    state = {
        inputs: {
            make: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Марка'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            model: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Модел'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            fuel: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Гориво'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            enginePower: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Мощност на мотора'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                icon: faDollarSign,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Цена'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            imgUrl: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Снимка'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            year: {
                elementType: 'input',
                icon: faCar,
                elementConfig: {
                    type: 'date',
                    placeholder: 'Година'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    submitHandler = (event) => {
        event.preventDefault()
        const car = {
            make: this.state.inputs.make,
            model: this.state.inputs.model,
            fuel: this.state.inputs.fuel,
            enginePower: this.state.inputs.enginePower,
            year: this.state.inputs.year,
            price: this.state.inputs.price,
            imgUrl: this.state.inputs.imgUrl
        }
        Data.post('addcar', Auth.isUserAuthenticated)
            .then(res => {
                console.log(res)
            })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.inputs) {
            formElementsArray.push({
                id: key,
                config: this.state.inputs[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                name={formElement.id}
                key={formElement.id}
                icon={formElement.config.icon}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
        )


        let errorMessage = null
        if (this.props.error) {
            errorMessage = (<p style={{ color: 'tomato' }}>{this.props.error}</p>)
        }
        return (
            <div className={styles.Admin}>
                <h2>Добавете автомобил в онлайн магазина</h2>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button
                        buttonType='LogIn' submit width='180px'>Добави авотомобил</Button>
                </form>
            </div>
        );
    }
}

export default Admin;