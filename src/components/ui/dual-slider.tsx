import * as React from 'react'
import { View } from 'virtual:taro/components'
import Taro from 'virtual:taro/api'

import { cn } from '@/lib/utils'

export interface DualSliderProps {
    className?: string
    value: [number, number]
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    onValueChange?: (value: [number, number]) => void
}

/**
 * A two-thumb range slider, similar to Vant's `<Slider range />`.
 * Built on the same touch/mouse measurement approach as the Shadcn Slider,
 * since the base Slider only supports a single thumb.
 */
const DualSlider = React.forwardRef<any, DualSliderProps>(
    ({ className, value, min = 0, max = 100, step = 1, disabled, onValueChange }, ref) => {
        const [dragging, setDragging] = React.useState<0 | 1 | null>(null)
        const rectRef = React.useRef<{ left: number; width: number } | null>(null)
        const idRef = React.useRef(`dual-slider-${Math.random().toString(36).slice(2, 9)}`)

        const measure = (callback?: () => void) => {
            const query = Taro.createSelectorQuery()

            query
                .select(`#${idRef.current}`)
                .boundingClientRect(res => {
                    const rect = Array.isArray(res) ? res[0] : res

                    if (rect) {
                        rectRef.current = { left: rect.left, width: rect.width }
                        callback?.()
                    }
                })
                .exec()
        }

        const percentOf = (num: number) => ((num - min) / (max - min)) * 100

        const valueFromPageX = (pageX: number) => {
            const rect = rectRef.current

            if (!rect) return null

            const percentage = Math.min(Math.max((pageX - rect.left) / rect.width, 0), 1)
            const rawValue = min + percentage * (max - min)

            return Math.min(Math.max(Math.round((rawValue - min) / step) * step + min, min), max)
        }

        const updateValue = (index: 0 | 1, pageX: number) => {
            const nextPoint = valueFromPageX(pageX)

            if (nextPoint == null) return

            const next: [number, number] = [...value]

            next[index] = index === 0 ? Math.min(nextPoint, value[1]) : Math.max(nextPoint, value[0])

            onValueChange?.(next)
        }

        const startDrag = (index: 0 | 1, pageX: number) => {
            if (disabled) return

            setDragging(index)
            measure(() => updateValue(index, pageX))
        }

        const moveDrag = (pageX: number) => {
            if (dragging == null || disabled) return

            updateValue(dragging, pageX)
        }

        const endDrag = () => setDragging(null)

        const handleTouchStart = (index: 0 | 1) => (event: any) => {
            const touch = event.touches?.[0] ?? event.changedTouches?.[0]

            if (touch) startDrag(index, touch.pageX)
        }

        const handleTouchMove = (event: any) => {
            const touch = event.touches?.[0] ?? event.changedTouches?.[0]

            if (touch) moveDrag(touch.pageX)
        }

        const handleMouseDown = (index: 0 | 1) => (event: React.MouseEvent) => {
            startDrag(index, event.pageX)

            const onMouseMove = (moveEvent: MouseEvent) => moveDrag(moveEvent.pageX)
            const onMouseUp = (upEvent: MouseEvent) => {
                moveDrag(upEvent.pageX)
                endDrag()
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            if (typeof document !== 'undefined') {
                document.addEventListener('mousemove', onMouseMove)
                document.addEventListener('mouseup', onMouseUp)
            }
        }

        return (
            <View
                ref={ref}
                id={idRef.current}
                className={cn('relative flex w-full touch-none select-none items-center py-4', className)}
                onTouchMove={handleTouchMove}
                onTouchEnd={endDrag}
            >
                <View className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
                    <View
                        className="absolute h-full bg-primary"
                        style={{
                            left: `${percentOf(value[0])}%`,
                            width: `${percentOf(value[1]) - percentOf(value[0])}%`
                        }}
                    />
                </View>

                {value.map((point, index) => (
                    <View
                        key={index}
                        className={cn(
                            'absolute block h-4 w-4 rounded-full border-2 border-primary bg-background transition-colors',
                            dragging === index && 'ring-4 ring-primary/30',
                            disabled && 'opacity-50'
                        )}
                        style={{ left: `${percentOf(point)}%`, transform: 'translateX(-50%)' }}
                        onTouchStart={handleTouchStart(index as 0 | 1)}
                        // @ts-ignore -- mouse events are supported on H5
                        onMouseDown={handleMouseDown(index as 0 | 1)}
                    />
                ))}
            </View>
        )
    }
)
DualSlider.displayName = 'DualSlider'

export { DualSlider }
