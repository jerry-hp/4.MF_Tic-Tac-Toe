import { useState } from "react";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import j from "./assets/1.png";

interface BtnProps {
  value: string;
  handleBtnValue: any;
}

function Btn({ value, handleBtnValue }: BtnProps) {
  return (
    <Button onClick={handleBtnValue} w="100px" h="100px" variant="unstyled" bg="#415a77" borderRadius="none" border="1px solid #778da9" display="inline-block" fontSize="4xl" _hover={{ backgroundColor: "#0d1b2a" }}>
      {value}
    </Button>
  );
}

export default function App() {
  const [player, setPlayer] = useState(true);
  const [btnValue, setBtnValue] = useState(Array(9).fill(""));
  console.log(btnValue);

  const handleBtnValue = (e: number) => {
    if (btnValue[e] || calculateWinner(btnValue)) return;
    const newBtnValue = [...btnValue];
    if (player) {
      newBtnValue[e] = "✖";
      setPlayer(false);
    } else {
      newBtnValue[e] = "⭕";
      setPlayer(true);
    }
    setBtnValue(newBtnValue);
  };

  const winner = calculateWinner(btnValue);
  function restart() {
    const restart = [...btnValue];
    restart.fill("");
    setBtnValue(restart);
  }

  return (
    <>
      <Box w="100%" bg="#1b263b" minH="150vh" boxSizing="border-box">
        <Heading textAlign="center" size="2xl" color="#1b263b" textShadow="0 0 2px #1b263b,0 0 4px #e0e1dd" fontStyle="italic" p="2rem 0" mb="1rem">
          TIC-TAC-TOE
        </Heading>
        {winner ? (
          <Heading color="#e0e1dd" display="flex" justifyContent="center" alignItems="center">
            player {winner} wins!
            <Image src="https://i.gifer.com/origin/f9/f9abd21a7f2be6472c1852518c8e605b_w200.webp" w="50px" />
          </Heading>
        ) : btnValue.every((value) => value !== "") ? (
          <Heading textAlign="center" color="#e0e1dd">
            Draw!
          </Heading>
        ) : (
          <Heading textAlign="center" color="#e0e1dd">
            Player {player ? "✖" : "⭕"} turns!
          </Heading>
        )}
        <Box maxW="305px" display="flex" flexWrap="wrap" m="0 auto" mt="10px">
          <Btn value={btnValue[0]} handleBtnValue={() => handleBtnValue(0)} />
          <Btn value={btnValue[1]} handleBtnValue={() => handleBtnValue(1)} />
          <Btn value={btnValue[2]} handleBtnValue={() => handleBtnValue(2)} />
          <Btn value={btnValue[3]} handleBtnValue={() => handleBtnValue(3)} />
          <Btn value={btnValue[4]} handleBtnValue={() => handleBtnValue(4)} />
          <Btn value={btnValue[5]} handleBtnValue={() => handleBtnValue(5)} />
          <Btn value={btnValue[6]} handleBtnValue={() => handleBtnValue(6)} />
          <Btn value={btnValue[7]} handleBtnValue={() => handleBtnValue(7)} />
          <Btn value={btnValue[8]} handleBtnValue={() => handleBtnValue(8)} />
        </Box>
        <Box display="flex" justifyContent="center" mt="1rem">
          {winner || btnValue.every((value) => value !== "") ? (
            <Button onClick={restart} variant="unstyled" color="#e0e1dd" bg="#001d3d" p="0 10px" _hover={{ backgroundColor: "teal" }} border="1px solid #778da9">
              Play Again
            </Button>
          ) : (
            ""
          )}
        </Box>
        <Image src="https://i.gifer.com/origin/73/732699ab07a8d8c5b8387bf85b5a5ef9_w200.webp" w="50px" position="fixed" bottom="50px" left="60px" />
        <Box
          display="flex"
          alignItems="center"
          gap="10px"
          w="max-content"
          style={{
            background: "rgba(224, 225, 221, 0.1)",
            padding: "5px 15px",
            borderRadius: "10px",
          }}
          transition=".5s ease-in-out"
          position="fixed"
          bottom="20px"
          left="20px"
          _hover={{ transform: "scale(1.1) rotatex(360deg)" }}
          cursor="pointer"
        >
          <Box bg="#1b263b" w="15px" h="15px" borderRadius="50%" position="absolute" right="-2px"></Box>
          <Box bg="#1b263b" w="15px" h="15px" borderRadius="50%" position="absolute" left="-2px"></Box>
          <Image src={j} w="20px" borderRadius="50%" />
          <Text color="#e0e1dd">©Jerry Hutari Putra</Text>
        </Box>
      </Box>
    </>
  );
}

function calculateWinner(btnValue: any) {
  // Daftar baris, kolom, dan diagonal yang dapat memenangkan permainan
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (btnValue[a] && btnValue[a] === btnValue[b] && btnValue[a] === btnValue[c]) {
      return btnValue[a];
    }
  }

  return "";
}
