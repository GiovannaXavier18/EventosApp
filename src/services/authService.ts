import type { LoginPayload, RegisterPayload, User, AuthResponse } from '../types/api';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const registerRequest = async (userData: RegisterPayload): Promise<void> => {
    await delay(500);
    const users: User[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
    
    if (users.some(u => u.email === userData.email)) {
        throw new Error("Este email já está em uso.");
    }

    const newUser: User = {
        id: `user-${Date.now()}`,
        nome: userData.nome,
        email: userData.email,
        tipo: userData.tipo === 0 ? 'Organizador' : 'Participante'
    };
    users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(users));
};

export const loginRequest = async (credentials: LoginPayload): Promise<AuthResponse> => {
    await delay(500);
    const users: User[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
    
    const user = users.find(u => u.email === credentials.email);

    if (user) {
        const token = `fake-jwt-token-for-${user.id}`;
        return { token, user };
    } else {
        throw new Error("Email ou senha inválidos.");
    }
};

export const logoutRequest = async (): Promise<void> => {
    await delay(200);
    return Promise.resolve();
};

export const checkAuthStatusRequest = async (): Promise<User> => {
    await delay(100);
    const loggedInUser = localStorage.getItem('user_session');
    if (loggedInUser) {
        return JSON.parse(loggedInUser);
    }
    throw new Error("Não autenticado.");
};