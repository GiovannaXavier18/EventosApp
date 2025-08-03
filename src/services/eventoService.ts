import { type Evento, type EventoPayload, type User, CATEGORIA_EVENTO_MAP } from '../types/api';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getEventos = async (): Promise<Evento[]> => {
    await delay(300);
    const eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    return eventos.sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime());
};

export const getEventoById = async (id: number): Promise<Evento> => {
    await delay(300);
    const eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    const evento = eventos.find(e => e.id === id);
    if (evento) {
        return evento;
    }
    throw new Error("Evento não encontrado.");
};

export const createEvento = async (eventoData: EventoPayload): Promise<Evento> => {
    await delay(500);
    const eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    const user: User = JSON.parse(localStorage.getItem('user_session') || '{}');

    const novoEvento: Evento = {
        id: Date.now(),
        titulo: eventoData.titulo,
        descricao: eventoData.descricao,
        dataInicio: eventoData.dataInicio,
        dataFim: eventoData.dataFim,
        local: eventoData.local,
        categoria: CATEGORIA_EVENTO_MAP[eventoData.categoria],
        preco: eventoData.preco,
        status: 'Aberto',
        organizadorId: user.id,
        organizadorNome: user.nome
    };

    eventos.push(novoEvento);
    localStorage.setItem('mock_eventos', JSON.stringify(eventos));
    return novoEvento;
};

export const updateEvento = async (id: number, eventoData: Partial<EventoPayload>): Promise<Evento> => {
    await delay(500);
    const eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    const index = eventos.findIndex(e => e.id === id);

    if (index === -1) {
        throw new Error("Evento não encontrado para atualizar.");
    }

    const eventToUpdate = { ...eventos[index] };

    const { categoria, ...restOfData } = eventoData;
    
    Object.assign(eventToUpdate, restOfData);

    if (categoria !== undefined) {
        eventToUpdate.categoria = CATEGORIA_EVENTO_MAP[categoria];
    }

    eventos[index] = eventToUpdate;
    localStorage.setItem('mock_eventos', JSON.stringify(eventos));
    return eventToUpdate;
};

export const deleteEvento = async (id: number): Promise<void> => {
    await delay(500);
    let eventos: Evento[] = JSON.parse(localStorage.getItem('mock_eventos') || '[]');
    eventos = eventos.filter(e => e.id !== id);
    localStorage.setItem('mock_eventos', JSON.stringify(eventos));
};