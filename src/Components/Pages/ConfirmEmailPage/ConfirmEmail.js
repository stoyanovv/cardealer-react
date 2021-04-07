import { Component } from 'react'
import styles from './ConfirmEmail.module.css'

export default class ConfirmEmail extends Component {

    componentDidMount() {
        const url = '/confirm' + this.state.id
        Data.get(url, Auth.isUserAuthenticated)
            .then(res => {
                const user = res.myProfileView
                this.setState({
                    name: user.name,
                    lastName: user.lastName,
                    age: user.age,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                })
            })
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

