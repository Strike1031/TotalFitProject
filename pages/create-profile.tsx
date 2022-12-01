// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const CreateProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');


  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, email, phoneNumber, address, role, bio, image };
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Update Info</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            value={email}
          />
          <input
            autoFocus
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            type="tel"
            value={phoneNumber}
          />
          <input
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            type="text"
            value={address}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="PATIENT">Patient</option>
            <option value="PHYSICIAN">Physician</option>
            <option value="ADMIN">Admin</option>
          </select>
          <textarea
            cols={50}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Content"
            rows={8}
            value={bio}
          />
          <input
            autoFocus
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image"
            type="img"
            value={image}
          />
          <input disabled={!bio || !name} type="submit" value="Create" />
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

export default CreateProfile;
