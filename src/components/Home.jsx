import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getUserInfo } from "./Auth/auth.server";

import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const Home = () => {
  const [data, setData] = useState(null);
  const { userId, role } = getUserInfo();

  const {
    data: cart = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/user/${userId}`);
      return res.json();
    },
  });
  console.log(cart);

  if (isLoading) {
    <p>Loading...</p>;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/v1/user/${userId}`
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [userId]);
  // console.log(data);
  return (
    <div className="d-flex justify-content-center min-h-[50vh]">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={cart?.data?.image} />
        <Card.Body>
          <Card.Title>{cart?.data?.name}</Card.Title>
          <Card.Text>{cart?.data?.email}</Card.Text>
          <Card.Text>{cart?.data?.contactNo}</Card.Text>
          <Card.Text>{cart?.data?.address}</Card.Text>
          <Link to={`/${cart?.data?._id}`}>
            <Button variant="primary">
              <CiEdit />
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
