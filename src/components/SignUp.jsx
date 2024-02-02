import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import { BiArrowBack } from "react-icons/bi";

// import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import FormInput from "./Shared/formInput";
import Form from "./Shared/form";

const SignUp = () => {
  const router = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  const uploadImage = async (formData) => {
    const url =
      "https://api.imgbb.com/1/upload?key=c71fd21009b2244466212ed88a7ea531";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data.display_url;
    } else {
      console.error(
        "Failed to upload image:",
        response.status,
        response.statusText
      );
      return null;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (!image) {
      console.log("Please select image!");
      setLoading(false); // Make sure to set loading to false in case of an early return
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // Upload image
    const imageUrl = await uploadImage(formData);

    if (imageUrl) {
      // If image upload is successful, update the data object
      data.profileImage = imageUrl;

      // POST request to your local API
      const apiUrl = "http://localhost:5000/api/v1/user";
      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (apiResponse.ok) {
        const responseData = await apiResponse.json();
        // Handle the response from your API as needed
        console.log(responseData);

        Swal.fire("User signed up successfully!!");
        router("/");
      } else {
        // Handle the case where the API request was not successful
        console.error(
          "Failed to make API request:",
          apiResponse.status,
          apiResponse.statusText
        );
      }

      setLoading(false);
    }
  };

  // const onSubmit = async (data) => {
  //   setLoading(true);

  //   if (!image) {
  //     console.log("Please select image!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", image);

  //   const url = `https://api.imgbb.com/1/upload?key=c71fd21009b2244466212ed88a7ea531`;
  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     if (responseData.data) {
  //       data.profileImage = responseData.data.display_url;
  //       const res = await userSignup(data);
  //       if (res) {
  //         Swal.fire("user signup successfully!!");
  //         router.push("/login");
  //         setLoading(false);
  //       }
  //     }
  //   }
  // };

  // const onSubmit = async (data) => {
  //   console.log(data);
  // };

  return (
    <div className="my-6">
      <Link to="/home">
        <div className="ml-3">
          <BiArrowBack className="text-4xl" />
        </div>
      </Link>

      <div className="container-xl w-40 px-5 py-5 border border-gray-900 mt-5">
        <Form submitHandler={onSubmit}>
          <div className="space-y-4">
            <div className="border-bottom pb-4">
              <h2 className="text-base font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-xl text-black">
                Enter all your information correctly.
              </p>

              <div className="col-span-2">
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="border-bottom pb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-4 row g-3">
                <div className="col-md-6">
                  <FormInput
                    id=""
                    type="text"
                    name="name"
                    placeholder="Type your name"
                    label="Your Name"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    id=""
                    name="password"
                    type="password"
                    placeholder="*****"
                    label="Your password"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    id=""
                    name="email"
                    type="email"
                    label="Your email"
                    placeholder="Enter your email"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    id=""
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Write your address"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <FormInput
                    id=""
                    name="contactNo"
                    type="text"
                    label="Number"
                    placeholder="Your number"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline w-50 rounded-full">
              Signup
            </button>
          </div>
        </Form>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        not have your account?{" "}
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
