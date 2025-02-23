import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const contentType = response.headers.get("Content-Type");
                if (!response.ok) {
                    throw new Error("Network problem");
                }
                if (contentType && contentType.includes("application/json")) {
                    const result = await response.json();
                    setData(result);
                } else if (contentType && contentType.includes("text/html")) {
                    const result = await response.text();
                    setData(result);
                } else {
                    throw new Error("Unsupported content type");
                }
            } catch (error) {
                setError(error);
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
