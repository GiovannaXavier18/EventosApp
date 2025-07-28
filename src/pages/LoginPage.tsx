import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await auth.login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 sm:mt-16 px-4">
      <form onSubmit={handleSubmit} className="p-10 bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">Acessar Plataforma</h2>
        {error && <p className="bg-red-900 border border-red-700 text-white p-4 rounded-md mb-6 text-center">{error}</p>}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2 text-lg font-medium" htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 text-lg rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" required />
        </div>
        <div className="mb-8">
          <label className="block text-gray-300 mb-2 text-lg font-medium" htmlFor="password">Senha</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 text-lg rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" required />
        </div>
        <button type="submit" disabled={auth.isLoading} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-4 rounded-md transition-colors disabled:bg-gray-500 text-xl">
          {auth.isLoading ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="text-center text-base text-gray-400 mt-8">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-cyan-400 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}