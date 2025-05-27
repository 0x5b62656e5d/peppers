import { Link } from "react-router";

export const ErrorPage: React.FC = () => {
    return (
        <>
            <h3>Whoops! Something went wrong.</h3>
            <Link to="/">
                <button>Go home</button>
            </Link>
        </>
    );
};
