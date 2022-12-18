
export interface AuthContextType {
  statusAuth: {
    jwt: string;
    auth_status: number;
    jwt_status: number;
  };
  redirectToLoginPage: () => void;
}
