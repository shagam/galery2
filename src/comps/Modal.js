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
      <h1> -    name: {selectedDoc.name}  size:  {selectedDoc.size} 'type:' {selectedDoc.type}</h1>
    </div>
  )
}

export default Modal;