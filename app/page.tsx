"use client";
import { Grid, Typography } from "@mui/material";
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;  
  }
  
  return (
    <Grid>
      <Typography sx={{ textAlign: "center" }}>The Rick and Morty</Typography>
      <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((item: any) => (

            <Grid key={item.id} sx={{ padding: "20px" }}>
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
              />
              <Typography>{item.name}</Typography>
            </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
