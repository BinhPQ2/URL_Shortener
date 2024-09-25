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

    return (
        <div className="url-shortener">
            <form onSubmit={handleSubmit}>
                <label htmlFor="url-input">Enter Long URL:</label>
                <input
                    type="url"
                    id="url-input"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortUrl && (
                <div className="result">
                    <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
