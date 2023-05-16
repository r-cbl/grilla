import React from 'react'
import Box from '@mui/material/Box';


export const Base = (props: any) => (
    <>
       <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {props.children}
        </Box>
    </>
)