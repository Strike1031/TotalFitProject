// pages/pending-weights.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Weight, { WeightProps } from '../components/Weight';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { pendingWeights: [] } };
  }

  const pendingWeights = await prisma.weight.findMany({
    where: {
      patient: { email: session.user.email },
      approved: false,
    },
    include: {
      patient: {
        select: { name: true },
      },
    },
  });
  return {
    props: { pendingWeights },
  };
};

type Props = {
  pendingWeights: WeightProps[];
};

const PendingWeights: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Pending Weights</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Pending Weights</h1>
        <main>
          {props.pendingWeights.map((weight) => (
            <div key={weight.id} className="post">
              <Weight weight={weight} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default PendingWeights;