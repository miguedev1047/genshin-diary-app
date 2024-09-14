'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResumenChartProps } from '@/app/(panel)/panel/index/charts/resumen-chart/resumen-chart.type'
import { RESUMEN_CHART_COFNIG } from '@/app/(panel)/panel/index/charts/resumen-chart/resumen-chart.config'

export function ResumenChart(props: ResumenChartProps) {
  const { data: CHART_DATA } = props

  return (
    <Card className='col-span-8 md:col-span-4 flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Resumen Global</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={RESUMEN_CHART_COFNIG}
          className='mx-auto aspect-square max-h-[300px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={CHART_DATA ?? []}
              dataKey='total'
              nameKey='label'
              stroke='0'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
