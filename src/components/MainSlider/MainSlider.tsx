import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import styles from './MainSlider.module.scss';
import { IMainSliderProps, ISliderItem } from './MainSlider.types';
import SliderItem from './MainSliderItem';
import cx from 'classnames';
import { throttle } from 'lodash';

const MainSlider: React.FC<IMainSliderProps> = (props: IMainSliderProps) => {
    const [sliderWidth, setSliderWidth] = useState<string>('');
    const sliderContainerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const sliderInterval: MutableRefObject<NodeJS.Timer | null> = useRef(null);
    const clickStartedPx: MutableRefObject<number | null> = useRef(null);
    const touchStartedPx: MutableRefObject<number | null> = useRef(null);
    const currentSlideIdx = useRef<number>(0);
    const [leftIndent, setLeftIndent] = useState<string>('');

    const ratio = props.sizes.height / props.sizes.width;

    const recalculateMainSliderWidth = (): void => {
        if (!sliderContainerRef.current) return;
        const style = getComputedStyle(sliderContainerRef.current);
        const width = style.getPropertyValue("width");
        const widthNumber = parseInt(width);
        setSliderWidth(width)
    }

    const throttledRecalculateMainSliderWidth = useMemo(() => {
        return throttle(recalculateMainSliderWidth, 300);
    }, []);

    const getSliderHeight = (): string => {
        const widthNumber = parseInt(sliderWidth);
        return widthNumber * ratio + 'px';
    }

    const sliderContainerRefChanged = (node: HTMLDivElement | null): void => {
        sliderContainerRef.current = node;
        if (node === null) {
            window.removeEventListener('resize', throttledRecalculateMainSliderWidth);
            return;
        };
        recalculateMainSliderWidth();
        window.addEventListener('resize', throttledRecalculateMainSliderWidth);
    }

    const getItems = (data: ISliderItem[]): JSX.Element[] => {
        const items = data.map((item: ISliderItem, index: number) => {
            return <SliderItem item={item} width={sliderWidth} key={index}/>
        });
        return items;
    }

    const getIndicators = (data: ISliderItem[]): JSX.Element[] => {
        const items = data.map((item: ISliderItem, index: number) => {
            return (
                <li key={index} 
                    className={cx(styles.indicator, {
                        [styles.indicatorActive]: currentSlideIdx.current === index ? true : false
                    })}
                    onClick={() => {
                        currentSlideIdx.current = index;
                        recalculateLeftIndent();
                        resetInterval();
                    }}
                ></li>
            )
        });

        return items;
    }

    const recalculateLeftIndent = (): void => {
        setLeftIndent(currentSlideIdx.current * -100 + '%')
    };

    const setNextSlider = (): void => {
        let newSlideIdx = currentSlideIdx.current + 1;
        if (newSlideIdx >= props.items.length) newSlideIdx = 0;
        currentSlideIdx.current = newSlideIdx;
        recalculateLeftIndent();
    };

    const setPrevSlider = (): void => {
        let newSlideIdx = currentSlideIdx.current - 1;
        if (newSlideIdx < 0) newSlideIdx = props.items.length - 1;
        currentSlideIdx.current = newSlideIdx;
        recalculateLeftIndent();
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
        clickStartedPx.current = e.clientX;
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
        if (clickStartedPx.current === null) return;
        const newTouchPx = e.clientX;
        if (newTouchPx - clickStartedPx.current! > 100) {
            clickStartedPx.current = null;
            setPrevSlider();
            resetInterval();
        }
        if (clickStartedPx.current! - newTouchPx  > 100) {
            clickStartedPx.current = null;
            setNextSlider();
            resetInterval();
        }
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
        touchStartedPx.current = e.touches[0].clientX;
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
        if (touchStartedPx.current === null) return;
        const newTouchPx = e.touches[0].clientX;
        if (newTouchPx - touchStartedPx.current! > 50) {
            touchStartedPx.current = null;
            setPrevSlider();
            resetInterval();
        }
        if (touchStartedPx.current! - newTouchPx  > 50) {
            touchStartedPx.current = null;
            setNextSlider();
            resetInterval();
        }
    }

    const setSliderInterval = () => {
        sliderInterval.current = setInterval(setNextSlider, props.intervalMs || 1000);
    }

    const resetInterval = () => {
        if (sliderInterval.current === null) return;
        clearInterval(sliderInterval.current);
        sliderInterval.current = null;
        sliderInterval.current = setInterval(setNextSlider, props.intervalMs || 1000);
    }

    useEffect(() => {
        setSliderInterval();

        return () => {
            clearInterval(sliderInterval.current!);
            sliderInterval.current = null;
        }
    }, [])

    return (
        <div className={styles.container} ref={sliderContainerRefChanged} style={{height: getSliderHeight()}}>
            <ul className={styles.imgsContainer}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}

                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{
                    left: leftIndent
                }}
            >
                { getItems(props.items) }
            </ul>
            <ul className={styles.indicatorsContainer}>
                { getIndicators(props.items) }
            </ul>
        </div>
    )
}

export default MainSlider;