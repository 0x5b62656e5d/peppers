import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL;

export const Embed: React.FC = () => {
    const { filename } = useParams<{ filename: string }>();
    const [element, setElement] = useState<React.ReactNode>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${BUCKET_URL}/${filename}`, {
                    method: "GET",
                    mode: "cors",
                });

                if (!res.ok) {
                    if (res.status === 404) {
                        navigate("/nonexistentfile");
                    } else {
                        navigate("/error");
                    }

                    return;
                }

                const contentType = res.headers.get("Content-Type");

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);

                if (contentType?.includes("image/")) {
                    setElement(<img className="file" src={url} />);
                } else if (contentType?.includes("video/")) {
                    setElement(<video className="file" src={url} controls />);
                } else if (contentType?.includes("text/")) {
                    setElement(<pre className="file">{await blob.text()}</pre>);
                } else if (contentType?.includes("audio/")) {
                    setElement(<audio className="file" src={url} controls />);
                } else if (contentType?.includes("pdf")) {
                    setElement(
                        <iframe
                            src={`/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`}
                            className="file"
                        />
                    );
                } else {
                    window.location.href = url;
                }
            } catch (error) {
                console.error("Error fetching file:", error);
                navigate("/error");
            }
        })();
    }, [filename, navigate]);

    return <div className="embed">{element}</div>;
};
