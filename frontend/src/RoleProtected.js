

import { Navigate } from "react-router-dom";
const RoleProtected = ({ isSeller, children }) => {
    if (!isSeller) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default RoleProtected;