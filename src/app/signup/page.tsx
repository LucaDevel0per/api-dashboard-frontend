'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
    
    // Validação de senhas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      setLoading(false);
      return;
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/area');
      } else {
        setError(data.message || 'Erro ao criar conta!');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
            Crie sua conta
          </h1>
          <p className="text-slate-600">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>

        {/* Card de Cadastro */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-white text-center">
            <h2 className="text-2xl font-bold">Cadastro</h2>
            <p className="text-green-100 mt-1">Junte-se a nós</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Sua senha"
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    className="w-full border border-slate-300 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botão de cadastro */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-slate-400 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar conta
                    <ArrowRightIcon size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Link para login */}
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 