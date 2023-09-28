import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../_services/user.service";

const User = () => {
  let navigate = useNavigate();

  useEffect(() => {
    userService
      .getAllUser()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  const rayan = (userId) => {
    console.log("click");
    navigate("../edit/" + userId);
  };
  return (
    <div className="User">
      User Liste
      <button onClick={() => rayan(4)}>User 4</button>
    </div>
  );
};

export default User;
