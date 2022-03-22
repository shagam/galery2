import React from "react";



const Modal = ({ selectedDoc, setSelectedDoc }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedDoc (null);
    }
  } 
  
  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedDoc.url} alt="enlarged pic" />
      <div> name: {selectedDoc.name}  size:  {selectedDoc.size} 'type:' {selectedDoc.type}</div>
    </div>
  )
}

export default Modal;