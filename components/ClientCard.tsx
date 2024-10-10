"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, Star, Phone, Home } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  avatar: string;
  paymentDay: number;
  membershipType: string;
  flexSubcategory?: string;
  hoursUsed: number;
  totalHours: number;
  paymentStatus: "Pagado" | "Pendiente";
  phoneExtension?: string;
  interiorNumber?: string;
}

export function ClientCard({ client }: { client: Client }) {
  const percentageUsed = (client.hoursUsed / client.totalHours) * 100;
  
  const getMembershipColor = () => {
    if (client.membershipType === 'Flex') {
      switch (client.flexSubcategory) {
        case 'Basic': return 'text-blue-500';
        case 'Starter': return 'text-green-500';
        case 'Premium': return 'text-yellow-500';
        case 'Business': return 'text-red-500';
        default: return 'text-purple-500';
      }
    }
    switch (client.membershipType) {
      case 'My Office': return 'text-blue-500';
      case 'My Desk': return 'text-green-500';
      case 'Virtual': return 'text-yellow-500';
      default: return 'text-purple-500';
    }
  };

  const membershipColor = getMembershipColor();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">{client.name}</h3>
          </div>
          <Badge variant={client.paymentStatus === "Pagado" ? "success" : "destructive"}>
            {client.paymentStatus}
          </Badge>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>Día {client.paymentDay}</span>
            </div>
            <div className={`flex items-center font-medium ${membershipColor}`}>
              <Star className="w-4 h-4 mr-1" />
              <span>{client.membershipType}{client.flexSubcategory ? ` - ${client.flexSubcategory}` : ''}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Uso del servicio</span>
              </div>
              <span className="text-xs">
                {client.hoursUsed}/{client.totalHours}h
              </span>
            </div>
            <Progress value={percentageUsed} className="h-2" 
              style={{
                background: `linear-gradient(to right, 
                  ${percentageUsed < 50 ? '#10B981' : percentageUsed < 75 ? '#F59E0B' : '#EF4444'} ${percentageUsed}%, 
                  #E5E7EB ${percentageUsed}%)`
              }}
            />
          </div>
        </div>
        {client.phoneExtension && (
          <div className="absolute top-2 right-2 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full px-2 py-1 flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            Ext. {client.phoneExtension}
          </div>
        )}
        {client.interiorNumber && (
          <div className="absolute top-2 right-2 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full px-2 py-1 flex items-center">
            <Home className="w-3 h-3 mr-1" />
            Int. {client.interiorNumber}
          </div>
        )}
      </CardContent>
    </Card>
  );
}