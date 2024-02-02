import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getUserInfo } from "./Auth/auth.server";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const { userId, role } = getUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/${userId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);
  console.log(data);
  return (
    <div className="d-flex justify-content-center min-h-[50vh]">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={data?.image} />
        <Card.Body>
          <Card.Title>{data?.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
