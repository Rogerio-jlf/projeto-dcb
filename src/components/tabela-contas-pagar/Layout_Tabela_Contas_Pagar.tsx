"use client";

import { SidebarNavegacao } from "../Sidebar";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";
import { FiltrosTabelaContasPagar } from "./Filtros_Tabela_Contas_Pagar";
import { CardsTabelaContasPagar } from "./Cards_Tabela_Contas_Pagar";
import { ContasPagarProps } from "./Colunas_Tabela_Contas_Pagar";

const dadosFicticios: ContasPagarProps[] = [
  {
    status: "Pendente",
    numero_nf: 10234,
    data_emissao: "2025-07-01T00:00:00Z",
    data_vencimento: "2025-07-10T00:00:00Z",
    valor: 1200.5,
    juros: 15.75,
    multa: 10.0,
  },
  {
    status: "Pendente",
    numero_nf: 10234,
    data_emissao: "2025-07-01T00:00:00Z",
    data_vencimento: "2025-07-10T00:00:00Z",
    valor: 1200.5,
    juros: 15.75,
    multa: 10.0,
  },
  {
    status: "Pendente",
    numero_nf: 10234,
    data_emissao: "2025-07-01T00:00:00Z",
    data_vencimento: "2025-07-10T00:00:00Z",
    valor: 1200.5,
    juros: 15.75,
    multa: 10.0,
  },
  {
    status: "Pago",
    numero_nf: 10235,
    data_emissao: "2025-06-15T00:00:00Z",
    data_vencimento: "2025-06-30T00:00:00Z",
    valor: 850.0,
    juros: 0,
    multa: 0,
  },
  {
    status: "Pago",
    numero_nf: 10235,
    data_emissao: "2025-06-15T00:00:00Z",
    data_vencimento: "2025-06-30T00:00:00Z",
    valor: 850.0,
    juros: 0,
    multa: 0,
  },
  {
    status: "Pago",
    numero_nf: 10235,
    data_emissao: "2025-06-15T00:00:00Z",
    data_vencimento: "2025-06-30T00:00:00Z",
    valor: 850.0,
    juros: 0,
    multa: 0,
  },
  {
    status: "Vencido",
    numero_nf: 10236,
    data_emissao: "2025-05-01T00:00:00Z",
    data_vencimento: "2025-05-10T00:00:00Z",
    valor: 1500.25,
    juros: 50.0,
    multa: 35.5,
  },
  {
    status: "Vencido",
    numero_nf: 10236,
    data_emissao: "2025-05-01T00:00:00Z",
    data_vencimento: "2025-05-10T00:00:00Z",
    valor: 1500.25,
    juros: 50.0,
    multa: 35.5,
  },
  {
    status: "Vencido",
    numero_nf: 10236,
    data_emissao: "2025-05-01T00:00:00Z",
    data_vencimento: "2025-05-10T00:00:00Z",
    valor: 1500.25,
    juros: 50.0,
    multa: 35.5,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pendente",
    numero_nf: 10237,
    data_emissao: "2025-07-05T00:00:00Z",
    data_vencimento: "2025-07-15T00:00:00Z",
    valor: 2200.75,
    juros: 25.5,
    multa: 0,
  },
  {
    status: "Pago",
    numero_nf: 10238,
    data_emissao: "2025-06-20T00:00:00Z",
    data_vencimento: "2025-07-01T00:00:00Z",
    valor: 950.25,
    juros: 0,
    multa: 0,
  },
];

export function LayoutContasPagar() {
  const total = dadosFicticios.length;
  const pagas = dadosFicticios.filter((n) => n.status === "Pago").length;
  const pendentes = dadosFicticios.filter(
    (n) => n.status === "Pendente"
  ).length;
  const vencidas = dadosFicticios.filter((n) => n.status === "Vencido").length;

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden">
        <div className="relative">
        </div>
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="space-y-4">
              <FiltrosTabelaContasPagar />
              <CardsTabelaContasPagar
                total={total}
                pagas={pagas}
                pendentes={pendentes}
                vencidas={vencidas}
              />
              <TabelaContasPagar dados={dadosFicticios} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
