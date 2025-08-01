import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMinhasInscricoes, cancelInscricao } from "../services/inscricaoService";

export function MinhasInscricoesPage() {
    const queryClient = useQueryClient();

    const { data: inscricoes, isLoading, isError, error } = useQuery({
        queryKey: ['minhasInscricoes'],
        queryFn: getMinhasInscricoes
    });

    const mutation = useMutation({
        mutationFn: cancelInscricao,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['minhasInscricoes'] });
        },
        onError: (err: any) => {
            alert(err.response?.data?.message || 'Não foi possível cancelar a inscrição.');
        }
    });

    const handleCancel = (id: number) => {
        if (window.confirm('Tem certeza que deseja cancelar esta inscrição?')) {
            mutation.mutate(id);
        }
    }

    if (isLoading) {
        return <div className="text-center p-10">Carregando suas inscrições...</div>;
    }
    
    if (isError) {
        return <div className="text-center p-10 text-red-500">Ocorreu um erro ao buscar suas inscrições: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-10">Minhas Inscrições</h1>
            {inscricoes && inscricoes.length > 0 ? (
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-lg">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="p-5">Evento</th>
                                    <th className="p-5 hidden sm:table-cell">Data da Inscrição</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {inscricoes.map(inscricao => (
                                    <tr key={inscricao.id}>
                                        <td className="p-5 font-medium text-white">{inscricao.nomeEvento}</td>
                                        <td className="p-5 text-gray-300 hidden sm:table-cell">{new Date(inscricao.dataInscricao).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 text-base font-semibold rounded-full ${inscricao.status === 'Confirmada' ? 'bg-green-200 text-green-900' : 'bg-yellow-200 text-yellow-900'}`}>
                                                {inscricao.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <button onClick={() => handleCancel(inscricao.id)} disabled={mutation.isPending} className="text-red-400 hover:text-red-500 disabled:text-gray-500 font-semibold">
                                                Cancelar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-400 mt-10 bg-gray-800 p-10 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">Nenhuma inscrição encontrada</h2>
                    <p>Você ainda não se inscreveu em nenhum evento. Explore os eventos disponíveis!</p>
                </div>
            )}
        </div>
    );
}