import { useState, useEffect, Fragment } from "react";
import { Container, Box, Typography, SpeedDial, Button } from "@mui/material";
import { ChevronLeft, ChevronRight, Favorite, ThumbDown } from "@mui/icons-material";

const LovePage = () => {
  const [step, setStep] = useState(0);
  const [beat, setBeat] = useState(false);
  const [transitionOut, setTransitionOut] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const [yesSize, setYesSize] = useState(40);
  const [noSize, setNoSize] = useState(40);

  const finish = step !== 4;

  const handleNext = () => {
    if (!transitionOut) {
      setTransitionOut(true);
      setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
        setTransitionOut(false);
      }, 500);
    }
  };

  const handleBack = () => {
    setTransitionOut(true);
    setTimeout(() => {
      setYesSize(40);
      setNoSize(40);
      setStep((prevStep) => prevStep - 1);
      setTransitionOut(false);
    }, 500);
  };

  const handleReset = () => {
    setShowFloatingHeart(true);
    setTransitionOut(false);
    setYesSize(40);
    setNoSize(40);
    setTimeout(() => {
      setStep(0);
    }, 1000);

    setTimeout(() => {
      setShowFloatingHeart(false);
    }, 2000);
  };

  const handleNO = () => {
    setYesSize((prevStep) => prevStep + 15);
    setNoSize((prevStep) => prevStep - 5);
  };

  const handleYES = () => {
    setShowFloatingHeart(true);
    setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
      setYesSize(40);
    }, 1000);

    setTimeout(() => {
      setShowFloatingHeart(false);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => setBeat((prevBeat) => !prevBeat), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ paddingX: 3, userSelect: "none" }}>
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
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: transitionOut ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {finish ? (
          <Fragment>
            {step === 0 && <BounceText text="¡Hola mi amor!" />}
            {step === 1 && <BounceHoverText text="Hemos compartido momentos mágicos y preciosos" />}
            {step === 2 && <BounceHoverText text="Y quiero seguir creando momentos especiales llenos de amor y felicidad a tu lado" />}
            {step === 3 && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <BounceHoverText text="¿Serías mi Valentin?" />
                <Box sx={{ width: { xs: 0 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Box
                    sx={{
                      marginTop: 3,
                      display: "flex",
                      width: { xs: 0, sm: "1000px" },
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                    }}
                  >
                    {noSize + 8 > 0 ? (
                      <Button
                        variant="outlined"
                        color="warning"
                        size="large"
                        onClick={handleNO}
                        sx={{
                          minWidth: 0,
                          paddingX: noSize >= 20 ? "21px" : noSize >= 10 ? 2 : noSize > 0 ? 1 : "4px",
                          "&:hover": { animation: "bounce .2s" },
                        }}
                        endIcon={
                          noSize > 0 ? (
                            <ThumbDown sx={{ color: "#000", fontSize: noSize + "px !important", animation: "dislike 1s infinite" }} />
                          ) : (
                            <></>
                          )
                        }
                      >
                        <Typography align="center" variant="h3" fontWeight={600} fontSize={noSize + 8}>
                          ¡NO!
                        </Typography>
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="outlined"
                      color="success"
                      size="large"
                      onClick={handleYES}
                      sx={{ transition: "all 0.3s ease-in-out", "&:hover": { animation: "bounce .2s" } }}
                      endIcon={
                        <Favorite
                          sx={{
                            color: "#ff0000",
                            fontSize: yesSize + "px !important",
                            transition: "all 0.3s ease-in-out",
                            animation: "bounceSlow .5s infinite",
                          }}
                        />
                      }
                    >
                      <Typography align="center" variant="h3" fontWeight={600} fontSize={yesSize + 8} sx={{ transition: "all 0.3s ease-in-out" }}>
                        ¡SIII!
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <BounceText text="¡TE AMO!" variant="h1" fontWeight={800} space={25} />
          </Fragment>
        )}
      </Box>

      {/* Avanzar y retroceder */}
      {finish ? (
        <Box>
          <SpeedDial
            ariaLabel="Retroceder"
            hidden={step === 0}
            sx={{ position: "absolute", bottom: 24, left: 24 }}
            onClick={handleBack}
            icon={<ChevronLeft />}
          />
          <SpeedDial
            ariaLabel="Avanzar"
            hidden={step === 3}
            sx={{ position: "absolute", bottom: 24, right: 24 }}
            onClick={step < 3 ? handleNext : () => {}}
            icon={<ChevronRight />}
          />
        </Box>
      ) : (
        <SpeedDial
          ariaLabel="Reset"
          sx={{
            position: "absolute",
            bottom: 24,
            right: 0,
            left: 0,
            "& .MuiButtonBase-root": { backgroundColor: "white", height: 100, width: 100 },
            "&:hover": { animation: "bounce .5s infinite" },
          }}
          onClick={handleReset}
          icon={
            <Favorite
              sx={{
                fontSize: beat ? "5rem" : "2.5rem",
                color: beat ? "#ff0000" : "inherit",
                transition: "all 0.2s ease-in-out",
              }}
            />
          }
        />
      )}

      {showFloatingHeart && (
        <div
          style={{
            animation: "floatHeart 2s ease-in-out",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Favorite
            sx={{
              fontSize: "5rem",
              color: "#ff0000",
              transition: "all 2s ease-in-out",
            }}
          />
        </div>
      )}
    </Container>
  );
};

const BounceText = (props) => {
  const { text = "text", bounceTime = 1, variant = "h2", fontWeight = 700, textTransform = "uppercase", space = 20 } = props;
  let delayNumber = 0;

  return (
    <>
      <Typography align="center" variant={variant} fontWeight={fontWeight} textTransform={textTransform}>
        {text.split(" ").map((item, index) => (
          <span key={index} style={{ display: "inline-block", marginRight: space }}>
            {item.split("").map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `bounce ${bounceTime}s infinite`,
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

const BounceHoverText = (props) => {
  const { text = "text", variant = "h3", fontWeight = 600, space = 16 } = props;

  return (
    <>
      <Typography align="center" variant={variant} fontWeight={fontWeight}>
        {text.split(" ").map((item, index) => (
          <span key={index} style={{ display: "inline-block", marginRight: space }}>
            {item.split("").map((word, i) => (
              <Box key={i} sx={{ display: "inline-block", "&:hover": { animation: "bounce .2s" }, cursor: { xs: "", md: "pointer" } }}>
                {word}
              </Box>
            ))}
          </span>
        ))}
      </Typography>
    </>
  );
};

export default LovePage;

{
  /* <IconButton>
        <Box height={32} width={32} display="flex" alignItems="center" justifyContent="center">
          <Favorite
            sx={{
              fontSize: beat ? "2rem" : "1.5rem",
              color: beat ? "#ff0000" : "inherit",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Box>
      </IconButton> */
}
