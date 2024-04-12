import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@mui/material";
import Divider from "@mui/material/Divider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function fakeAIGen(name) {
  let recipe;
  let ingredients = [];
  let instructions = [];
  let result = "";

  switch (name.toLowerCase()) {
    case "pizza":
      ingredients = ["Dough", "Tomato Sauce", "Cheese", "Toppings"];
      instructions = ["Preheat oven to 475°F (245°C).", "Spread dough onto a pizza pan...", "Bake in preheated oven until the crust is golden brown and the cheese is melted...", "Enjoy!"];
      recipe = {name: "Pizza", ingredients, instructions};
      break;
    case "pasta":
      recipe = {name: "Pasta", ingredients, instructions};
      break;
    case "burger":
      recipe = {name: "Burger", ingredients, instructions};
      break;
    case "pancakes":
      recipe = {name: "Pancakes", ingredients, instructions};
      break;
    default:
      recipe = {name: "Recipe not found", ingredients: [], instructions: []};
  }

  if (recipe.name !== "Recipe not found") {
    result += "RECIPE\n";
    result += "Name: " + recipe.name + "\n";

    result += "\nINGREDIENTS\n";
    recipe.ingredients.forEach((ingredient, index) => {
      result += index + 1 + ": " + ingredient + "\n";
    });

    result += "\nINSTRUCTIONS\n";
    recipe.instructions.forEach((instruction, index) => {
      result += index + 1 + ": " + instruction + "\n";
    });
  } else {
    result = "Recipe not found";
  }

  console.log(result)
  return result;
}

export default function AI({setValue}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResult('')
    // setIsFinsh(false)
  }
  const [searchKey, setSearchKey] = useState("")


  const [input, setInput] = useState(`RECIPE
Name: Pizza

INGREDIENTS
1: Dough
2: Tomato Sauce
3: Cheese
4: Toppings

INSTRUCTIONS
1: Preheat oven to 475°F (245°C).
2: Spread dough onto a pizza pan...
3: Bake in preheated oven until the crust is golden brown and the cheese is melted...
4: Enjoy!`);
  const [result, setResult] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
    setInput(`  ` + fakeAIGen(e.target.value));
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>AI Prompt</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            AI prompt ( Recipe )
          </Typography>
          {/*<TextField*/}
          {/*  margin="normal"*/}
          {/*  required*/}
          {/*  fullWidth*/}
          {/*  label="Recipe Name"*/}
          {/*  autoFocus*/}
          {/*  value={searchKey}*/}
          {/*  onChange={e => {*/}
          {/*    setSearchKey(e.target.value)*/}

          {/*  }}*/}
          {/*/>*/}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Recipe Name"
            autoFocus
            value={searchKey}
            onChange={handleSearchKeyChange}
            placeholder="Enter a recipe name"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => {
              if (!isTyping) {
                setIsTyping(true);
                let i = 0;
                setResult('');

                (function typeWriter() {
                  if (i < input.length) {
                    setResult((prevContent) => prevContent + input[i]);
                    i++;
                    setTimeout(typeWriter, 50);
                  } else {
                    setIsTyping(false);
                  }
                })();
              }
            }}
            disabled={isTyping}
          >
            Enter
          </Button>
          {/*<Button*/}
          {/*  type="submit"*/}
          {/*  fullWidth*/}
          {/*  variant="contained"*/}
          {/*  onClick={() => {*/}
          {/*    if (!isTyping) {*/}
          {/*      setInput(fakeAIGen(searchKey))*/}

          {/*      setIsTyping(true);*/}
          {/*      let i = 0;*/}
          {/*      setResult('');*/}

          {/*      (function typeWriter() {*/}
          {/*        if (i < input.length) {*/}
          {/*          setResult((prevContent) => prevContent + input[i]);*/}
          {/*          i++;*/}
          {/*          setTimeout(typeWriter, 50);*/}
          {/*        } else {*/}
          {/*          setIsTyping(false);*/}
          {/*        }*/}
          {/*      })();*/}
          {/*    }*/}
          {/*  }}*/}

          {/*  disabled={isTyping}*/}
          {/*>*/}
          {/*  Enter*/}
          {/*</Button>*/}
          <Divider sx={{mt: 3, mb: 5}}/>


          <TextField
            margin="normal"
            fullWidth
            label="Recipe Result"
            minRows={5}
            maxRows={20}
            multiline={true}
            value={result}
            sx={{mt: 2, mb: 5}}
            // disabled={true}
          />
          {result && !isTyping && <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => {
              const lines = result.split('\n'); // Split the result into lines
              const formattedLines = lines.map(line => `<p>${line}</p>`); // Add <p> and </p> to each line
              const formattedResult = formattedLines.join('\n'); // Join the lines back together
              setValue(formattedResult); // Set the value
              setOpen(false)
              setResult('')
            }}

          >
            Use Result
          </Button>}
          {/*</>}*/}
        </Box>
      </Modal>
    </div>
  );
}