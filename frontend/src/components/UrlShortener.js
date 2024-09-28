// import React, { useState } from 'react';

// const UrlShortener = () => {
//     const [longUrl, setLongUrl] = useState('');
//     const [shortUrl, setShortUrl] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Call backend API here (mocked for now)
//         const generatedShortUrl = "http://short.ly/example"; // Replace this with actual response
//         setShortUrl(generatedShortUrl);
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(shortUrl).then(() => {
//             alert('Short URL copied to clipboard!');
//         });
//     };
    
//     return (
//         <div className="url-shortener container mt-5">
//             <form className="form-group" onSubmit={handleSubmit}>
//                 <label htmlFor="url-input">Enter Long URL:</label>
//                 <input
//                     type="url"
//                     id="url-input"
//                     className="form-control"
//                     value={longUrl}
//                     onChange={(e) => setLongUrl(e.target.value)}
//                     required
//                 />
//                 <button type="submit" className="btn btn-primary mt-3">Shorten URL</button>
//             </form>
//             {shortUrl && (
//                 <div className="result mt-4">
//                     <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
//                     <button className="btn btn-secondary" onClick={copyToClipboard}>Copy to Clipboard</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UrlShortener;

import React, { useState } from 'react';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);

    // Update this URL to point to your Django backend (local or deployed)
    const BACKEND_URL = "http://127.0.0.1:8000/api/shorten/";
    const baseUrl = new URL(BACKEND_URL).origin;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error before making the request

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ original_url: longUrl }),  // Send the long URL to backend
            });

            if (response.ok) {
                const data = await response.json();
                setShortUrl(`http://127.0.0.1:8000/api/${data.short_code}/`);  // Construct short URL
            } else {
                const errorData = await response.json();
                setError(errorData);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(`An error occurred. Please try again. Error: ${err}`);        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Short URL copied to clipboard!');
        });
    };

    return (
        <div className="url-shortener container mt-5">
            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="url-input">Enter Long URL:</label>
                <input
                    type="url"
                    id="url-input"
                    className="form-control"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary mt-3">Shorten URL</button>
            </form>

            {error && (
                <div className="error mt-4 text-danger">
                    <p>Error: {error}</p>
                </div>
            )}

            {shortUrl && (
                <div className="result mt-4">
                    <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                    <button className="btn btn-secondary" onClick={copyToClipboard}>Copy to Clipboard</button>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;


