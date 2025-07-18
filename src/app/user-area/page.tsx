'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserIcon, 
  SettingsIcon, 
  LockIcon, 
  ActivityIcon, 
  LogOutIcon, 
  EditIcon, 
  SaveIcon, 
  XIcon,
  EyeIcon,
  EyeOffIcon
} from "lucide-react";

export default function UserArea() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      // Simular dados do usuário (você pode integrar com seu backend)
      setUser({
        id: 'user123',
        name: 'João Silva',
        email: 'joao@email.com',
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date(),
        activities: [
          { id: 1, action: 'Login realizado', date: new Date('2024-01-20 10:30') },
          { id: 2, action: 'Perfil atualizado', date: new Date('2024-01-19 15:45') },
          { id: 3, action: 'Senha alterada', date: new Date('2024-01-18 09:15') }
        ]
      });
      setEditName('João Silva');
      setEditEmail('joao@email.com');
      setLoading(false);
    };

    fetchUserProfile();
  }, [router]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setMessage(null);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    // Simular salvamento (integrar com seu backend)
    setTimeout(() => {
      setUser({ ...user, name: editName, email: editEmail });
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setIsEditing(false);
      setLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem!' });
      return;
    }

    setLoading(true);
    // Simular alteração de senha (integrar com seu backend)
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Minha Área
          </h1>
          <p className="text-slate-600">
            Gerencie suas informações pessoais e configurações
          </p>
        </header>

        {/* Mensagens */}
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium max-w-md mx-auto ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card do Perfil */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <UserIcon size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <p className="text-blue-100">{user?.email}</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={handleEditProfile}
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition flex items-center gap-2"
                    >
                      <EditIcon size={16} />
                      Editar
                    </button>
                  )}
                </div>
              </div>
              
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
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                      >
                        <SaveIcon size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditName(user?.name);
                          setEditEmail(user?.email);
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                      >
                        <XIcon size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Nome</h3>
                        <p className="text-lg font-semibold text-slate-800">{user?.name}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                        <p className="text-lg font-semibold text-slate-800">{user?.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Membro desde</h3>
                        <p className="text-sm text-slate-600">
                          {user?.createdAt?.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Último login</h3>
                        <p className="text-sm text-slate-600">
                          {user?.lastLogin?.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar com Ações */}
          <div className="space-y-6">
            {/* Alterar Senha */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-6 text-white">
                <div className="flex items-center gap-3">
                  <LockIcon size={24} />
                  <h3 className="text-lg font-semibold">Segurança</h3>
                </div>
              </div>
              <div className="p-6">
                {isChangingPassword ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Senha atual</label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        >
                          {showPasswords.current ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nova senha</label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        >
                          {showPasswords.new ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirmar nova senha</label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        >
                          {showPasswords.confirm ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleChangePassword}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition flex-1"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmNewPassword("");
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg text-sm transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
                  >
                    Alterar Senha
                  </button>
                )}
              </div>
            </div>

            {/* Atividades Recentes */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-6 text-white">
                <div className="flex items-center gap-3">
                  <ActivityIcon size={24} />
                  <h3 className="text-lg font-semibold">Atividades</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {user?.activities?.slice(0, 3).map((activity: any) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.date.toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <LogOutIcon size={18} />
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 