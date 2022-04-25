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
        <h4 className='text-center mb-1' style={{color:'magenta'}}>  &nbsp; <strong>  {selectedDoc.fileName}</strong>  &nbsp;   </h4>
        <h4 className='text-center mb-1'> {selectedDoc.category} &nbsp; {selectedDoc.technique}  &nbsp; {selectedDoc.size}  &nbsp; </h4>
      </div>

        {/* <textarea rows="5" cols="100" name = "description"  readOnly
            //  defaultValue={selectedDoc.description}
            placeholder={selectedDoc.description} 
            >
        </textarea>  */}
    </div>
  )
}

export default Modal;