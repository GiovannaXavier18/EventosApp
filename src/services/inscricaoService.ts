import type { InscricaoPayload, MinhaInscricao, User, Evento } from '../types/api';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMinhasInscricoes = async (): Promise<MinhaInscricao[]> => {
    await delay(200);
    const user: User = JSON.parse(localStorage.getItem('user_session') || '{}');
    const inscricoes: MinhaInscricao[] = JSON.parse(localStorage.getItem('mock_inscricoes') || '[]');
    return inscricoes.filter(i => i.nomeUsuario === user.nome);
};

export const createInscricao = async (payload: InscricaoPayload): Promise<void> => {
    await delay(400);
    const user: User = JSON.parse(localStorage.getItem('user_session') || '{}');
    const eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    const inscricoes: MinhaInscricao[] = JSON.parse(localStorage.getItem('mock_inscricoes') || '[]');

    const evento = eventos.find(e => e.id === payload.eventoId);
    if (!evento) throw new Error("Evento não existe.");
    if (inscricoes.some(i => i.nomeEvento === evento.titulo && i.nomeUsuario === user.nome)) {
        throw new Error("Você já está inscrito neste evento.");
    }

    const novaInscricao: MinhaInscricao = {
        id: Date.now(),
        nomeEvento: evento.titulo,
        nomeUsuario: user.nome,
        dataInscricao: new Date().toISOString(),
        status: 'Confirmada'
    };
    inscricoes.push(novaInscricao);
    localStorage.setItem('mock_inscricoes', JSON.stringify(inscricoes));
};

export const cancelInscricao = async (id: number): Promise<void> => {
    await delay(400);
    let inscricoes: MinhaInscricao[] = JSON.parse(localStorage.getItem('mock_inscricoes') || '[]');
    inscricoes = inscricoes.filter(i => i.id !== id);
    localStorage.setItem('mock_inscricoes', JSON.stringify(inscricoes));
};