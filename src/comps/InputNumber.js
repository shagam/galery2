import {useState} from 'react';

const App = (props) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setValue(result);

    console.log (result)
  };

  function submit () {
    props.setNumber(value)
    console.log(value);
  // console.log(typeof value);
  // console.log(Number(value));
  }

  return (
    <form onSubmit={submit} >
      <div  style={{display: 'flex'}} >
        <div>{props.title} &nbsp; &nbsp; </div>
        <input
          type="text"
          placeholder={props.title}
          value={value}
          onChange={handleChange}
        />
        <button type="submit"> submit </button> 
      </div>

    </form>
  );
};

export default App;