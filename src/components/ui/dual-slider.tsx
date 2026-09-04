import { forwardRef, useEffect, useRef, useState } from 'react';
import { createSelectorQuery } from 'virtual:taro/api';
import { View, type CommonEventFunction } from 'virtual:taro/components';
import { uniqueID } from 'web-utility';

import { cn } from '@/lib/utils';

export interface DualSliderProps {
  className?: string;
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: [number, number]) => void;
}

/**
 * A two-thumb range slider, similar to Vant's `<Slider range />`.
 * Built on the same touch/mouse measurement approach as the Shadcn Slider,
 * since the base Slider only supports a single thumb.
 */
export const DualSlider = forwardRef<any, DualSliderProps>(
  (
    { className, value, min = 0, max = 100, step = 1, disabled, onValueChange },
    ref
  ) => {
    const [dragging, setDragging] = useState<0 | 1 | null>(null);
    const draggingRef = useRef<0 | 1 | null>(null);
    const rectRef = useRef<Record<'left' | 'width', number> | null>(null);
    const idRef = useRef(`dual-slider-${uniqueID()}`);

    const measure = (callback?: () => void) => {
      const query = createSelectorQuery();

      query
        .select(`#${idRef.current}`)
        .boundingClientRect(res => {
          const rect = Array.isArray(res) ? res[0] : res;

          if (rect) {
            rectRef.current = { left: rect.left, width: rect.width };
            callback?.();
          }
        })
        .exec();
    };

    const percentOf = (num: number) => ((num - min) / (max - min)) * 100;

    const valueFromPageX = (pageX: number) => {
      const rect = rectRef.current;

      if (!rect) return null;

      const percentage = Math.min(
        Math.max((pageX - rect.left) / rect.width, 0),
        1
      );
      const rawValue = min + percentage * (max - min);

      return Math.min(
        Math.max(Math.round((rawValue - min) / step) * step + min, min),
        max
      );
    };

    const updateValue = (index: 0 | 1, pageX: number) => {
      const nextPoint = valueFromPageX(pageX);

      if (nextPoint == null) return;

      const next: [number, number] = [...value];

      next[index] =
        index === 0
          ? Math.min(nextPoint, value[1])
          : Math.max(nextPoint, value[0]);

      onValueChange?.(next);
    };

    const startDrag = (index: 0 | 1, pageX: number) => {
      if (disabled) return;

      draggingRef.current = index;
      setDragging(index);
      measure(() => updateValue(index, pageX));
    };

    const moveDrag = (pageX: number) => {
      const index = draggingRef.current;

      if (index == null || disabled) return;

      updateValue(index, pageX);
    };

    const endDrag = () => setDragging((draggingRef.current = null));

    const handleTouchStart =
      (index: 0 | 1) =>
      ({ touches, changedTouches }: TouchEvent) => {
        const touch = touches?.[0] ?? changedTouches?.[0];

        if (touch) startDrag(index, touch.pageX);
      };

    const handleTouchMove = ({ touches, changedTouches }: TouchEvent) => {
      const touch = touches?.[0] ?? changedTouches?.[0];

      if (touch) moveDrag(touch.pageX);
    };

    const handleMouseDown =
      (index: 0 | 1) =>
      ({ pageX }: React.MouseEvent) => {
        startDrag(index, pageX);

        const onMouseMove = ({ pageX }: MouseEvent) => moveDrag(pageX);
        const onMouseUp = ({ pageX }: MouseEvent) => {
          moveDrag(pageX);
          endDrag();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        if (typeof document !== 'undefined') {
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }
      };

    useEffect(() => {
      if (typeof document === 'undefined') return;

      const listener = (event: MouseEvent) => {
        const target = event.target as Element;
        const root = target.closest(`#${idRef.current}`);

        if (!root) return;

        const thumbs = Array.from(root.children).slice(1);
        const index = thumbs.findIndex(
          thumb => thumb === target || thumb.contains(target)
        );
        if (index >= 0)
          handleMouseDown(index as 0 | 1)(event as unknown as React.MouseEvent);
      };

      document.addEventListener('mousedown', listener, true);

      return () => document.removeEventListener('mousedown', listener, true);
    });

    return (
      <View
        ref={ref}
        id={idRef.current}
        className={cn(
          'relative flex w-full touch-none select-none items-center py-4',
          className
        )}
        onTouchMove={handleTouchMove as unknown as CommonEventFunction}
        onTouchEnd={endDrag}
      >
        <View className='relative h-1 w-full grow overflow-hidden rounded-full bg-secondary'>
          <View
            className='absolute h-full bg-primary'
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
            style={{
              left: `${percentOf(point)}%`,
              transform: 'translateX(-50%)'
            }}
            onTouchStart={
              handleTouchStart(index as 0 | 1) as unknown as CommonEventFunction
            }
          />
        ))}
      </View>
    );
  }
);
DualSlider.displayName = 'DualSlider';
