import React, {useMemo} from 'react'
import { Link } from 'react-router-dom'
// import './Manual.css'

import filePDF from './Dina_CV.pdf'

const Cv = (props) => {
  // const [ManualFlag, setManualFlag] = useState(false);

  const pdfCache = useMemo(() => filePDF, []);


  const style = {
      padding: '0px',
      margin: '0px',
      'whiteSpace': 'pre-wrap',
      width: '800px',
      height: '200%',
      /* font-size: 100%; */
    }



try {
  return <div className='upload-expense'>

    <div className='txt'>

        <div className='text'> 
          <div className='w-100 text-left mt-2'>  <Link to="/dashboard" > Dashboard </Link> </div>
          <div className='w-100 text-left mt-2'>  <Link to="/dina" > Back to Gallery </Link> </div>
          <hr/>
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