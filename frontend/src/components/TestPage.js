import React from "react";
import { useEffect, useState } from "react";

const TestPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const lastName = "Morton";
  const campNum = "MTL-CAMP-05";
  const shelterNum = "01";

  useEffect(() => {
    fetch(
      `/api/camper?lastname=${lastName}&campnum=${campNum}&shelternum=${shelterNum}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        setUserInfo(json.data[0]);
      });
  }, []);

  return (
    <>
      <h1>ProfilePage</h1>
      {userInfo && (
        <>
          <h3>first name: {userInfo.firstName}</h3>
          <h3>last name: {userInfo.lastName}</h3>
          <h3>camp No.: {userInfo.campNum}</h3>
          <h3>shelter No.: {userInfo.shelterNum}</h3>
          <h3>skills : {userInfo.skills}</h3>
          {userInfo.msg.map((msg) => (
            <>
              <p>{Date(msg.msgTime)}:</p>
              <p>{msg.msgContent}</p>
              <p>{msg.msgRead}</p>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default TestPage;
