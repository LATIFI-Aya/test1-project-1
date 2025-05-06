import React, { useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { MdUpload } from 'react-icons/md';

const Register = () => {

  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [ formData, setFormData ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ 
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      body: register_form,
    });

    if(response.ok) {
      navigate("/login");
    }
   } catch (err) {
      console.log("Registration failed", err.message);
    }
  }

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]); // Added dependency array to avoid infinite loop

  //console.log(formData);
  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter '>
      <div>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>
            <h3 className='h3 my-4'>Sign Up</h3>
          <input onChange={handleChange} value={formData.firstName} type="text" name='firstName' placeholder='First Name' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={handleChange} value={formData.lastName} type="text" name='lastName' placeholder='Last Name' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={handleChange} value={formData.email} type="email" name='email' placeholder='Email Address' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={handleChange} value={formData.password} type="password" name='password' placeholder='password' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={handleChange} value={formData.confirmPassword} type="password" name='confirmPassword' placeholder='confirm Password' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          {!passwordMatch && <p>Password do not match</p>}
          <input onChange={handleChange} type="file" id='image' name='profileImage'  accept='image/*' hidden required />
          <label htmlFor="image">
            <div className='flexCenter ring-1 ring-slate-900/10 p-1 h-16 w-16 rounded'> 
            {formData.profileImage ? (
              <img src={URL.createObjectURL(formData.profileImage)} alt="profileImg" className='p-1 h-16 object-contain aspect-square' />
            ) : (
              <MdUpload className="text-tertiary text-2xl" />
            )}
            </div>
          </label>
          <button type="submit" className='btn-secondary rounded mt-2'> Register </button>
          <div className='text-gray-30'> Already have an account?
            <Link to={'/login'} className='text-secondary cursor-pointer pl-1' > Login </Link> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;