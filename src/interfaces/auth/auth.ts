
export interface AuthContextType {
  statusAuth: {
    auth_status: number;
    jwt_status: number;
  };
  redirectToLoginPage: () => void;
}
