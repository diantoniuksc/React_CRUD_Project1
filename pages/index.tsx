import React from 'react';
import App from './components/app';
import Link from 'next/link';


const MyHome: React.FC = () => {
  return <App />;
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/Login">Login</Link>
    </div>
  );
};

export default Home;
