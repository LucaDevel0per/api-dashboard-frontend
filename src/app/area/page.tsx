"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, ShieldIcon, ArrowRightIcon } from "lucide-react";

export default function Area() {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdminClick = async () => {
    setLoading(true);
    setMessage(null);
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:3001/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Acesso autorizado! Redirecionando...' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Você não tem permissão de admin!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao verificar permissão!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Área do Usuário
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bem-vindo! Escolha uma das opções abaixo para acessar diferentes áreas do sistema.
          </p>
        </header>

        {/* Mensagens */}
        {message && (
          <div className={`mb-8 px-6 py-4 rounded-xl text-center font-medium max-w-md mx-auto ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Cards de opções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card - Área do Usuário */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <UserIcon size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Área do Usuário</h2>
                  <p className="text-blue-100">Acesse suas informações pessoais</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6">
                Visualize e gerencie suas informações pessoais, configurações de conta e histórico de atividades.
              </p>
              <Link 
                href="/user-area" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Acessar
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>

          {/* Card - Área do Admin */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <ShieldIcon size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Área do Admin</h2>
                  <p className="text-purple-100">Painel de administração</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-6">
                Acesse o painel de administração para gerenciar usuários, visualizar estatísticas e controlar o sistema.
              </p>
              <button
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  loading 
                    ? 'bg-slate-400 text-white cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                onClick={handleAdminClick}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Verificando...
                  </>
                ) : (
                  <>
                    Acessar
                    <ArrowRightIcon size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Sobre as Áreas
            </h3>
            <p className="text-slate-600">
              Cada área possui funcionalidades específicas. A área do usuário é para gerenciamento pessoal, 
              enquanto a área do admin é exclusiva para administradores do sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}