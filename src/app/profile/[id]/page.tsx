'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PencilIcon, TrashIcon, ArrowLeftIcon } from "lucide-react";

export default function UserProfile() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setEditName(data.name);
        setEditEmail(data.email);
      } else {
        setMessage({ type: 'error', text: 'Usuário não encontrado!' });
      }
      setLoading(false);
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, router]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    
    if (response.ok) {
      setUser({ ...user, name: editName, email: editEmail });
      setMessage({ type: 'success', text: 'Usuário atualizado com sucesso!' });
      setIsEditing(false);
    } else {
      setMessage({ type: 'error', text: 'Erro ao atualizar usuário!' });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (response.ok) {
      setMessage({ type: 'success', text: 'Usuário deletado com sucesso! Redirecionando...' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      setMessage({ type: 'error', text: 'Erro ao deletar usuário!' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
        <div className="text-lg">Carregando perfil...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
        <div className="text-lg text-red-600">Usuário não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-white p-2 rounded-lg shadow hover:bg-slate-50 transition"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-3xl font-extrabold text-slate-800">Perfil do Usuário</h1>
        </div>

        {/* Mensagens */}
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Card do perfil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header do card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEdit}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition flex items-center gap-2"
                >
                  <PencilIcon size={16} />
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition flex items-center gap-2"
                >
                  <TrashIcon size={16} />
                  Deletar
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo do card */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(user.name);
                      setEditEmail(user.email);
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Nome</h3>
                    <p className="text-lg font-semibold text-slate-800">{user.name}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                    <p className="text-lg font-semibold text-slate-800">{user.email}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">ID do Usuário</h3>
                  <p className="text-sm font-mono text-slate-600">{user.id || user._id}</p>
                </div>
                {user.createdAt && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Data de Criação</h3>
                    <p className="text-sm text-slate-600">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 