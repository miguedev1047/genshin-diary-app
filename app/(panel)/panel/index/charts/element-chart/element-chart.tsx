'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ElementChartProps } from '@/app/(panel)/panel/index/charts/element-chart/element-chart.type'
import { ELEMENT_CHART_CONFIG } from '@/app/(panel)/panel/index/charts/element-chart/element-chart.config'

export function ElementChart(props: ElementChartProps) {
  const { data: CHART_DATA } = props

  return (
    <Card className='col-span-8 md:col-span-4 flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Elementos por personaje</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={ELEMENT_CHART_CONFIG}
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
              nameKey='element'
              stroke='0'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
