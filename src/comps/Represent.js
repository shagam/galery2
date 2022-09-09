

export function Represent (props) {


  function collectReps () {
    // collect all checkedBox reps
    var repsArray = [];
    var repDocs = [];

    for (let i = 0; i < props.docs.length; i++) {
      if (props.docs[i].represent && ! repsArray.includes(props.docs[i].category)) { // uniqu rep
        repsArray.push (props.docs[i].category)
        repDocs.push(props.docs[i])
      }
    }

    // fill missing categories. if no check choose first
    for (let i = 0; i < props.docs.length; i++) {
      if ( ! repsArray.includes(props.docs[i].category)) { // uniqu rep
        repsArray.push (props.docs[i].category)
        repDocs.push(props.docs[i])
      }
    }
    var str = '';
    for (let i = 0; i < repDocs.length; i++)
      str += repDocs[i].fileName + ' (' + repDocs[i].category + ')  ';
    console.log (repsArray, str)
  }

  collectReps()

  return (
    <div></div>

  )

}