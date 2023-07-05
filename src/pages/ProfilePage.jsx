import React from "react";

import ProfileContent from "../components/ProfileContent";
import { useParams } from "react-router-dom";
const ProfilePage = () => {
  const { loginId } = useParams();

  return (
    <div className="container w-full h-screen lg:w-4/5 mx-auto my-2 flex overflow-y-scroll">
      <ProfileContent loginId={loginId} />
    </div>
  );
};

export default ProfilePage;
