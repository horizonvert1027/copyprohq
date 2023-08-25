// import React, { useState } from 'react';
// import axios from 'axios';
// import {API_BASE_URL} from '../../config';

// const Signup = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [company, setCompany] = useState('');
//     const [contactNo, setContactNo] = useState('');

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`${API_BASE_URL}/signup`, {
//                 email,
//                 password,
//                 name,
//                 company,
//                 contact_no: contactNo,
//             });
//             // Redirect to login page or show a success message
//         } catch (error) {
//             console.error('Signup error:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Signup</h2>
//             <form onSubmit={handleSignup}>
//                 <input
//                     type="name"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="company"
//                     placeholder="Company"
//                     value={company}
//                     onChange={(e) => setCompany(e.target.value)}
//                 />
//                 <input
//                     type="contact"
//                     placeholder="Contact Number"
//                     value={contactNo}
//                     onChange={(e) => setContactNo(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {/* Input fields for email, password, name, company, and contactNo */}
//                 <button type="submit">Signup</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;


import React from 'react';
import SignupForm from '../components/signup_form';
import { Typography } from '@mui/material';

const Signup = () => {
    return (
        <div className="h-screen grid grid-cols-2">
            <div className="bg-blue-800 flex">
                <div className="m-auto text-center">
                    {/* <img className="m-auto" src={searchingSVG} /> */}
                    <h1 className="text-white font-bold text-4xl my-8">
                        ComplaintFix
                    </h1>
                    <p className="text-[#8BA3F8]">
                        At The Speed of Thought
                    </p>
                </div>
            </div>
            <div
                className="place-items-center m-auto px-16"
                style={{ width: '100%' }}>
                <Typography variant="h4">
                    Please Signup to continue.
                </Typography>
                <div>
                    <SignupForm />
                </div>
            </div>
        </div>

    );
};

export default Signup;