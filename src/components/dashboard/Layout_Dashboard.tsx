"use client";

import React, { useEffect, useState } from "react";
import { CardsMetricas } from "@/components/dashboard/Cards_Metricas_Dashboard";
import { ComprasPorProdutoChart } from "@/components/dashboard/Compras_Por_Produto_Chart";
import { ContasPagarMesChart } from "@/components/dashboard/Contas_A_Pagar_Mes_Chart";
import { ContasPagarAnoChart } from "@/components/dashboard/Contas_A_Pagar_Ano_Chart";

// import { TrendingUp, Package, Calendar } from "lucide-react";
import { SidebarNavegacao } from "../../components/sidebar/Sidebar";
import { FiltrosDashboard } from "./Filtros_Dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { useAuth } from "@/contexts/auth-context";
import axios from "axios";
import { ContasAPagarType } from "@/types/financeiro";


const comprasPorProduto = [
  { produto: "Luvas Nitrílicas", valor: 25400 },
  { produto: "Seringas 10ml", valor: 18200 },
  { produto: "Máscaras N95", valor: 22100 },
  { produto: "Cateteres", valor: 15800 },
  { produto: "Gazes Estéreis", valor: 12300 },
];



const contasAnuais = [
  { mes: "Jan", pagas: 12400, aberto: 8200 },
  { mes: "Fev", pagas: 15200, aberto: 6800 },
  { mes: "Mar", pagas: 18600, aberto: 9400 },
  { mes: "Abr", pagas: 16800, aberto: 7200 },
  { mes: "Mai", pagas: 21200, aberto: 11800 },
  { mes: "Jun", pagas: 19400, aberto: 8600 },
  { mes: "Jul", pagas: 22800, aberto: 12400 },
  { mes: "Ago", pagas: 20600, aberto: 9800 },
  { mes: "Set", pagas: 24200, aberto: 13600 },
  { mes: "Out", pagas: 23800, aberto: 10200 },
  { mes: "Nov", pagas: 26400, aberto: 15400 },
  { mes: "Dez", pagas: 25600, aberto: 11800 },
];

export function HospitalDashboardLayout() {


  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    dataInicio,
    dataFim,
    notaFiscal,
    status,
  } = useFiltrosFinanceiro();
  
  const {
    data: contasAPagar,
    isError,
    isLoading,
    isFetching

  } = useQuery({
    queryKey: ['contasAPagar'],
    queryFn: async () => {
      const { data } = await axios.post('/api/accounts-payable', {
        CLIENTE: user?.cod,
        LOJA: user?.loja,
        DATAINI: dataInicio.toISOString().split('T')[0].replace(/-/g, ''),
        DATAFIM: dataFim.toISOString().split('T')[0].replace(/-/g, ''),
        NOTAFISCAL: notaFiscal
      });
      return data.dados ?? [] as ContasAPagarType[];
    },
    refetchOnWindowFocus: false,
  })

  const [cardData, setCardData] = useState({
    totalCompras: 0,
    comprasPagas: 0,
    comprasAberto:0,
  })

  const [contasAPagarTot, setContasAPagarTot] = useState([
  { name: "Pagas", value: 67.4, count: 89 },
  { name: "Em aberto", value: 32.6, count: 43 },
  ])

  useEffect(() => {

    if (contasAPagar?.length) {

      const totalComprasReducer = contasAPagar?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0);

      setCardData({
        totalCompras: totalComprasReducer,
        //comprasPagas: contasAPagar?.filter((item: ContasAPagarType) => item.STATUS === "3")?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0),
        comprasPagas: 25,
        //comprasAberto:contasAPagar?.filter((item: ContasAPagarType) => item.STATUS === "1")?.reduce((acc: number, item: ContasAPagarType) => acc + item.E1_VALOR, 0)
        comprasAberto:15
      })
    
      setContasAPagarTot([
        { name: "Pagas", value: 67.4, count: 89 },
        { name: "Em aberto", value: 32.6, count: 43 },
      ])
    
    
    }


  }, contasAPagar)

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-6">
              <FiltrosDashboard />
              <CardsMetricas cardData={cardData} />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <ComprasPorProdutoChart data={comprasPorProduto} />

                <ContasPagarMesChart data={contasAPagarTot} />

                <ContasPagarAnoChart data={contasAnuais} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
