"use client"

import Link from 'next/link';
import { Home, Users, BarChart2, Settings } from 'lucide-react';

export function MainMenu() {
  return (
    <nav className="bg-white dark:bg-gray-800 w-64 min-h-screen p-4 shadow-lg">
      <div className="flex items-center justify-center mb-8 bg-purple-600 text-white p-4 rounded-lg">
        <Home className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold">Dashboard</span>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="flex items-center p-3 text-base font-medium rounded-lg text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors">
            <Users className="w-6 h-6 text-purple-500" />
            <span className="ml-3">Clientes</span>
          </Link>
        </li>
        <li>
          <Link href="/estadisticas" className="flex items-center p-3 text-base font-medium rounded-lg text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
            <BarChart2 className="w-6 h-6 text-indigo-500" />
            <span className="ml-3">Estadísticas</span>
          </Link>
        </li>
        <li>
          <Link href="/configuracion" className="flex items-center p-3 text-base font-medium rounded-lg text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
            <Settings className="w-6 h-6 text-blue-500" />
            <span className="ml-3">Configuración</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}