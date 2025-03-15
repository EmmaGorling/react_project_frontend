export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface AuthResponse {
    user: User
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}