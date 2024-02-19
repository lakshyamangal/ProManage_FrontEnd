import React,{useEffect} from 'react'
import styles from './card.module.css'
function Card({data}) {
    useEffect(()=>{
        console.log("keys ",data)
    },[])
  return (
    <div className={styles.card}>
      <div className="cardheader">
        <div className="priority">{`${data.priority} priority`}</div>
      </div>
      <div className="cardTitle">{data.title}</div>
      <div className="checkLists">
        <div className="checkTitle">Checklist (1/3)</div>
        {
            data && data.checkList.map((item)=>{
                return(
                    <>
                        <div className={styles.checkList}>
                            <div className="checkbox">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                            </div>
                            <div className="checkTitle">{item.title}</div>
                        </div>
                    </>
                    
                )
            }) 
        }
      </div>
    </div>
  )
}

export default Card
