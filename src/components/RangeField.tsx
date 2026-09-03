import { View, Text } from 'virtual:taro/components'
import type { FC } from 'react'

import { DualSlider } from '@/components/ui/dual-slider'

export interface RangeFieldProps {
    title: string
    unit?: string
    min?: number
    max?: number
    value: [number, number]
    onChange: (value: [number, number]) => void
}

export const RangeField: FC<RangeFieldProps> = ({ title, unit, min = 0, max = 100, value, onChange }) => (
    <View className="flex flex-col gap-2 border-b border-border px-4 py-3">
        <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium text-foreground">{title}</Text>
            <Text className="text-sm text-muted-foreground">
                {value[0]} ~ {value[1]}
                {unit}
            </Text>
        </View>

        <DualSlider min={min} max={max} value={value} onValueChange={onChange} />
    </View>
)
