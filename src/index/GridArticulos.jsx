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
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

// Form
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, useWatch } from "react-hook-form";
import TextField from '@mui/material/TextField';


// SweetAlert2
import Swal from 'sweetalert2';


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
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 0,
                    pb: 1,
                }}
            >


                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: 0 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant="contained" onClick={() => {
                            const modalTimer = Swal.fire({
                                title: 'Registering sale ',
                                html: '',
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                    const b = Swal.getHtmlContainer().querySelector('b')
                                },
                            })

                            var data = JSON.stringify(JsonArticulos);

                            var config = {
                                method: 'post',
                                url: 'http://localhost:8004/api/venta-aprobado',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data
                            };

                            axios(config)
                                .then(function (response) {
                                    console.log(response)
                                    setTimeout(() => {
                                        const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'bottom-end',
                                            showConfirmButton: false,
                                            timer: 2000,
                                            timerProgressBar: true,
                                            color: '#FFFFFF',
                                            background: '#17A2B8',
                                            didOpen: (toast) => {
                                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                                            }
                                        })

                                        Toast.fire({
                                            icon: 'success',
                                            title: 'Sale registered'
                                        })
                                    }, 1000);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        }}>Comprar</Button>

                        <Button variant="contained" type="submit" onClick={() => {
                            // let FormEditCar = `<form>`
                            let FormEditCar = `
                            <table class="table-modal-car"">
                                <thead class="thead-edit-car">
                                    <tr class="tr-thead">
                                        <th class="" scope="col-4">Producto</th>
                                        <th class="" scope="col-3">Descripción</th>
                                        <th class="" scope="col-5">Barcode</th>
                                        <th class="" scope="col-2">Precio</th>
                                        <th class="" scope="col-1">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-edit-car">
                            `
                            JsonArticulos.forEach(articulo => {
                                console.log(articulo)
                                FormEditCar += `
                                        <tr class="tr-tbody">
                                            <td class="">${articulo.Descripcion}</th>
                                            <td class="">${articulo.Descripcion_Corta}</th>
                                            <td class="" id="BR_${articulo.Barcode}">${articulo.Barcode}</th>
                                            <td class="" id="PU_${articulo.Barcode}">${articulo.PrecioUnidad}</th>
                                            <td class="">
                                                <input id="CN_${articulo.Barcode}" value="${articulo.Cantidad}" class="inp-table-modal" type="number" />
                                            </th>
                                        </tr>
                                `

                                // FormEditCar += `
                                //     <div class="ForGroupModal">
                                //         <p class="nombre-articulo">${articulo.Descripcion}</p>
                                //         <p class="descripcion-articulo">${articulo.Descripcion_Corta}</p>
                                //         <p class="barcode-articulo" id="BR_${articulo.Barcode}">${articulo.Barcode}</p>
                                //         <p class="precio-articulo" id="PU_${articulo.Barcode}">${articulo.PrecioUnidad}</p>
                                //         <input type="text" id="CN_${articulo.Barcode}" value="${articulo.Cantidad}" placeholder="Cantidad" />
                                //     </div>
                                //     <hr>
                                // `
                                // FormEditCar += `
                                // `
                                // <input type="text" id="PU_${articulo.Barcode}" value="${articulo.PrecioUnidad}" placeholder="Precio" />
                            });
                            // FormEditCar += `
                            //     </form>
                            // `
                            FormEditCar += `
                                </tbody>
                            </table>
                            `

                            let NewJsonArticulo = []

                            Swal.fire({
                                title: 'Edit your car',
                                html: FormEditCar,
                                // inputAttributes: {
                                //     autocapitalize: 'off'
                                // },
                                showCancelButton: true,
                                confirmButtonText: 'Buy',
                                showLoaderOnConfirm: true,
                                preConfirm: (login) => {
                                    JsonArticulos.forEach(articulo => {
                                        let articuloJson = {
                                            Barcode: document.getElementById('BR_' + articulo.Barcode),
                                            Cantidad: document.getElementById('CN_' + articulo.Barcode),
                                            PrecioUnidad: document.getElementById('PU_' + articulo.Barcode)
                                        }

                                        NewJsonArticulo.push(articuloJson)
                                        console.log(NewJsonArticulo)

                                    });
                                },
                                allowOutsideClick: () => !Swal.isLoading()
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    const modalTimer = Swal.fire({
                                        title: 'Registering sale ',
                                        html: '',
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                        },
                                    })

                                    var data = JSON.stringify(JsonArticulos);

                                    var config = {
                                        method: 'post',
                                        url: 'http://localhost:8004/api/venta-aprobado',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        data: data
                                    };

                                    axios(config)
                                        .then(function (response) {
                                            console.log(response)
                                            setTimeout(() => {
                                                const Toast = Swal.mixin({
                                                    toast: true,
                                                    position: 'bottom-end',
                                                    showConfirmButton: false,
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                    color: '#FFFFFF',
                                                    background: '#17A2B8',
                                                    didOpen: (toast) => {
                                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                    }
                                                })

                                                Toast.fire({
                                                    icon: 'success',
                                                    title: 'Sale registered'
                                                })
                                            }, 1000);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                }
                            })


                        }}>Edit car</Button>
                    </Stack>
                </Container>

                <Container maxWidth="sm">
                    <Stack
                        sx={{ pt: 0 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
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
                                                    console.log(articulo)
                                                    let articuloJson = {
                                                        Barcode: articulo.cod_Barras,
                                                        Descripcion: articulo.descripcion,
                                                        Descripcion_Corta: articulo.descripcion_Corta,
                                                        Cantidad: CountProduct,
                                                        PrecioUnidad: articulo.precio_Venta
                                                    }

                                                    JsonArticulos.push(articuloJson)
                                                    console.log(JsonArticulos)

                                                    const Toast = Swal.mixin({
                                                        toast: true,
                                                        position: 'bottom-end',
                                                        showConfirmButton: false,
                                                        timer: 2000,
                                                        timerProgressBar: true,
                                                        color: '#FFFFFF',
                                                        background: '#17A2B8',
                                                        didOpen: (toast) => {
                                                            toast.addEventListener('mouseenter', Swal.stopTimer)
                                                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                        }
                                                    })

                                                    Toast.fire({
                                                        icon: 'success',
                                                        title: 'Product added'
                                                    })
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
                    </Stack>
                </Container>
            </Box>
        </>
    );
}


{/* <template id="my-template">
    <swal-title>
        Save changes to "Untitled 1" before closing?
    </swal-title>
    <swal-icon type="warning" color="red"></swal-icon>
    <swal-button type="confirm">
        Save As
    </swal-button>
    <swal-button type="cancel">
        Cancel
    </swal-button>
    <swal-button type="deny">
        Close without Saving
    </swal-button>
    <swal-param name="allowEscapeKey" value="false" />
    <swal-param
        name="customClass"
        value='{ "popup": "my-popup" }' />
    <swal-function-param
        name="didOpen"
        value="popup => console.log(popup)" />
</template> */}