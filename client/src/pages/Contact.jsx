// import React from "react";
import { useForm, ValidationError } from "@formspree/react";

import { useState } from "react";
import Navbar2 from "../components/Navbar2";

const Contact = () => {
  const [state, handleSubmit] = useForm("mzzpddkg");
  const [userData, setUserData] = useState({
      name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
        return {
            ...prevData,
            [name]: value,
        };
    });
};

    if (state.succeeded) {
    return <p>Thanks for joining!</p>;
    }
  const sendEmail = () => {
    console.log(userData);
  };
  return (
    <div className="">
      <Navbar2 />

      <section className="py-0 px-32 xs:px-0 sm:py-16 lg:py-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 maxW-7xl">
          <div className="maxW-2xl mx-auto text-center">
            <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl lg:text-3xl">
              Contact us
            </h2>
          </div>

          <div className="maxW-5xl mx-auto mt-3 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div className="overflow-hidden bgWhite rounded-xl">
                <div className="px-2 ">
                  <svg
                    className="flex-shrink-0 w-1/4 h-8 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="mt-6 text-md font-medium text-gray-900">
                    +91-9113353894
                  </p>
                </div>
              </div>

              <div className="overflow-hidden bgWhite rounded-xl">
                <div className="px-2">
                  <svg
                    className="flex-shrink-0 w-1/4 h-8 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-6 text-md font-medium text-gray-900">
                    Ujjwalprakash762@gmail.com
                  </p>
                </div>
              </div>

              <div className="overflow-hidden bgWhite rounded-xl">
                <div className="px-2">
                  <svg
                    className="flex-shrink-0 w-1/4 h-8 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="mt-6 text-md font-medium leading-relaxed text-gray-900">
                    Greater Noida, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 overflow-hidden bgWhite rounded-xl">
              <div className="px-6 py-12 sm:p-12">
                <h3 className="text-3xl font-semibold text-center text-gray-900">
                  Send me a message
                </h3>

                <form onSubmit={handleSubmit} className="mt-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Your name{" "}
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          onChange={handleChange}
                          value={userData.name}
                          placeholder="Enter your full name"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bgWhite border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={userData.email}
                          onChange={handleChange}
                          placeholder="Enter valid email"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bgWhite border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                      <ValidationError
                        prefix="Eame"
                        field="eamil"
                        errors={state.errors}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Phone number{" "}
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          id="phone"
                          placeholder="Enter with country code"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bgWhite border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                      <ValidationError
                        prefix="Phone"
                        field="phone"
                        errors={state.errors}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Company name (Optional)
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          type="text"
                          name="company"
                          value={userData.company}
                          onChange={handleChange}
                          id="company"
                          placeholder="Enter full name"
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bgWhite border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                        />
                      </div>
                      <ValidationError
                        prefix="company"
                        field="company"
                        errors={state.errors}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Message{" "}
                      </label>
                      <div className="mt-2.5 relative">
                        <textarea
                          name="message"
                          value={userData.message}
                          onChange={handleChange}
                          id="message"
                          required
                          placeholder="Type here your message...."
                          className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bgWhite border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600"
                          rows="4"
                        ></textarea>
                      </div>
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />
                    </div>

                    <div className="sm:col-span-2 text-center">
                      <button
                        type="submit"
                        disabled={state.submitting}
                        onClick={sendEmail}
                        className="inline-flex items-center justify-center w-1/2 px-4 py-4 mt-2 text-base font-semibold textWhite transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

// function ContactForm() {

//   return (
//     <form >
//       <label htmlFor="email">
//         Email Address
//       </label>
//       <input
//         id="email"
//         type="email"
//         name="email"
//       />
//   <ValidationError
//     prefix="Email"
//     field="email"
//     errors={state.errors}
//   />
//       <textarea
//         id="message"
//         name="message"
//       />
//       <ValidationError
//         prefix="Message"
//         field="message"
//         errors={state.errors}
//       />
//       <button type="submit" >
//         Submit
//       </button>
//     </form>
//   );
// }

// export default ContactForm;
