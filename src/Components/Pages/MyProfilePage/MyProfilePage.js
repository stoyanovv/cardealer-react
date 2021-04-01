import React, { Component } from 'react'
import styles from './MyProfilePage.module.css'
import Data from '../../../Data/Data'
import Auth from '../../../Containers/Auth/Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class MyProfilePage extends Component {
   state = {
      id: window.localStorage.getItem('userId'),
      index: 0,
      name: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      email: ''
   }

   componentDidMount() {
      const url = 'myprofile/' + this.state.id
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

   ClickHandler = (event, direction) => {
      let currentIndex = this.state.index
      if (direction) {
         currentIndex--
      }
      else {
         currentIndex++
      }
      this.setState({
         index: currentIndex
      })
   }

   mySports = [
      {
         type: 'tennis',
         label: 'Тенис'
      },
      {
         type: 'bowling',
         label: 'Боулинг'
      },
      {
         type: 'tableTennis',
         label: 'Тенис на маса'
      },
      {
         type: 'tableTennis',
         label: 'Тенис на маса'
      },
      {
         type: 'tableTennis',
         label: 'Тенис на маса'
      }
   ]
   render() {
      return (
         <div className={styles.MyProfile}>
            <div className={styles.ProfileAndStatisticsContainer}>
               <div>
                  <h2>Профил</h2>
                  <div className={styles.ProfilePic}>
                     <FontAwesomeIcon style={{ alignSelf: 'center' }} icon={faUser} size='10x' />
                  </div>
                  <div className={styles.ProfileInfoContainer}>
                     <div className={styles.ProfileInfo}>Име {this.state.name} {this.state.lastName}</div>
                     <div className={styles.ProfileInfo}>Имейл адрес {this.state.email}</div>
                     <div className={styles.ProfileInfo}>Телефон {this.state.phoneNumber}</div>
                     <div className={styles.ProfileInfo}>Възраст {this.state.age} години</div>
                     {/* <div className={styles.ProfileInfo}>Активни спортове {this.state.data.sports ? this.state.data.sports.map(sport => (sport.name + ', ')) : null}</div> */}
                  </div>
               </div>
               <div className={styles.PlayedMatches}>
                  {/* <MyUpcomingMatchesTable header='Предстоящи мачове' upcomingMatchSportName={this.mySports} /> */}
               </div>
            </div>
            <div className={styles.Matches}>

               <div>
                  <div className={styles.PlayedMatches}>

                  </div>
               </div>
            </div>
         </div>
      );
   }
}
