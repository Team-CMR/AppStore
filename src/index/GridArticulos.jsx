import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';

// Grid
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// Form
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, useWatch } from "react-hook-form";

// 
// import SyncStorage from 'sync-storage';
// import { useForm } from "react-hook-form";

// Pagination
import usePagination from "../template/PaginationCustom";


// 
let JsonArticulos = [];
let CountProduct = 0;

export default function GridArticulos() {

    // Get articulos
    const [articulos, setArticulos] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:8004/api/articulos').then((response) => {
            setArticulos(response.data);
        });
    }, []);
    // Get articulos

    if (!articulos) return null;

    const handleChangeSelect = (event) => {
        // console.log(watch("SelectCountArticulo"))
        // setCountArticuloBuy(watch("SelectCountArticulo"));
        // setCountArticuloBuy(event.target.value);
        // let articuloToBuy = {
        //     count: event.target.value,
        //     idArticulo: event.target.name
        // }

        // setArticuloBuy(articuloToBuy)
        // console.log(articuloToBuy)
    };

    // Pagination
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const count = Math.ceil(articulos.length / PER_PAGE);
    const _DATA = usePagination(articulos, PER_PAGE);
    // Pagination


    // Set articulo to buy
    // const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        // console.log(data);
        // console.log(watch("SelectCountArticulo"))
    }
    // Set articulo to buy


    const [countArticuloBuy, setCountArticuloBuy] = React.useState('');
    const [articuloBuy, setArticuloBuy] = React.useState('');

    const changeSelect = (e) => {
        // console.log(e.target.value)
    }

    const { register, control } = useForm({
        SelectCountArticulo: "test"
    });

    function Child({ control }) {
        const SelectCountArticulo = useWatch({
            control,
            name: "SelectCountArticulo",
        });

        // console.log(SelectCountArticulo)
        CountProduct = SelectCountArticulo
        // return SelectCountArticulo;
        // return <p>Watch: {firstName}</p>;
    }

    return (
        <Grid container spacing={4}>
            {_DATA.currentData().map((articulo) => {
                return (
                    <Grid item key={articulo.cod_Barras} xs={12} sm={5} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image="src/assets/images/default.png"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {articulo.descripcion}
                                </Typography>
                                <Typography>
                                    {articulo.descripcion_Corta}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth
                                    // onSubmit={handleSubmit(onSubmit)} 
                                    // onChange={changeSelect}
                                    >
                                        <InputLabel id="select-count-articulo-label">Count</InputLabel>
                                        <Select
                                            labelId="select-count-articulo-label"
                                            id={articulo.cod_Barras}
                                            // value={SelectCountArticulo}
                                            name={articulo.cod_Barras}
                                            label="Count"
                                            // onChange={handleChangeSelect}
                                            {...register("SelectCountArticulo")}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                        </Select>
                                        <Child control={control} />
                                    </FormControl>
                                </Box>
                                <Button variant="contained" type="submit" onClick={() => {
                                    // alert('clicked');
                                    console.log(articulo)
                                    let articuloJson = {
                                        barcode: articulo.cod_Barras,
                                        cantidad: CountProduct,
                                        precio: articulo.precio_Venta
                                    }
                                    JsonArticulos.push(articuloJson)
                                    console.log(JsonArticulos)
                                }}>Agregar</Button>
                            </CardActions>
                        </Card>
                    </Grid>);
            })}

            <Pagination
                count={count}
                page={page}
                color="primary"
                onChange={handleChange}
            />
        </Grid >
    );
}
