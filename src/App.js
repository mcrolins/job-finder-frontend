import {useState, useEffect, useCallback} from 'react';
function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('software engineer');
    const [location, setLocation] = useState('remote');

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/jobs/?q=${keyword}&l=${location}`);
        const data = await res.json();
        setJobs(data.results || []);
        setLoading(false);
    }, [keyword, location]); // ← Now it depends on keyword & location
    
    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]); // ← No more warning!
    
    return (
        <div>
            <h1>Job Finder</h1>
            <input onChange={(e) => setKeyword(e.target.value)} placeholder="Job Title" />
            <input onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <button onClick={fetchJobs}>Search</button>
            { loading ? <p>Loading...</p> : (
                <div>
                    {jobs.map((job) => (
                        <div key={job.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{job.title}</h3>
                            <p>{job.company.display_name}</p>
                            <p>{job.location.display_name}</p>
                           <a 
                              href={job.redirect_url} 
                              target="_blank" 
                              rel="noreferrer" // ✅ Fixes security warning
                            >
                              Apply
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
        )
      
}
  export default App;