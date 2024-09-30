import React, { useState, useEffect, useCallback } from 'react';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [expirationDate, setExpirationDate] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [error, setError] = useState(null);

    const BACKEND_URL = `${process.env.REACT_APP_API_URL}/shorten/`;
    console.log(BACKEND_URL);

    const calculateTimeLeft = useCallback(() => {
        if (!expirationDate) return;
        const now = new Date();
        const expiry = new Date(expirationDate);
        const diff = expiry - now;

        if (diff <= 0) {
            setTimeLeft(0);
        } else {
            const minutes = Math.floor(diff / 1000 / 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft({ minutes, seconds });
        }
    }, [expirationDate]);

    // Countdown timer
    useEffect(() => {
        if (expirationDate) {
            const intervalId = setInterval(calculateTimeLeft, 1000);
            return () => clearInterval(intervalId);
        }
    }, [expirationDate, calculateTimeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ original_url: longUrl }),
            });

            if (response.ok) {
                const data = await response.json();
                setShortUrl(`${process.env.REACT_APP_API_URL}/${data.short_code}/`);
                setExpirationDate(data.expiration_date);
            } else {
                const errorData = await response.json();
                setError(errorData);
            }
        } catch (err) {
            setError("An error occurred. Please try again." + err);
        }
    };

    // Copy short URL to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Short URL copied to clipboard!');
        });
    };

    // Handle the reload when time run out
    const handleReload = () => {
        setLongUrl(''); 
        setShortUrl(''); 
        setExpirationDate(null);  
        setTimeLeft(null);  
    };

    return (
        <div className="url-shortener container mt-15">
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

            {timeLeft && timeLeft !== 0 ? (
                <div className="countdown mt-4">
                    <p> The link will expire after: {timeLeft.minutes} minutes and {timeLeft.seconds} seconds</p>
                </div>
            ) : (
                shortUrl && (
                    <div className="expired mt-4">
                        <p>The link has expired.</p>
                        <button className="btn btn-warning" onClick={handleReload}>Reload</button>
                    </div>
                )
            )}
        </div>
    );
};

export default UrlShortener;