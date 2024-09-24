import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QueriesPage.css'; // Import your CSS file
import { Link } from 'react-router-dom'

const Queries = () => {
    const [queryList, setQueryList] = useState([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const result = await axios.get('http://localhost:3000/queryHandle/getQueries');
                if (result && result.data) {
                    setQueryList(result.data);
                }
            } catch (error) {
                console.log({ message: error.message });
            }
        };
        fetchQueries();
    }, []);

    return (
        <div className="queries-container">
            {queryList.length === 0 ? (
                <p>There are no queries</p>
            ) : (
                queryList.map((query, index) => (
                    <div key={index} className="query-card">
                        <Link to={`/replyPage/${query._id}`}>
                        <p><strong>From:</strong> {query.name}</p>
                        <p><strong>Subject:</strong> {query.subject}</p>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Queries;
