'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || data);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    fetchUsers();
  }, [router]);

  const handleSearch = async () => {
    setMessage(null);
    const user = users.find(
      (u) => u.name && u.name.toLowerCase() === searchName.trim().toLowerCase()
    );
    if (!user) {
      setMessage({ type: 'error', text: 'Usuário não encontrado!' });
      return;
    }
    const userId = user.id || user._id;
    if (!userId) {
      setMessage({ type: 'error', text: 'ID do usuário não encontrado!' });
      return;
    }
    // Redireciona para a página de perfil do usuário
    router.push(`/profile/${userId}`);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setEditName(user.name);
    setMessage(null);
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users/${editUser.id || editUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editName }),
    });
    if (response.ok) {
      setUsers(users.map((u) =>
        (u.id || u._id) === (editUser.id || editUser._id) ? { ...u, name: editName } : u
      ));
      setMessage({ type: 'success', text: 'Usuário editado com sucesso!' });
      setEditUser(null);
    } else {
      setMessage({ type: 'error', text: 'Erro ao editar usuário' });
    }
  };

  const handleDelete = async (user: any) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;
    const token = localStorage.getItem('token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users/${user.id || user._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      setUsers(users.filter((u) => (u.id || u._id) !== (user.id || user._id)));
      setMessage({ type: 'success', text: 'Usuário deletado com sucesso!' });
    } else {
      setMessage({ type: 'error', text: 'Erro ao deletar usuário' });
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-lg">Carregando usuários...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-0 md:p-8">
      <div className="max-w-4xl mx-auto py-8">
        {/* Cabeçalho */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dashboard Admin</h1>
          {/* <h2 className="text-xl font-bold text-slate-800 tracking-tight">Admin {users.name}</h2> */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <div className="bg-white rounded-lg shadow px-6 py-3 flex flex-col items-center">
              <span className="text-xs text-slate-500">Total de usuários</span>
              <span className="text-xl font-bold text-blue-600">{users.length}</span>
            </div>
          </div>
        </header>

        {/* Mensagens do sistema */}
        {message && (
          <div className={`mb-4 px-4 py-2 rounded text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            {message.text}
          </div>
        )}

        {/* Busca de usuário */}
        <div className="mb-6 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar usuário pelo nome"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
          >
            Buscar
          </button>
        </div>

        {/* Tabela de usuários */}
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => {
                const userId = user.id || user._id;
                return (
                  <tr key={userId || user.email} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                      {/* Visualizar */}
                      <button
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded transition flex items-center"
                        title="Visualizar"
                        onClick={() => {
                          if (!userId) {
                            setMessage({ type: 'error', text: 'ID do usuário não encontrado!' });
                            return;
                          }
                          // Redireciona para a página de perfil do usuário
                          router.push(`/profile/${userId}`);
                        }}
                      >
                        <EyeIcon size={18} />
                      </button>
                      {/* Editar */}
                      <button
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-2 rounded transition flex items-center"
                        title="Editar"
                        onClick={() => handleEdit(user)}
                      >
                        <PencilIcon size={18} />
                      </button>
                      {/* Deletar */}
                      <button
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded transition flex items-center"
                        title="Deletar"
                        onClick={() => handleDelete(user)}
                      >
                        <TrashIcon size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal de edição */}
        {editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="border border-slate-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded"
                  onClick={() => setEditUser(null)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
                  onClick={handleEditSave}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}