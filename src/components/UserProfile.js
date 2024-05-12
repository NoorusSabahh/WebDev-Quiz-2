import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../redux/app.reducer";


const UserProfile = () => {
    const token = useSelector((state) => state.user.token);
    const profile = useSelector((state) => state.app.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "https://sandbox.practical.me/api/user/profile",
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("hiii")
            dispatch(setProfile(response.data));

        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <Grid container xs={10} component={Paper} elevation={3} align="center">
                {profile && profile.data && (
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">First Name</TableCell>
                                    <TableCell>{profile.data.first_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Surname</TableCell>
                                    <TableCell>{profile.data.sur_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Email</TableCell>
                                    <TableCell>{profile.data.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Phone</TableCell>
                                    <TableCell>{profile.data.phone}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                
            </Grid>
        </Box>

    );
};

export default UserProfile;
