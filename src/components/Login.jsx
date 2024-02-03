import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./Shared/formInput";
import { useState } from "react";

import { BiArrowBack } from "react-icons/bi";

import Form from "./Shared/form";
import Swal from "sweetalert2";
import axios from "axios";
import { storeUserInfo } from "./Auth/auth.server";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();
  const [check, setCheck] = useState(true);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://chain-tech-server-lime.vercel.app/api/v1/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = response.data;

      if (res?.data) {
        Swal.fire({
          title: `User login successfully`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        router("/other");
      }
      if (res.error) {
        setError(res.error);
        setCheck(false);
      } else {
        setError("");
      }

      if (res?.data) {
        Swal.fire({
          title: `User login successfully`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        router("/other");
        setLoading(false);
        storeUserInfo({ accessToken: res?.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    <Spinner animation="grow" variant="warning" />;
  }
  if (error) {
    Swal.fire("SomeThing Went Wrong!");
  }

  return (
    <div className="my-6">
      <Link to="/home">
        <div className="ml-3">
          <BiArrowBack className="text-4xl" />
        </div>
      </Link>

      <div className="container-xl w-40 px-5 py-5 border border-gray-900 mt-5">
        <Form submitHandler={handleSubmit}>
          <div className="space-y-4">
            <div className="border-bottom pb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-4 row g-2">
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
                    name="password"
                    type="password"
                    placeholder="*****"
                    label="Your password"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline w-50 rounded-full">
              Login
            </button>
          </div>
        </Form>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        not have your account?{" "}
        <Link
          to="/signUp"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
