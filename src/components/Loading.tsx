import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'

export const Loading = () => (
    <ListItem style={{ display: 'flex', justifyContent: 'center' }} >
        <Box>
            <CircularProgress />
        </Box>
    </ListItem>
)