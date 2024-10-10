"use client"

import { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MainMenu } from '@/components/MainMenu';
import { ClientCard } from '@/components/ClientCard';
import { mockClients } from '@/lib/mockData';
import { Users, BarChart2 } from 'lucide-react';

export default function Dashboard() {
  const [clients] = useState(mockClients);

  const groupedClients = useMemo(() => {
    return clients.reduce((acc, client) => {
      const category = client.membershipType;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(client);
      return acc;
    }, {} as Record<string, typeof clients>);
  }, [clients]);

  const renderClientGroup = (category: string) => (
    <Accordion type="single" collapsible className="mb-6">
      <AccordionItem value={category}>
        <AccordionTrigger className="text-xl font-semibold text-purple-700 dark:text-purple-300">
          {category}
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupedClients[category]?.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      <MainMenu />
      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="clientes" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
            <TabsTrigger value="clientes" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Clientes Importantes
            </TabsTrigger>
            <TabsTrigger value="estadisticas" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              <BarChart2 className="w-4 h-4 mr-2" />
              Estadísticas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="clientes" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">Clientes por Tipo de Membresía</h2>
            {renderClientGroup("Flex")}
            {renderClientGroup("My Office")}
            {renderClientGroup("My Desk")}
            {renderClientGroup("Virtual")}
          </TabsContent>
          <TabsContent value="estadisticas">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">Estadísticas Generales</h3>
                <p className="text-gray-600 dark:text-gray-300">Aquí se mostrarían estadísticas generales del sistema.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}