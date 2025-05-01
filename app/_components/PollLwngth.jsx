import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function PollLength({Arra,title}) {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>

      <button className="px-3 py-1 bg-white text-black">
        <label htmlFor='days' className='px-3 py-3 border-none text-black text-sm '>{title}</label>
      <select id='days' className='border-none py-1 md:py-4 outline-none focus:outline-none '>
        

        {
          Arra.map((el,i)=>{
            return <option className=' text-black ' value={el} key={i}>
              {el}

            </option>
          })
        }

      </select>
      </button>
     
    
    </div>
  );
}
