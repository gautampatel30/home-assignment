import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('horizontal');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:9800/api/data');
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Retrying...');
      setTimeout(fetchData, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={() => setViewMode(viewMode === 'horizontal' ? 'vertical' : 'horizontal')}>
        Toggle View
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSort}>Sort</button>
      <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <div style={{ display: viewMode === 'horizontal' ? 'flex' : 'block' }}>
        {paginatedData.map((item) => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        Previous
      </button>
      <button
        disabled={currentPage * pageSize >= filteredData.length}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default DisplayComponent;
