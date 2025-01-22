import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box,
} from '@mui/material';
import mockData from '../mockData.json';

const Report = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState(mockData);

    const aggregateData = (data) => {
        const aggregation = {};

        data.forEach(item => {
            const manager = item.manager;
            if (!aggregation[manager]) {
                aggregation[manager] = {
                    totalCalls: 0,
                    missedCalls: 0,
                    incomingCalls: 0,
                    outgoingCalls: 0,
                    totalDuration: 0,
                };
            }
            aggregation[manager].totalCalls += 1;
            if (!item.success) {
                aggregation[manager].missedCalls += 1;
            }
            if (item.type === 'incoming') {
                aggregation[manager].incomingCalls += 1;
            } else {
                aggregation[manager].outgoingCalls += 1;
            }
            aggregation[manager].totalDuration += item.duration;
        });

        // Вычисление средней продолжительности
        for (const manager in aggregation) {
            aggregation[manager].averageDuration = aggregation[manager].totalDuration / aggregation[manager].totalCalls;
        }

        return aggregation;
    };

    const handleFilter = () => {
        const filtered = mockData.filter(item => {
            const itemDate = new Date(item.date);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return itemDate >= start && itemDate <= end;
        });
        setFilteredData(filtered);
    };

    const aggregatedData = aggregateData(filteredData);
    const convertToMinutes = (seconds) => (seconds / 60).toFixed(2);

    return (
        <div style={{ padding: '16px', margin: '0 auto', maxWidth: '1200px' }}>
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    type="date"
                    label="Дата с"
                    variant="outlined"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginRight: '16px' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    type="date"
                    label="Дата по"
                    variant="outlined"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginRight: '16px' }}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" color="primary" onClick={handleFilter}>
                    Применить
                </Button>
            </Box>

            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Менеджер</TableCell>
                            <TableCell>Всего звонков</TableCell>
                            <TableCell>Пропущенные звонки</TableCell>
                            <TableCell>Входящие звонки</TableCell>
                            <TableCell>Исходящие звонки</TableCell>
                            <TableCell>Общее время (мин.)</TableCell>
                            <TableCell>Средняя продолжительность (мин.)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(aggregatedData).map(([manager, data]) => (
                            <TableRow key={manager}>
                                <TableCell>{manager}</TableCell>
                                <TableCell>{data.totalCalls}</TableCell>
                                <TableCell>{data.missedCalls}</TableCell>
                                <TableCell>{data.incomingCalls}</TableCell>
                                <TableCell>{data.outgoingCalls}</TableCell>
                                <TableCell>{convertToMinutes(data.totalDuration)}</TableCell>
                                <TableCell>{convertToMinutes(data.averageDuration)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Report;
