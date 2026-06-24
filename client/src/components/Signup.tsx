import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ID } from "../config/localStorageKeys";
import { API_URL } from "../config/api";

interface FormData {
    name : string, 
    email : string, 
    password :string
}


const Signup = () => {

    const [formData, setFormData] = useState<FormData>({
        email : "", 
        name : "", 
        password : ""
    });
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    console.log("formData", formData);

    const response = await axios.post(`${API_URL}/api/auth/signup`, formData );

    console.log("Response", response);

    const data = response.data;
     
    console.log("User created:", data.data);
    localStorage.setItem(USER_ID, data.data.user_id)
    navigate("/expense");

    // Reset form after successful signup
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  } catch (error) {
    console.error("Signup failed:", error);
  }
};

    
    return  (<div className="w-dvw h-dvh flex justify-center items-center ">
    <div className="flex bg-gray-100  max-w-lg max-h-125 w-[95%] rounded-2xl shadow-md  sm:w-full  h-full flex-col justify-center px-6 py-12 lg:px-8 ">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">Sign Up</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-10">
    <form onSubmit={handleSubmit} className="space-y-6 text-black">

        <div>
        <label htmlFor="name" className="block text-sm/6 font-medium ">Name</label>
        <div className="mt-2">
          <input id="name" value={formData.name} type="text" name="name" required autoComplete="email" className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  sm:text-sm/6" onChange={(e) => setFormData((prev) => ({...prev, name : e.target.value}))}/>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium ">Email address</label>
        <div className="mt-2">
          <input id="email" type="email" value={formData.email} name="email" required autoComplete="email" className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  sm:text-sm/6" onChange={(e) => setFormData((prev) => ({...prev, email : e.target.value}))}/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium ">Password</label>
        </div>
        <div className="mt-2">
          <input id="password" type="password" value={formData.password} name="password" required autoComplete="current-password" className="block w-full rounded-md  border border-black bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  sm:text-sm/6" 
          onChange={(e) => setFormData((prev) => ({...prev, password : e.target.value}))}
          />
        </div>
      </div>

      <div className="underline text-center cursor-pointer " onClick={() => navigate("/login")}>
        Login
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold  hover:bg-gray-400  cursor-pointer">Sign Up</button>
      </div>
    </form>

  </div>
</div>  
    </div>)
}

export default Signup;