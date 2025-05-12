import {useParams} from "react-router-dom";
import React from "react";

export const withRouter = (Component) => (props) => {
    const params = useParams()
    return (
        <Component {...props} params={params} />
    )
}