import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const PendingWeight: React.FC = () => {
  const [dateTaken, setDateTaken] = useState("");
  const [measurement, setMeasurement] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { dateTaken, measurement };
      await fetch(`/api/weight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/pending-weights");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Entry</h1>
          <input
            autoFocus
            onChange={(e) => setDateTaken(e.target.value)}
            placeholder="Date"
            type="date"
            value={dateTaken}
          />
          <input
            autoFocus
            onChange={(e) => setMeasurement(e.target.value)}
            placeholder="Weight"
            type="text"
            value={measurement}
          />
          <input disabled={!dateTaken || !measurement} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default PendingWeight;

