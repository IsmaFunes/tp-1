import fetcher from '../fetcher'
import { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
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
import { API_PATH, fix } from '../utils';
import LoadingButton from '@mui/lab/LoadingButton';
import { isUndefined } from 'lodash';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const MODOS = {
  UNIFORME: 'uniforme',
  EXPONENCIAL: 'exponencial',
  NORMAL: 'normal'
}

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
  { field: 'i', headerName: 'i', width: 70 },
  { field: 'gen', headerName: 'RND', width: 70 },
  { field: 'rnd', headerName: 'Result', width: 130 }
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
    modo: MODOS.UNIFORME,
    cantIntervalos: 5,
    a: 0,
    b: 0,
    lambda: 0,
    media: 0,
    varianza: 0
  });
  const [loading, setLoading] = useState(false);
  const [rowsCount, setRowsCount] = useState(0);
  const [data, setData] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 100,
  });
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const fetch = useCallback(() => {
    const query = new URLSearchParams();
    Object.keys(params).forEach(param => {
      if (!isUndefined(params[param])) {
        query.set(param, params[param]);
      }
    })
    return fetcher(`${API_PATH}/api/var?${query.toString()}`)
  }, [params])

  const validate = () => {
    return true;
  }

  const calculate = async () => {
    setErrors([]);
    setWarnings([]);
    if (validate()) {
      setLoading(true);
      const { size, intervals } = await fetch(`${API_PATH}/api/var`);
      setRowsCount(size);
      setIntervals(intervals);
      setLoading(false)
      getData();
    }
  }

  const handleModeChange = (e) => {
    handleParamsChange('modo', e.target.value)
  }

  const addError = (error) => setErrors(prev => [...prev, error])
  const addWarning = (warn) => setWarnings(prev => [...prev, warn])

  const getData = useCallback(async () => {
    setLoading(true);
    const serie = await fetcher(`${API_PATH}/api/var?page=${rowsState.page}&size=${rowsState.pageSize}`);
    setLoading(false);
    setData(serie);
  }, [rowsState])

  const handleParamsChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }))
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
    params.media && params.modo === MODOS.EXPONENCIAL && handleParamsChange('lambda', fix(1 / params.media))
  }, [params.media])



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
                  <MenuItem value={MODOS.UNIFORME}>Uniforme</MenuItem>
                  <MenuItem value={MODOS.EXPONENCIAL}>Exponencial Negativa</MenuItem>
                  <MenuItem value={MODOS.NORMAL}>Normal</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="label-modo">Cant. Intérvalos</InputLabel>
                <Select
                  labelId="label-intervals"
                  id="select-intervals"
                  value={params.cantIntervalos}
                  label="Intervalos"
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
              {params.modo === MODOS.UNIFORME && <InputField params={params} name="a" label="A" onChange={handleParamsChange} />}
              {params.modo === MODOS.UNIFORME && <InputField params={params} name="b" label="B" onChange={handleParamsChange} />}
              {params.modo === MODOS.EXPONENCIAL && <InputField params={params} disabled={Boolean(params.media)} name="lambda" label="Lambda" onChange={handleParamsChange} />}
              {params.modo !== MODOS.UNIFORME && <InputField params={params} name="media" label="Media" onChange={handleParamsChange} />}
              {params.modo === MODOS.NORMAL && <InputField params={params} name="desviacion" label="Desviación" onChange={handleParamsChange} />}
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
              Tabla de valores
            </Typography>
            <Box sx={{
              height: '500px'
            }} >
              <DataGrid
                components={{
                  Toolbar: CustomToolbar,
                }}
                rows={intervals}
                columns={[{
                  field: 'number', headerName: 'i', width: 30
                }, {
                  field: 'from', headerName: 'From', width: 80
                },
                {
                  field: 'to', headerName: 'To', width: 80
                }, {
                  field: 'items', headerName: "Fo", width: 100
                }]}
                loading={loading}
                getRowId={(row) => row.number}
                disableColumnFilter
                localeText={{
                  noRowsLabel: "No hay datos",
                  columnMenuFilter: "Filtrar",
                  columnMenuHideColumn: 'Esconder',
                  columnMenuShowColumns: 'Mostrar columnas',
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
                  data: intervals.map(interval => interval.items)
                }
              ]
            }} />
        </Paper>
      </Grid>
    </Grid>
  )
}
