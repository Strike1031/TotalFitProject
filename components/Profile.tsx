import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ProfileProps = {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  bio: string;
  role: string;
  image: string;
  user: {
    name: string;
    email: string;
    image: string;
  } | null;
};

const Profile: React.FC<{ profile: ProfileProps }> = ({ profile }) => {

    return (
      <div onClick={() => Router.push("/pf/[id]", `/pf/${profile.id}`)}>
        <h2>{profile?.user.name}</h2>
        <ReactMarkdown children={profile.user?.image} />
        <ReactMarkdown children={profile.bio} />
        <ReactMarkdown children={profile.phoneNumber} />
        <ReactMarkdown children={profile.address} />
        <ReactMarkdown children={profile.email} />
        <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
      </div>

    );
  }
  

export default Profile;

