import React,{useState,useEffect} from 'react'
import styles from './Dashboard.module.css'
import Navpanel from'../Navpanel/navpanel'
import Section from '../Section/section'
import Card from '../Card/card'

function Dashboard() {
  const [data, setData] = useState(null);
  const [keys,setkeys] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/api/v1/card/getAllCards/1707501391000/1708365397000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzOGZhNDZlZDdjMzAwOWE0YmIwZmYiLCJpYXQiOjE3MDgzNjM2ODR9.gLps6pi-YY__wRtyDmkNTg7xVqSJisQz-i3g9rkkmaY'
            },
        })
        .then(response => response.json())
        .then(data => {
          console.log("fetched data ",data.data);
            setkeys(Object.keys(data.data))
            setData(data.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[]);
  return (
    <div className={styles.home}>
      <div className="navbar"><Navpanel /></div>
      <div className="board">
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <div className="title">Welcome! Kumar</div>
            <div className="date">19th feb 2024</div>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <div className="title">Board</div>
            <div className="date">This week</div>
          </div>
        </div>
        <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {keys && data && keys.map((key)=>{
            return(<Section item={key} data={data}/>)
          })}
        </div>
      </div>
        </div>
    </div>
  )
}

export default Dashboard
