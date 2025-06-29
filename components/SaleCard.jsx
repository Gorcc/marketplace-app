"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post }) {
  const postName = post.post_username.charAt(0).toUpperCase();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <a href={`/product/${post.post_id}`}>
      <Card className="sale-card" sx={{ width: 400 }}>
        <CardHeader
          className="card-header"
          avatar={
            <Avatar
              className="post-avatar"
              sx={{ bgcolor: blue[500] }}
              aria-label="recipe"
            >
              {postName}
            </Avatar>
          }
          title={post.post_title}
          subheader={post.created_at}
        />
        <CardMedia
          component="img"
          height="194"
          className="salecard-image"
          image={post.img_url}
          alt="Post Image"
        />
        <CardContent className="card-descb">
          <Typography
            variant="body2"
            color="text.secondary"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {post.post_descb}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="card-extras">
          <p className="font-bold">{post.tags}</p>
          <div className="post-seller">
            <h1 className="font-bold">{post.post_username}</h1>

            <h1 className="font-bold">{post.price}₺</h1>
          </div>
        </CardActions>
      </Card>
    </a>
  );
}
