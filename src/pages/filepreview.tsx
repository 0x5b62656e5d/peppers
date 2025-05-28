import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL;

export const FilePreview: React.FC = () => {
    const navigate = useNavigate();
    const { filename } = useParams<{ filename: string }>();
    const [previewElement, setPreviewElement] = useState<React.ReactNode>(null);
    const [downloadUrl, setDownloadUrl] = useState<string>("");

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (downloadUrl) {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename || "download";
            link.click();
        }
    };

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
                setDownloadUrl(url);

                if (contentType?.includes("image/")) {
                    setPreviewElement(<img className="file" src={url} />);
                } else if (contentType?.includes("video/")) {
                    setPreviewElement(<video className="file" src={url} controls />);
                } else if (contentType?.includes("text/")) {
                    setPreviewElement(<pre className="file">{await blob.text()}</pre>);
                } else if (contentType?.includes("audio/")) {
                    setPreviewElement(<audio className="file" src={url} controls />);
                } else if (contentType?.includes("pdf")) {
                    setPreviewElement(
                        <iframe
                            src={`/pdfjs/web/viewer.html?file=${encodeURIComponent(url)}`}
                            className="file"
                        />
                    );
                } else {
                    setPreviewElement(<h3 id="download-file-text">Download {filename}</h3>);
                }
            } catch (error) {
                console.error("Error fetching file:", error);
                navigate("/error");
            }
        })();
    }, [filename, navigate]);

    return (
        <div className="file-preview">
            <Link to="/">
                <button id="home-button">Home</button>
            </Link>
            {previewElement ? (
                <>
                    {previewElement}
                    <button id="download-file-button" onClick={handleDownload}>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                                fill="currentColor"
                            />
                            <path
                                d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </>
            ) : (
                <h3>Loading file...</h3>
            )}
        </div>
    );
};
