import type { User, Evento } from "../types/api";

const initialUsers: User[] = [
    { id: 'user-1', nome: 'Organizador Teste', email: 'org@teste.com', tipo: 'Organizador' },
    { id: 'user-2', nome: 'Participante Teste', email: 'part@teste.com', tipo: 'Participante' }
];

const initialEventos: Evento[] = [
    {
        id: 1,
        titulo: "FIT",
        descricao: "Forum de Inovação e Tecnologia.",
        dataInicio: new Date('2025-10-20T09:00:00').toISOString(),
        dataFim: new Date('2025-10-22T18:00:00').toISOString(),
        local: "UFC",
        categoria: "Show",
        status: "Aberto",
        organizadorNome: "Organizador Teste",
        organizadorId: "user-1",
        preco: 150.00
    },
    {
        id: 2,
        titulo: "Matue",
        descricao: "Matue ao vivo em crateus",
        dataInicio: new Date('2025-08-15T20:00:00').toISOString(),
        dataFim: new Date('2025-08-15T23:00:00').toISOString(),
        local: "Praça dos Pirulitos",
        categoria: "Show",
        status: "Aberto",
        organizadorNome: "Organizador Teste",
        organizadorId: "user-1",
        preco: 75.50
    },
    {
        id: 3,
        titulo: "Filipe Ret",
        descricao: "Ret ao vivo em Ipu",
        dataInicio: new Date('2025-09-05T19:00:00').toISOString(),
        dataFim: new Date('2025-09-05T22:00:00').toISOString(),
        local: "Rodoviaria",
        categoria: "Show",
        status: "Aberto",
        organizadorNome: "Organizador Teste",
        organizadorId: "user-1",
        preco: 0
    }
];

export const initializeMockData = () => {
    if (!localStorage.getItem('mock_users')) {
        localStorage.setItem('mock_users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('mock_eventos')) {
        localStorage.setItem('mock_eventos', JSON.stringify(initialEventos));
    }
    if (!localStorage.getItem('mock_inscricoes')) {
        localStorage.setItem('mock_inscricoes', JSON.stringify([]));
    }
    if (!localStorage.getItem('mock_pagamentos')) {
        localStorage.setItem('mock_pagamentos', JSON.stringify([]));
    }
};