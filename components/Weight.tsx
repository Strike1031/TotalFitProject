import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type WeightProps = {
  id: string;
  measurement: string;
  patient: {
    name: string;
    email: string;
  } | null;
  dateTaken: string;
  approved: boolean;
};

const Weight: React.FC<{ weight: WeightProps }> = ({ weight }) => {
  const dateTaken = weight.dateTaken;
  return (
    <div onClick={() => Router.push("/w/[id]", `/w/${weight.id}`)}>
      <h2>{dateTaken}</h2>
      <ReactMarkdown children={weight.measurement} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Weight;

// model Weight {
//   id            String @id @default(auto()) @map("_id") @db.ObjectId
//   weight        Int
//   user          User   @relation(fields: [userId], references: [id])
//   userId        String @unique @db.ObjectId
//   dateTaken     DateTime?

// }
