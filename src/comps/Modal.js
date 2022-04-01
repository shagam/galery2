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

      <div className="modalFiedls">
      <h4 className='text-center mb-1'> name: {selectedDoc.fileName},  category: {selectedDoc.category}  </h4>
      <h4 className='text-center mb-1'> <strong > size </strong> {selectedDoc.size}  paint:  {selectedDoc.paint}   </h4>

      <textarea rows="10" cols="70" name = "description"  readOnly
          //  defaultValue={selectedDoc.description}
          placeholder={selectedDoc.description} 
           >
      </textarea> 
         

      </div>
    </div>
  )
}

export default Modal;