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
      <h1>  fileName: {selectedDoc.fileName}  file_kb:  {selectedDoc.file_kb} fileType: {selectedDoc.fileType}</h1>
    </div>
  )
}

export default Modal;