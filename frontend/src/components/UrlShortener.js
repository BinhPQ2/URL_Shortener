import React, { useState } from 'react';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call backend API here (mocked for now)
        const generatedShortUrl = "http://short.ly/example"; // Replace this with actual response
        setShortUrl(generatedShortUrl);
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



