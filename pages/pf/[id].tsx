// pages/pf/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { ProfileProps } from '../../components/Profile';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: profile,
  };
};

// DELETE
async function deleteProfile(id: string): Promise<void> {
  await fetch(`/api/profile/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}


const Profile: React.FC<ProfileProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const profileBelongsToUser = session?.user?.email === props.user?.email;
  let userName = props.user?.name;

  return (
    <Layout>
      <div>
        <h2>{userName}</h2>
        <ReactMarkdown children={props.user?.image} />
        <ReactMarkdown children={props.bio} />
        <ReactMarkdown children={props.phoneNumber} />
        <ReactMarkdown children={props.address} />
        <ReactMarkdown children={props.user?.email} />
        {
          userHasValidSession && profileBelongsToUser && (
            <button onClick={() => deleteProfile(props.id)}>Delete</button>
          )
        }
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
