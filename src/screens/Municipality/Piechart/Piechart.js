
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useNavigate } from 'react-router-dom';

const PieChart = () => {
    const navigate = useNavigate();
    const chartData = {
        labels: ['High Risk', 'No Risk', 'Medium Risk'],
        datasets: [
            {
                data: [200, 50, 100],
                backgroundColor: [
                    "red",
                    "green",
                    "yellow"
                ],
                hoverBackgroundColor: [
                    "#bd0d0d",
                    "#12fa63",
                    "#FFB74D"
                ]
            }
        ]
    };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    return (
        <div className="card p-jc-center">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '60%', alignContent: 'center' }} />
        </div>
    )
}
export default PieChart;
