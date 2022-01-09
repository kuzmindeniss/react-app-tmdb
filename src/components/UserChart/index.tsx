import React, { useEffect, useRef } from 'react';
import styles from './UserChart.module.scss';
import { IUserChartProps } from './types';
import classNames from 'classnames';


const UserChart: React.FC<IUserChartProps> = (props: IUserChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvasWidth = props.small ? 50 : 60;
    const radius = props.small ? 23 : 28;
    const lineWidth = props.small ? 4 : 2;
    const colors = {
        green: 'rgba(88, 248, 47, .8)',
        gray: 'rgba(255, 255, 255, .2)',
        yellow: 'rgba(225,173,1, .8)',
        red: 'rgba(255,8,0, .8)'
    }
    let mainColor = colors.green;
    if (props.percent < 70 && props.percent > 30) mainColor = colors.yellow;
    if (props.percent <= 30) mainColor = colors.red;

    const getAngleBefore25 = (numb: number) => {
        const percent = numb * 4;

        const zero = -0.5 * Math.PI;
        const onePer = -0.5 * Math.PI / 100;

        return zero - (onePer * percent);
    }

    const getAngleAfter25 = (numb: number) => {
        const num = numb - 25;
        const max = Math.PI * 1.5 + Math.PI * 0.5;
        const onePer = max / 100;

        return num * onePer;
    }

    const getAngle = (numb: number) => {
        if (numb <= 25) return getAngleBefore25(numb);
        else return getAngleAfter25(numb); 
    }

    const draw = (canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = colors.gray;
        context.stroke();        

        context.beginPath();
        context.arc(centerX, centerY, radius, -0.5 * Math.PI, getAngle(props.percent), false);
        context.lineWidth = lineWidth;
        context.strokeStyle = mainColor;
        context.stroke();
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        draw(canvas);
    });

    return (
        <div className={classNames(styles.userChart, {
            [styles.userChartSmall]: props.small
        })}>
            <div className={styles.chart}>
                <div className={styles.chartOuterRing}>
                    <div className={styles.chartScore}>
                        <div className={styles.chartPercent}>
                            { props.percent }
                            <sup>%</sup>
                        </div>
                        <canvas width={canvasWidth} height={canvasWidth} className={styles.chartCanvas} ref={canvasRef}/>
                    </div>
                </div>
            </div>
            {!props.small && (<div className={styles.userChartText}>
                Пользовательский счёт
            </div>)}
        </div>
    );
}

export default UserChart;