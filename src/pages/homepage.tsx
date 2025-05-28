import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const [filename, setFilename] = useState<string>("");
    const illegalChars = /[/\\?%*:|"<>]/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(e.target.value.trim());

        const span = document.querySelector(".filename-error");

        if (illegalChars.test(e.target.value)) {
            span!.textContent = 'Filename contains illegal characters: /\\?%*:|"<>';
            span!.classList.add("error");
            return;
        }

        span!.textContent = "";
        span!.classList.remove("error");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (illegalChars.test(filename)) {
            const span = document.querySelector(".filename-error");
            span!.textContent = "Filename contains illegal characters";
            span!.classList.add("error");
            return;
        } else if (!filename) {
            const span = document.querySelector(".filename-error");
            span!.classList.add("error");
            span!.textContent = "Please enter a valid filename";
        } else {
            navigate(`/preview/${filename}`);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="filename">Filename</label>
                <input
                    name="filename"
                    type="text"
                    placeholder="somefile.txt"
                    value={filename}
                    onChange={handleInputChange}
                />
                <span className="filename-error"></span>
                <button type="submit">Preview</button>
            </form>
        </div>
    );
};
