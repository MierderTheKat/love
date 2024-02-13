import { useState } from "react";
import { Link } from "react-router-dom";

import { Container, Box, Typography, TextField, IconButton, Button } from "@mui/material";
import { Send, GitHub } from "@mui/icons-material";
const LovePage = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");

  const handleSubmit = () => {
    const text = "/" + text1 + "/" + text2 + "/" + text3 + "/" + text4 + "/" + text5;
    window.location.href = "https://mtk-love.onrender.com" + text;
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setText3("");
    setText4("");
    setText5("");
  };

  return (
    <Container
      sx={{
        padding: 3,
        userSelect: "none",
        height: "100vh",
        maxWidth: { xs: "100vw", sm: "75vw", lg: "50vw" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
              @keyframes floatHeart {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(100); }
                100% { transform: translate(-50%, -50%) scale(0); }
              }

              @keyframes bounce {
                0%,100%{ transform:translate(0); }
                25%{ transform:rotateX(20deg) translateY(2px) rotate(-3deg); }
                50%{ transform:translateY(-10px) rotate(3deg) scale(1.05);  }
              }

              @keyframes bounceSlow {
                0%, 100% { transform: translate(0); }
                25% { transform: rotateX(20deg) }
                50% { transform:  scale(1.1); }
              }

              @keyframes dislike {
                0%, 100% { transform: translate(0); }
                25% { transform: rotate(8deg) }
                50% { transform:  rotate(-8deg); }
              }
            `}</style>

      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" }, justifyContent: "space-between", gap: 2 }}>
            <BounceText text="Creado por Fran" />
            <IconButton component={Link} to="https://github.com/MierderTheKat" target="_blank" size="large">
              <GitHub fontSize="40px" />
            </IconButton>
          </Box>

          <TextField label="Texto 1" variant="outlined" fullWidth value={text1} onChange={(e) => setText1(e.target.value)} placeholder="mi amor!" />
          <TextField
            label="Texto 2"
            rows={2}
            multiline
            fullWidth
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Hemos compartido momentos mágicos y preciosos"
          />
          <TextField
            label="Texto 3"
            rows={2}
            multiline
            fullWidth
            value={text3}
            onChange={(e) => setText3(e.target.value)}
            placeholder="Y quiero seguir creando momentos especiales llenos de amor y felicidad a tu lado"
          />
          <TextField
            label="Texto 4"
            variant="outlined"
            fullWidth
            value={text4}
            onChange={(e) => setText4(e.target.value)}
            placeholder="¿Serías mi Valentin?"
          />
          <TextField
            label="Texto Final"
            variant="outlined"
            fullWidth
            value={text5}
            onChange={(e) => setText5(e.target.value)}
            placeholder="¡TE AMO!"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button onClick={handleSubmit} variant="contained" color="success" size="large" endIcon={<Send />} fullWidth>
            Enviar
          </Button>
          <Button onClick={handleClear} variant="contained" color="primary" size="large" fullWidth>
            Limpiar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const BounceText = (props) => {
  const { text = "text", bounceTime = 1, animation = true, variant = "h3", fontWeight = 700, textTransform = "uppercase", space = 20 } = props;
  let delayNumber = 0;

  const animeStyle = animation ? { animation: `bounce ${bounceTime}s infinite` } : {};

  return (
    <>
      <Typography align="center" variant={variant} fontWeight={fontWeight} textTransform={textTransform}>
        {text.split(" ").map((item, index) => (
          <span key={index} style={{ display: "inline-block", marginRight: space }}>
            {item.split("").map((word, i) => (
              <span
                key={i}
                className="span-text"
                style={{
                  display: "inline-block",
                  ...animeStyle,
                  animationDelay: `${delayNumber++ * 0.05}s`,
                }}
              >
                {word}
              </span>
            ))}
          </span>
        ))}
      </Typography>
    </>
  );
};

export default LovePage;
