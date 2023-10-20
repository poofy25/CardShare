function LinkFieldBtn(props) {


    const icon = props.data.icon
    const field = props.data.text

    const setSelectedFields = props.setSelectedFields



    return ( 

     <button onClick={()=>{


      setSelectedFields(current=>{
        return({...current , [field]:{link:''}})})
     }}>
       <img src={icon}/>
       {field}
     </button>




     );
}

export default LinkFieldBtn;