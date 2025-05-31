"use client";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "./Hook/hook";
import { fetchCharacters } from "./features/characters/charactersSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { characters, loading, error } = useAppSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  if (loading) {
    return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;  
  }
  
  return (

    <Grid sx={{ padding: "40px", maxWidth: "1600px", margin: "0 auto" }}>
    <Typography
      sx={{
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "20px",
        fontSize: "25px",
      }}
    >
      The Rick and Morty
    </Typography>
    <Grid
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}
    >
      {characters.map((item: any) => (
          <Paper
          key={item.id} 
            sx={{
              margin: "20px",
              width: 240,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#dcdcdc",
            }}
          >
            <Avatar
              sx={{ width: 200, height: 200}}
              src={item.image}
              alt={item.name}
            />
            <Typography sx={{ textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
              {item.name}
            </Typography>
          </Paper>
      ))}
    </Grid>
  </Grid>
  );
}
