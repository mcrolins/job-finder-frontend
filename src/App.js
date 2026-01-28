import {useState, useEffect, useCallback} from 'react';
function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('software engineer');
    const [location, setLocation] = useState('remote');

    const fetchJobs = useCallback(async () => {
  setLoading(true);
  
  // Use environment variable or fallback to localhost
  const API_URL = 'https://job-finder-api-tke5.onrender.com' || 'http://localhost:8000';
  const url = `${API_URL}/api/jobs/?q=${encodeURIComponent(keyword)}&l=${encodeURIComponent(location)}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setJobs(data.results || []);
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Failed to load jobs");
  } finally {
    setLoading(false);
  }
}, [keyword, location]);
    
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