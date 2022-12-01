import React from "react";
import type { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import Weight, { WeightProps } from "../components/Weight";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const weightFeed = await prisma.weight.findMany({
    where: {
      approved: true,
    },
    include: {
      patient: {
        select: {
          name: true,
        },
      },
    },
  });
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed, weightFeed },
  };
};

type Props = {
  feed: PostProps[];
  weightFeed: WeightProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Dashboard</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Dashboard</h1>
        <main>
          <h2>My Posts</h2>
          {props.feed.map((post) => (
            <div key={post.id} className="area">
              <Post post={post} />
            </div>
          ))}
          <h2>My Weights</h2>
          {props.weightFeed.map((weight) => (
            <div key={weight.id} className="area">
              <Weight weight={weight} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .area {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .area:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .area + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
