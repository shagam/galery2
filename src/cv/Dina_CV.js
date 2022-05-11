import React, {useState, useEffect, useMemo} from 'react'

// import './Manual.css'

import filePDF from './Dina_CV.pdf'

const Cv = (props) => {
  // const [ManualFlag, setManualFlag] = useState(false);

  const pdfCache = useMemo(() => filePDF, []);


  const style = {
      padding: '0px',
      margin: '0px',
      'white-space': 'pre-wrap',
      width: '800px',
      height: '200%',
      /* font-size: 100%; */
    }



try {
  return <div className='upload-expense'>

    <div className='txt'>

        <div className='text'> 
          <div id = "pdf_id" style={style}>       
              <object data={pdfCache} type="application/pdf"
              width="1000" height="700" border='3' standby="Loading" >  </object>    
           </div>
        </div>
   
    </div>
  </div>;
} catch (e) {console.log (e)}
}

export default Cv;