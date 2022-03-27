import fetcher from '../fetcher'
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Histograma"
    }
  }
};

const columns = [
  { field: 'i', headerName: 'i', width: 70 },
  { field: 'rnd', headerName: 'RND', width: 130 }
]

const InputField = ({
  name,
  onChange,
  ...rest
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  return <TextField onChange={handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} {...rest} />
}

export default function Home() {
  const [params, setParams] = useState({
    n: 0,
    modo: 'lineal',
    aditiva: 0,
    multiplicativa: 0,
    semilla: 0,
    modulo: 0
  });
  const [loading, setLoading] = useState(false);
  const [rowsCount, setRowsCount] = useState(0);
  const [data, setData] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 100,
  });
  const [chi, setChi] = useState([]);

  const calculate = async () => {
    const { size, intervals } = await fetcher(`/api/rnd?modo=${params.modo}&n=${params.n}&aditiva=${params.aditiva}&multiplicativa=${params.multiplicativa}&modulo=${params.modulo}&semilla=${params.semilla}`);
    setRowsCount(size);
    setIntervals(intervals);
    getData();
  }

  const getData = async () => {
    setLoading(true);
    const serie = await fetcher(`/api/rnd?page=${rowsState.page}&size=${rowsState.pageSize}`);
    setLoading(false);
    setData(serie);
  }

  const handleParamsChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const handleModeChange = (e) => {
    handleParamsChange('modo', e.target.value)
  }

  useEffect(() => {
    getData();
  }, [rowsState, rowsCount])

  useEffect(() => {
    const res = [];
    let acu = 0;
    intervals.forEach(interval => {
      const item = {
        interval: `${interval.from} - ${interval.to}`,
        fo: interval.items.length,
        fe: params.n / intervals.length
      }
      const c = Math.pow((item.fo - item.fe) / item.fe, 2).toFixed(4);
      item.c = Number(c);
      acu += item.c;
      item.acu = acu;
      res.push(item);
    })
    setChi(res);
  }, [intervals])


  return (
    <Grid sx={{
      padding: 5
    }} container direction="column">
      <Grid item xs>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="label-modo">Modo</InputLabel>
            <Select
              labelId="label-modo"
              id="select-modo"
              value={params.modo}
              label="Modo"
              onChange={handleModeChange}
            >
              <MenuItem value="lineal">Congruencial Lineal</MenuItem>
              <MenuItem value="multiplicativo">Congruencial Multiplicativo</MenuItem>
              <MenuItem value="nativo">Nativo</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <InputField name="n" label="n" onChange={handleParamsChange} />
        {params.modo !== "nativo" && <InputField name="semilla" label="X0" onChange={handleParamsChange} />}
        {params.modo !== "nativo" && <InputField name="multiplicativa" label="a" onChange={handleParamsChange} />}
        {params.modo === "lineal" && <InputField name="aditiva" label="c" onChange={handleParamsChange} />}
        {params.modo !== "nativo" && <InputField name="modulo" label="m" onChange={handleParamsChange} />}
        <Button onClick={calculate}>
          Calcular
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{
          height: '500px'
        }} >
          <DataGrid
            rows={data || []}
            columns={columns}
            loading={loading}
            paginationMode="server"
            rowCount={rowsCount}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 50, 100]}
            getRowId={(row) => row.i}
            {...rowsState}
            onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
            onPageSizeChange={(pageSize) =>
              setRowsState((prev) => ({ ...prev, pageSize }))
            }
          />
        </Box>
      </Grid>
      <Grid item xs>
        <Bar options={options} data={{
          labels: intervals.map(interval => `${interval.from} - ${interval.to}`),
          datasets: [
            {
              label: "fo",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              data: intervals.map(interval => interval.items.length)
            },
            {
              label: "fe",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              data: intervals.map(() => params.n / intervals.length)
            }
          ]
        }} />
      </Grid>
      <Grid item>
        <Box sx={{
          height: '500px'
        }} >
          <DataGrid
            rows={chi || []}
            columns={[{
              field: 'interval',
              headerName: "Intervalo"
            }, {
              field: 'fo',
              headerName: 'fo'
            },
            {
              field: 'fe',
              headerName: 'fe'
            },
            {
              field: 'c',
              headerName: "C"
            }, 
            {
              field: 'acu',
              headerName: 'C (AC)'
            }
          ]}
            loading={loading}
            getRowId={(row) => row.interval}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
