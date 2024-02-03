import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getUserInfo } from "./Auth/auth.server";

import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";

const Other = () => {
  const { userId } = getUserInfo();

  const { data: cart = [], isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const res = await fetch(
        `https://chain-tech-server-lime.vercel.app/api/v1/user/${userId}`
      );
      return res.json();
    },
  });

  if (isLoading) {
    <Spinner animation="grow" variant="warning" />;
  }
  return (
    <div className="d-flex justify-content-center min-h-[50vh]">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={cart?.data?.image} />
        <Card.Body>
          <Card.Title>Name: {cart?.data?.name}</Card.Title>
          <Card.Text>Email: {cart?.data?.email}</Card.Text>
          <Card.Text>ContactInfo: {cart?.data?.contactNo}</Card.Text>
          <Card.Text>Address: {cart?.data?.address}</Card.Text>
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

export default Other;
