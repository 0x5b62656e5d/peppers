import React from "react";
import { Navigate, useParams } from "react-router-dom";

const BUCKET_URL = import.meta.env.VITE_BUCKET_URL;

export const Embed: React.FC = () => {
    const { filename } = useParams<{ filename: string }>();

    return <Navigate to={`${BUCKET_URL}/${filename}`} replace />;
};
