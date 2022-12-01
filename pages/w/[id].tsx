// pages/w/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { WeightProps } from '../../components/Weight';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const weight = await prisma.weight.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      patient: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: weight,
  };
};

async function approveEntry(id: string): Promise<void> {
  await fetch(`/api/approve/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

// DELETE
async function deleteEntry(id: string): Promise<void> {
  await fetch(`/api/weight/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}


const Weight: React.FC<WeightProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const weightBelongsToUser = session?.user?.email === props.patient?.email;
  let dateTaken = props.dateTaken;
  if (!props.approved) {
    dateTaken = `${dateTaken} (Awaiting Approval)`;
  }

  return (
    <Layout>
      <div>
        <h2>{dateTaken}</h2>
        <p>for {props?.patient?.name || 'Unknown user'}</p>
        <ReactMarkdown children={props.measurement} />
        {
          !props.approved && userHasValidSession && weightBelongsToUser && (
            <button onClick={() => approveEntry(props.id)}>Approve</button>
          )
        }
        {
          userHasValidSession && weightBelongsToUser && (
            <button onClick={() => deleteEntry(props.id)}>Delete</button>
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

export default Weight;
