import React, { useState } from "react";

export const Homepage: React.FC = () => {
    const [filename, setFilename] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilename(e.target.value);

        const span = document.querySelector(".filename-error");
        span!.textContent = "";
        span!.classList.remove("error");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (filename) {
            window.location.href = `/${filename}`;
        } else {
            const span = document.querySelector(".filename-error");
            span!.classList.add("error");
            span!.textContent = "Please enter a valid filename";
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
                    onChange={handleInputChange}
                />
                <span className="filename-error"></span>
                <button type="submit">Preview</button>
            </form>
        </div>
    );
};
