// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react/prop-types
export default function MediaCard({ name, time, image }) {
  return (
    <Card sx={{ width: "70%" }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <h2>{name}</h2>
        <Typography variant="h2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
