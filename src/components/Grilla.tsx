import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Provincia} from "../resources/domain/Provincia";
import {useEffect, useState} from "react";
import {ProvinciaService} from "../resources/services/ProvinciaService";
import {Loading} from "./Loading";
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


export default function Grilla() {

    const [provincias, setProvincia] = useState<Array<Provincia>>([])
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = React.useState(false);
    const [elementoNombre, setElementoNombre] = useState('');
    let indiceAModificar: Number = -1;

    useEffect(() => {
        ProvinciaService.getProvincias()
            .then(setProvincia)
            .catch((e) => { console.error(e) })
            .finally(() => { setLoading(false) })
    }, [loading])

    if (loading) {
        return <Loading />
    }

    const handleClickOpen = (id: Number) => {
        indiceAModificar = id;
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };


    return (
        <TableContainer component={Paper} sx={{width:'60%', margin: '0 auto'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Borrar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { provincias.map( (provincia)  =>
                    <TableRow
                        key={provincia.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {provincia.id}
                    </TableCell>
                    <TableCell align="center"> {provincia.nombre}</TableCell>
                    <TableCell align="right">
                        <Button
                            onClick={ () => { handleClickOpen (provincia.id) }}
                            className="btn btn-lg btn-outline-danger ml-4">
                            <EditIcon />
                        </Button>


                    </TableCell>
                    <TableCell align="right">
                        <button
                        onClick={() => {
                            ProvinciaService.deleteProvincia(provincia.id)
                            setLoading(estado => !estado)
                        }}
                        className="btn btn-lg btn-outline-danger ml-4">
                            <DeleteIcon />
                        </button>
                    </TableCell>
                    </TableRow>
                ) }
                </TableBody>
            </Table>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle >Cambiar nombre provincia </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nuevo nombre"
                        type="Buenos Aires"
                        fullWidth
                        value={elementoNombre}
                        onChange={e => {
                            setElementoNombre(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={ () => {
                        ProvinciaService.putProvincia(indiceAModificar, elementoNombre);
                        handleClose()
                    }
                    } color="primary">
                        Modificar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}