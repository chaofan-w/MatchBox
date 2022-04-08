import React from "react";
import { useEffect } from "react";

const TestPage = () => {
  // const [msg,setMsg]=useState({});

  useEffect(() => {
    const msg = {
      camperId: "624ff8814a0467cbea0694f0",
      msgContent: "#5 we found new task for you",
      msgRead: false,
    };
    fetch("/api/camper/msg", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(msg),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
      });
  }, []);

  return <h1>TestPage</h1>;
};

export default TestPage;
