import React from "react";



const Modal = ({ selectedDoc, setSelectedDoc }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedDoc (null);
    }
  } 
  
  return (

    <div className="backdrop" onClick={handleClick}>

      <img src={selectedDoc.fileUrl} alt="enlarged pic" />

      <div className="modalFiedls" style={{display:'flex'}}>
        <button type="button" onClick={()=>setSelectedDoc (null)}>close</button>
        <h4 className='text-center mb-1'> &nbsp; name: {selectedDoc.fileName},  category: {selectedDoc.category}  </h4>
        <h4 className='text-center mb-1'> <strong > size </strong> {selectedDoc.size}  paint:  {selectedDoc.paint}   </h4>
        </div>

        <textarea rows="10" cols="70" name = "description"  readOnly
            //  defaultValue={selectedDoc.description}
            placeholder={selectedDoc.description} 
            >
        </textarea> 
         


    </div>
  )
}

export default Modal;