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
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


export default function Grilla() {

    const [provincias, setProvincia] = useState<Array<Provincia>>([])
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = React.useState(false);
    const [provinciaModificar, setProvinciaAModificar] = useState<Provincia>(new Provincia());
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState<string>("");

    const getProvincias = function(){
        ProvinciaService.getProvincias()
            .then(setProvincia)
            .catch((e) => { console.error(e) })
            .finally(() => { setLoading(false) })
    }
    useEffect(() => {
        getProvincias()
    }, [loading])

    if (loading) {
        return <Loading />
    }
    const eliminarProvincia =  function(provincia:Provincia){

        ProvinciaService.deleteProvincia(provincia.id)
            .then(() => {
                setmessage("Se eliminó con éxito")
                setOpen(true)
                getProvincias()
            })
            .catch((e) => { console.error(e) })
    }
    const modificarProvincia =  function(provincia:Provincia){

        ProvinciaService.putProvincia(provincia.id,provincia.nombre)
            .then(() => {
                handleClose()
                setmessage("Se modificó con éxito")
                setOpen(true)
                getProvincias()
            })
            .catch((e) => { console.error(e) })
    }
    const handleCloseSnackBar = () => {
        setOpen(false);
    };

    const handleClickOpen = (provincia: Provincia) => {
        setProvinciaAModificar(provincia)
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <><TableContainer component={Paper} sx={{width: '60%', margin: '0 auto'}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="right">Editar</TableCell>
                        <TableCell align="right">Borrar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {provincias.map((provincia) => <TableRow
                            key={provincia.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {provincia.id}
                            </TableCell>
                            <TableCell align="center"> {provincia.nombre}</TableCell>
                            <TableCell align="right">
                                <Button
                                    onClick={() => {
                                        handleClickOpen(provincia);
                                    }}
                                    className="btn btn-lg btn-outline-danger ml-4">
                                    <EditIcon/>
                                </Button>


                            </TableCell>
                            <TableCell align="right">
                                <button
                                    onClick={() => {
                                        eliminarProvincia(provincia);
                                    }}
                                    className="btn btn-lg btn-outline-danger ml-4">
                                    <DeleteIcon/>
                                </button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Cambiar nombre provincia</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nuevo nombre"
                        type="Buenos Aires"
                        fullWidth
                        value={provinciaModificar.nombre}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setProvinciaAModificar(new Provincia(provinciaModificar.id,event.target.value));
                        }}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        modificarProvincia(provinciaModificar)
                    }} color="primary">
                        Modificar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message={message}
                onClose={handleCloseSnackBar}
                action={action}
            />
        </>
    );
}