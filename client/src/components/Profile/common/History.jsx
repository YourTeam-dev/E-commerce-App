import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import HistoricAPI from '../../../API/Historic';

function History() {
  const { user } = useAuth();
  const [historic, setHistoric] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      HistoricAPI.getUserHistoric(user._id)
        .then((res) => {
          if (res && res.success) {
            setHistoric(res.data);
          } else {
            setError('Failed to load historic data');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load historic data');
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('User not logged in');
    }
  }, [user]);

  if (loading) return <div>Loading historic data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">History</h2>
      {historic.length === 0 ? (
        <p>No historic records found.</p>
      ) : (
        <ul>
          {historic.map((item) => (
            <li key={item._id} className="mb-2 border-b pb-2">
              <div><strong>Title:</strong> {item.title}</div>
              <div><strong>Action:</strong> {item.action}</div>
              <div><strong>Description:</strong> {item.discription}</div>
              <div><small>{new Date(item.createdAt).toLocaleString()}</small></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
