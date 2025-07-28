import type { Pagamento, PagamentoPayload, User, Evento } from '../types/api';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getMeusPagamentos = async (): Promise<Pagamento[]> => {
    await delay(200);
    const user: User = JSON.parse(localStorage.getItem('user_session') || '{}');
    const pagamentos: Pagamento[] = JSON.parse(localStorage.getItem('mock_pagamentos') || '[]');
    return pagamentos;
};

export const createPagamento = async (payload: PagamentoPayload): Promise<Pagamento> => {
    await delay(1000);
    const pagamentos: Pagamento[] = JSON.parse(localStorage.getItem('mock_pagamentos') || '[]');
    
    const novoPagamento: Pagamento = {
        id: Date.now(),
        eventoId: payload.eventoId,
        valor: payload.valor,
        metodoPagamento: payload.metodoPagamento,
        dataPagamento: new Date().toISOString(),
        status: 'Aprovado'
    };

    pagamentos.push(novoPagamento);
    localStorage.setItem('mock_pagamentos', JSON.stringify(pagamentos));
    return novoPagamento;
};