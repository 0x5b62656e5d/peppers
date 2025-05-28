import { useLocation } from "react-router";
import { Link } from "react-router";

export const NonexistentFile: React.FC = () => {
    const location = useLocation();
    const filename = (location.state as { filename: string })?.filename;

    return (
        <div className="container">
            <h1 className="womp-womp">Womp womp!</h1>
            <div className="p-nonexistent-msg">
                <p className="error-msg">
                    {filename ? (
                        <span id="error-filename">{filename} </span>
                    ) : (
                        "The file you are looking for "
                    )}
                    does not exist!
                </p>
                <p className="error-msg">Please make sure the filename is entered correctly.</p>
            </div>
            <Link to="/">
                <button>Go home</button>
            </Link>
        </div>
    );
};
