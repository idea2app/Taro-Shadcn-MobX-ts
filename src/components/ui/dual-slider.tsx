import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
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
@observer
export class DualSlider extends Component<DualSliderProps> {
  static displayName = 'DualSlider';

  @observable
  accessor dragging: 0 | 1 | null = null;

  rect: Record<'left' | 'width', number> | null = null;
  id = `dual-slider-${uniqueID()}`;

  componentDidMount() {
    document?.addEventListener('mousedown', this.handleDocumentMouseDown, true);
  }

  componentWillUnmount() {
    document?.removeEventListener(
      'mousedown',
      this.handleDocumentMouseDown,
      true
    );
  }

  measure = (callback?: () => void) => {
    const query = createSelectorQuery();

    query
      .select(`#${this.id}`)
      .boundingClientRect(res => {
        const rect = Array.isArray(res) ? res[0] : res;

        if (rect) {
          this.rect = { left: rect.left, width: rect.width };
          callback?.();
        }
      })
      .exec();
  };

  percentOf = (num: number) => {
    const { min = 0, max = 100 } = this.props;

    return ((num - min) / (max - min)) * 100;
  };

  valueFromPageX = (pageX: number) => {
    const { min = 0, max = 100, step = 1 } = this.props;

    if (!this.rect) return null;

    const percentage = Math.min(
      Math.max((pageX - this.rect.left) / this.rect.width, 0),
      1
    );
    const rawValue = min + percentage * (max - min);

    return Math.min(
      Math.max(Math.round((rawValue - min) / step) * step + min, min),
      max
    );
  };

  updateValue = (index: 0 | 1, pageX: number) => {
    const { value, onValueChange } = this.props;
    const nextPoint = this.valueFromPageX(pageX);

    if (nextPoint == null) return;

    const next: [number, number] = [...value];

    next[index] =
      index === 0
        ? Math.min(nextPoint, value[1])
        : Math.max(nextPoint, value[0]);

    onValueChange?.(next);
  };

  startDrag = (index: 0 | 1, pageX: number) => {
    if (this.props.disabled) return;

    this.dragging = index;
    this.measure(() => this.updateValue(index, pageX));
  };

  moveDrag = (pageX: number) => {
    if (this.dragging === null || this.props.disabled) return;

    this.updateValue(this.dragging, pageX);
  };

  endDrag = () => (this.dragging = null);

  handleTouchStart =
    (index: 0 | 1) =>
    ({ touches, changedTouches }: TouchEvent) => {
      const touch = touches?.[0] ?? changedTouches?.[0];

      if (touch) this.startDrag(index, touch.pageX);
    };

  handleTouchMove = ({ touches, changedTouches }: TouchEvent) => {
    const touch = touches?.[0] ?? changedTouches?.[0];

    if (touch) this.moveDrag(touch.pageX);
  };

  handleMouseDown =
    (index: 0 | 1) =>
    ({ pageX }: React.MouseEvent) => {
      this.startDrag(index, pageX);

      const onMouseMove = ({ pageX }: MouseEvent) => this.moveDrag(pageX);
      const onMouseUp = ({ pageX }: MouseEvent) => {
        this.moveDrag(pageX);
        this.endDrag();
        document?.removeEventListener('mousemove', onMouseMove);
        document?.removeEventListener('mouseup', onMouseUp);
      };
      document?.addEventListener('mousemove', onMouseMove);
      document?.addEventListener('mouseup', onMouseUp);
    };

  handleDocumentMouseDown = (event: MouseEvent) => {
    const target = event.target as Element;
    const root = target.closest(`#${this.id}`);

    if (!root) return;

    const thumbs = [...root.children].slice(1);
    const index = thumbs.findIndex(
      thumb => thumb === target || thumb.contains(target)
    );

    if (index >= 0)
      this.handleMouseDown(index as 0 | 1)(
        event as unknown as React.MouseEvent
      );
  };

  render() {
    const { className, value, disabled } = this.props;
    const { dragging } = this;

    return (
      <View
        id={this.id}
        className={cn(
          'relative flex w-full touch-none select-none items-center py-4',
          className
        )}
        onTouchMove={this.handleTouchMove as unknown as CommonEventFunction}
        onTouchEnd={this.endDrag}
      >
        <div className='relative h-1 w-full grow overflow-hidden rounded-full bg-secondary'>
          <div
            className='absolute h-full bg-primary'
            style={{
              left: `${this.percentOf(value[0])}%`,
              width: `${this.percentOf(value[1]) - this.percentOf(value[0])}%`
            }}
          />
        </div>

        {value.map((point, index) => (
          <View
            key={index}
            className={cn(
              'absolute block h-4 w-4 rounded-full border-2 border-primary bg-background transition-colors',
              dragging === index && 'ring-4 ring-primary/30',
              disabled && 'opacity-50'
            )}
            style={{
              left: `${this.percentOf(point)}%`,
              transform: 'translateX(-50%)'
            }}
            onTouchStart={
              this.handleTouchStart(
                index as 0 | 1
              ) as unknown as CommonEventFunction
            }
          />
        ))}
      </View>
    );
  }
}
