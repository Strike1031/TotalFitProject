// pages/profiles.tsx
import Link from 'next/link';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Profile, { ProfileProps } from '../components/Profile';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { profile: [] } };
  }

  const profile = await prisma.profile.findMany({
    where: {
      user: { email: session.user.email }
    },
    include: {
      user: {
        select: { name: true, email: true, image: true },
      },
    },
  });
  return {
  props: { profile },
  };
};

type Props = {
  profile: ProfileProps[];
};

const UserProfile: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  if (props.profile.length === 0) {
    console.log(props.profile.length);
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>Your profile is empty click the button below to create one!</div>
        <Link href="/create-profile">
          <button>
            <a>Create Profile</a>
          </button>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Profile</h1>
        <main>
          {props.profile.map((profile) => (
            <div key={profile.id} className="profile">
                <Profile profile={profile} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .profile {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .profile:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .profile + .profile {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default UserProfile;