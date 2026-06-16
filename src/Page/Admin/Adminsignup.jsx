import React from 'react'

const Adminsignup = () => {
  return (
    <div  className='adminContainer'>
      <div className='adminImage'><img src="public/About/Icon.png" alt="" /></div>
     <form className='adminForm'>
         <div className='adminInput'>
            <label htmlFor="">Enter your name</label>
        <input type="text" placeholder='first name'/>
      </div>

       <div className='adminInput'>
         <label htmlFor="">Enter your last name</label>
        <input type="text" placeholder='last name'/>
      </div>

       <div className='adminInput'>
         <label htmlFor="">password</label>
        <input type="text" placeholder='Enter your password'/>
      </div>

       <div className='adminInput'>
         <label htmlFor="">password</label>
        <input type="text" placeholder='Repeat password'/>
      </div>
     </form>
    </div>
  )
}

export default Adminsignup
