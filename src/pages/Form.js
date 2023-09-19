import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Form() {
    const fields=[{label:'name'},{label:'email'},{label:'phone'}]

    const [val,setval]=useState([])
    const [data,setData]=useState([])

    const onChangeHandler=(value)=>{
        const res=val.findIndex((item)=> item[value.target.id]!==undefined)
        const entry={
            [value.target.id]:value.target.value
        }
        if(res!=-1){
            console.log("in if",entry,res,val)
            val[res]=entry
        }else{
            console.log("in else")
            setval([...val,entry])
        }
    }

    const onSubmitClick=async ()=>{

        const response = await axios
      .get("https://www.capbluecross.com/UserSecurity/APILogin.xhtml?env=demo&resume=%2Fas%2FgkINw%2Fresume%2Fas%2Fauthorization.ping&spentity=null")
      .catch((err) => console.log(err));
    if (response && response.data) {
      console.log(response.data);
    }

       
       setData([...data,val])
    }

    useEffect(()=>{
        console.log(data)
    },[data])


  return (
    <div>
        {fields.map((item,id)=>{
            return (
                <div id={item.id}>
                <h6>{item.label} : </h6>
                <input label={item.label} id={item.label} onChange={onChangeHandler}></input>
                
                </div>
            )
        })}
        <br/>

        <button  onClick={onSubmitClick}>Submit</button>

        <table>
            <tr>
                <th>S no</th>
                <th>label</th>
                <th>value</th>
            </tr>

       


        {data && data.length>0 && data.map((item)=>{
            item.map((litem,id)=>{
                console.log(litem,item[0])
                return (
                    <tr>

                   
                    <td>{id}</td>
                    <td>
                        {litem[id]}
                    </td>

                     </tr>
                )
            })
           
        })
        }  
 </table>

    </div>
  )
}
