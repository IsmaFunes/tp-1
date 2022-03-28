import fetcher from '../fetcher'
import { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
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
import Alert from '@mui/material/Alert';
import { coprime, isPrime } from '../utils';
import LoadingButton from '@mui/lab/LoadingButton';

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
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: "Intervalo",
        color: "black",
        font: {
          size: 18
        }
      }
    },
    y: {
      // stacked: true,
      title: {
        display: true,
        text: "Frecuencia",
        color: "black",
        font: {
          size: 18
        }
      }
    }
  },
};

const columns = [
  { field: 'i', headerName: 'i', width: 70, sortable: false },
  { field: 'axic', headerName: 'a.Xi+c', width: 100, sortable: false },
  { field: 'next', headerName: 'Xi+1', width: 100, sortable: false },
  { field: 'rnd', headerName: 'RND', width: 130, sortable: false }
]

const InputField = ({
  name,
  onChange,
  params = {},
  ...rest
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }
  return <TextField sx={{
    mr: 3,
    mb: 3
  }} value={params[name]} type="number"
    onChange={handleChange} {...rest} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
}



export default function Home() {
  const [params, setParams] = useState({
    n: '',
    modo: 'lineal',
    aditiva: '',
    multiplicativa: '',
    semilla: '',
    modulo: '',
    cantIntervalos: 5,
    k: '',
    g: ''
  });
  const [round, setRound] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rowsCount, setRowsCount] = useState(0);
  const [data, setData] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 100,
  });
  const [chi, setChi] = useState([]);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [useAlternativeMultiplicativa, setUseAlternative] = useState(false);

  useEffect(() => {
    if (params.k) {
      let value;
      if (params.modo === "multiplicativo") {
        value = params.k * 8 + (useAlternativeMultiplicativa ? 5 : 3)
      } else {
        value = (params.k * 4) + 1;
      }
      handleParamsChange('multiplicativa', value)
    }
  }, [params.k, params.modo, useAlternativeMultiplicativa])

  useEffect(() => {
    params.g && handleParamsChange('modulo', Math.pow(2, params.g))
  }, [params.g])

  const validate = () => {
    if (!params.n
      || (params.modo !== "nativo" && (!params.modulo || !params.multiplicativa || !params.semilla))
      || (params.modo === "lineal" && !params.aditiva)) {
      addError("Ingrese todos los parámetros requeridos")
      return false;
    }
    if (params.n > 1000000) {
      addError("El número de muestra no puede ser superior a 1000000");
      return false;
    }
    if (params.modo === "lineal" && !coprime(Number(params.aditiva), Number(params.modulo))) {
      addWarning("El parámetro C tiene que ser relativamente primo con el módulo")
    }

    if (params.modo === "multiplicativo") {

      if (params.semilla % 2 === 0) {
        addError("La semilla (x0) tiene que ser un número impar para el congruencial multiplicativo")
        return false;
      }

      if (!isPrime(params.semilla)) {
        addWarning("Para tener un mejor resultado, defina la semilla (x0) como un número primo")
      }

    }

    return true;
  }

  const calculate = async () => {
    setErrors([]);
    setWarnings([]);
    if (validate()) {
      setLoading(true);
      const { size, intervals } = await fetcher(`/api/rnd?modo=${params.modo}&n=${params.n}&aditiva=${params.aditiva}&multiplicativa=${params.multiplicativa}&modulo=${params.modulo}&semilla=${params.semilla}&intervalos=${params.cantIntervalos}&round=${round}`);
      setRowsCount(size);
      setIntervals(intervals);
      setLoading(false)
      getData();
    }
  }

  const addError = (error) => setErrors(prev => [...prev, error])
  const addWarning = (warn) => setWarnings(prev => [...prev, warn])

  const getData = useCallback(async () => {
    setLoading(true);
    const serie = await fetcher(`/api/rnd?page=${rowsState.page}&size=${rowsState.pageSize}`);
    setLoading(false);
    setData(serie);
  }, [rowsState])

  const handleParamsChange = (key, value) => {
    let val = Number(value);
    if (key !== "modo" && (isNaN(val) || val < 0)) {
      return;
    }
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const handleModeChange = (e) => {
    handleParamsChange('modo', e.target.value)
  }

  const handleCantIntervalosChange = (e) => {
    handleParamsChange('cantIntervalos', e.target.value)
  }

  useEffect(() => {
    if (rowsCount) {
      getData();
    }
  }, [rowsState, rowsCount, getData])

  useEffect(() => {
    if (!intervals.length) {
      return;
    }
    if (params.n < 30) {
      addWarning("Para calcular chi cuadrado, la muestra debe ser mayor a 30")
      return;
    }
    const res = [];
    let acu = 0;
    intervals.forEach((interval, i) => {
      const item = {
        interval: `${interval.from} - ${interval.to}`,
        fo: interval.items.length,
        fe: params.n / intervals.length,
        i
      }
      const c = Math.pow((item.fo - item.fe) / item.fe, 2).toFixed(4);
      item.c = Number(c);
      acu += item.c;
      item.acu = Number(acu.toFixed(4));
      res.push(item);
    })
    setChi(res);
  }, [intervals, params.n])


  return (
    <Grid sx={{
      padding: 5
    }} container spacing={2} direction="column">
      <Grid item xs>
        <Paper elevation={2}>
          {Boolean(errors.length) && <Alert severity="error">
            {errors.map(error => (
              <Typography key={error}>
                {error}
              </Typography>
            ))}
          </Alert>}
          {Boolean(warnings.length) && <Alert severity="warning">
            {warnings.map(warn => (
              <Typography key={warn}>
                {warn}
              </Typography>
            ))}
          </Alert>}
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper elevation={1} sx={{
          padding: 2
        }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl>
                <InputLabel id="label-modo">Modo</InputLabel>
                <Select
                  labelId="label-modo"
                  id="select-modo"
                  value={params.modo}
                  label="Modo"
                  onChange={handleModeChange}
                  sx={{
                    minWidth: 250,
                    mr: 5
                  }}
                >
                  <MenuItem value="lineal">Congruencial Lineal</MenuItem>
                  <MenuItem value="multiplicativo">Congruencial Multiplicativo</MenuItem>
                  <MenuItem value="nativo">Nativo</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="label-modo">Cant. Intérvalos</InputLabel>
                <Select
                  labelId="label-intervals"
                  id="select-intervals"
                  value={params.cantIntervalos}
                  label="Ittervalos"
                  onChange={handleCantIntervalosChange}
                  sx={{
                    minWidth: 200
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <InputField name="n" label="n" params={params} onChange={handleParamsChange} />
              {params.modo !== "nativo" && <InputField params={params} name="semilla" label="X0" onChange={handleParamsChange} />}
              {params.modo !== "nativo" && <InputField params={params} name="k" label="k" onChange={handleParamsChange} />}
              {params.modo !== "nativo" && <InputField params={params} disabled={Boolean(params.k)} name="multiplicativa" label="a" onChange={handleParamsChange} />}
              {params.modo !== "nativo" && <InputField params={params} name="g" label="g" onChange={handleParamsChange} />}
              {params.modo !== "nativo" && <InputField params={params} disabled={Boolean(params.g)} name="modulo" label="m" onChange={handleParamsChange} />}
              {params.modo === "lineal" && <InputField params={params} name="aditiva" label="c" onChange={handleParamsChange} />}
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={round} onChange={(e) => setRound(e.target.checked)} />} label="Redondear decimales" />
              </FormGroup>
              {params.modo === "multiplicativo" && <FormGroup>
                <FormControlLabel control={<Checkbox checked={useAlternativeMultiplicativa} onChange={(e) => setUseAlternative(e.target.checked)} />} label="Usar 5 + 8k (por defecto usa 3 + 8k)" />
              </FormGroup>}
            </Grid>
          </Grid>

          <LoadingButton loading={loading} variant="contained" sx={{
            mt: 1
          }} onClick={calculate}>
            Calcular
          </LoadingButton>
        </Paper>
      </Grid>
      <Grid item xs={5} marginTop={2}>
        <Grid container spacing={1} direction="row">
          <Grid item xs sx={{
            textAlign: 'center'
          }}>
            <Typography variant="h5">
              Tabla de valores
            </Typography>
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
                disableColumnFilter
                localeText={{
                  noRowsLabel: "No hay datos",
                  columnMenuFilter: "Filtrar",
                  columnMenuHideColumn: 'Esconder',
                  columnMenuShowColumns: 'Mostrar columnas',
                }}
                componentsProps={{
                  pagination: {
                    labelRowsPerPage: "Filas por página",
                    labelDisplayedRows: ({ from, to, count, page }) => {
                      return `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`;
                    }
                  }
                }}
                {...rowsState}
                onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
                
                onPageSizeChange={(pageSize) =>
                  setRowsState((prev) => ({ ...prev, pageSize }))
                }
              />
            </Box>
          </Grid>
          <Grid item xs sx={{
            textAlign: 'center'
          }}>
            <Typography variant="h5">
              Ji-Cuadrada
            </Typography>
            <Box sx={{
              height: '500px'
            }} >
              <DataGrid
                rows={chi || []}
                loading={loading}
                hideFooterPagination
              
                columns={[{
                  field: 'interval',
                  headerName: "Intervalo",
                  width: 100
                }, {
                  field: 'fo',
                  headerName: 'fo',
                  width: 100
                },
                {
                  field: 'fe',
                  headerName: 'fe',
                  width: 100

                },
                {
                  field: 'c',
                  headerName: "C",
                  width: 100

                },
                {
                  field: 'acu',
                  headerName: 'C (AC)',
                  width: 100

                }
                ]}
                sx={{
                  '& .chi-result': {
                    backgroundColor: 'lightgreen',
                    fontWeight: 'bold'
                  }
                }}
                getRowId={(row) => row.interval}
                getCellClassName={(cell) => {
                  if (cell.field === "acu" && cell.row.i === chi.length - 1) {
                    return 'chi-result';
                  }
                  return '';
                }}
              />
            </Box>

          </Grid>

        </Grid>
      </Grid>
      <Grid item xs>
        <Paper elevation={1}>
          <Bar options={options}
            data={{
              labels: intervals.map(interval => `${interval.from} - ${interval.to}`),
              datasets: [
                {
                  barPercentage: 1,
                  categoryPercentage: 1,
                  label: "fo",
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                  data: intervals.map(interval => interval.items.length)
                },
                {
                  barPercentage: 1,
                  categoryPercentage: 1,
                  label: "fe",
                  backgroundColor: "rgba(53, 162, 235, 0.3)",
                  data: intervals.map(() => params.n / intervals.length)
                }
              ]
            }} />
        </Paper>
      </Grid>
    </Grid>
  )
}
