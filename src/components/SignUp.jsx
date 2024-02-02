import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";

import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "./Auth/AuthProvider";

const SignUp = () => {
  //   const [isLoading, SetIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, googleSignIn, updateUserProfile } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // const { user } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("https://dev-town-server-2.vercel.app/api/v1/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((user) => {
            console.log(user?.data?.email);
            if (user) {
              axios
                .post(
                  "https://dev-town-server-2.vercel.app/api/v1/auth/login",
                  {
                    email: user?.data?.email,
                  }
                )
                .then((data) => {
                  console.log(data?.data);
                });
            }
            navigate(from, { replace: true });
          });
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=c71fd21009b2244466212ed88a7ea531`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.data.display_url) {
          createUser(data.email, data.password)
            .then((result) => {
              const loggedUser = result.user;
              console.log(loggedUser);
              updateUserProfile(data.name, imgData.data.display_url).then(
                () => {
                  const saveUser = {
                    name: data.name,
                    email: data.email,
                    image: imgData.data.display_url,
                    password: data.password,
                  };
                  fetch("https://dev-town-server-2.vercel.app/api/v1/user", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data) {
                        handleData(data);
                        console.log("User profile updated");
                        reset();
                        toast("User created successfully", {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        navigate("/");
                      }
                    });
                }
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast(errorCode, errorMessage, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            });
        }
      });
  };

  const handleData = (data) => {
    axios
      .post("https://dev-town-server-2.vercel.app/api/v1/auth/login", {
        email: data?.data?.email,
      })
      .then((data) => {
        console.log(data?.data);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Link to={"/"}>
            <BiArrowBack className="text-3xl ml-6 mt-9" />
          </Link>
        </Col>
      </Row>
      <Row className="hero min-h-screen">
        <Col lg={{ span: 6, order: "last" }}>
          <div className="text-center lg:text-left">
            <figure>
              <img className="h-[480px]" src={""} alt="" />
            </figure>
          </div>
        </Col>
        <Col lg={{ span: 6, order: "first" }}>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <Form.Text className="text-red-500">
                    Name is required
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>PhotoURL</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="image"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <Form.Text className="text-red-500">
                    PhotoURL is required
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Form.Text className="text-red-500">
                    Email is required
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {errors.password?.type === "minLength" && (
                  <Form.Text className="text-red-600">
                    Password must be 6 characters
                  </Form.Text>
                )}
                {errors.password?.type === "required" && (
                  <Form.Text className="text-red-600">
                    Password is required
                  </Form.Text>
                )}
                <Form.Text>
                  <a href="#" className="link link-hover">
                    Forgot password?
                  </a>
                </Form.Text>
              </Form.Group>

              <div className="mt-4">
                {/* <LoadingButton
                  type="submit"
                  className="btn btn-accent mt-3 w-full"
                  value="Login"
                >
                  {isLoading ? <SmallSpinner /> : "signUp"}
                </LoadingButton> */}
                <Button type="submit" className="btn btn-outline btn-primary">
                  SignUp
                </Button>
              </div>

              <Button
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-primary"
              >
                <FcGoogle className="text-3xl" />
              </Button>

              <p className="my-2">
                Already have an account
                <Link to="/login">
                  <a className="link link-primary"> Login</a>
                </Link>
              </p>
              {errors.err && (
                <span className="text-red-500">user already exist</span>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
