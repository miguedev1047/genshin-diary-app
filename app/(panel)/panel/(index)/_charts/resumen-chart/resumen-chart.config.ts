import { ChartConfig } from "@/components/ui/chart";

export const RESUMEN_CHART_COFNIG = {
    total: {
      label: 'Total',
    },
    characters: {
      label: 'Personajes',
      color: 'hsl(var(--chart-1))',
    },
    artifacts: {
      label: 'Artefactos',
      color: 'hsl(var(--chart-2))',
    },
    weapons: {
      label: 'Armas',
      color: 'hsl(var(--chart-3))',
    },
    materials: {
      label: 'Materiales',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig
  