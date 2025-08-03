import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupApi } from '../../API/Auth';
import useAuth from '../../hooks/useAuth';

const Signup = ({closePopup}) => {
  const { login } = useAuth()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    await signupApi(name, email, password)
      .then((res) => {
        login(res.data);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        closePopup();
      })
      .catch((err) => {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 ">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#d58a94] text-white py-2 rounded hover:bg-[#d58a94]/80 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
