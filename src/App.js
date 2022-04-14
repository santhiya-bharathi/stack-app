import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useHistory } from "react-router-dom";
import {useState, useEffect} from "react";

import { Switch, Route} from "react-router-dom";
import { QueryList, AskQuestion } from './AskQuestion';
import { GiveAnswer, AnswerPage } from './AnswerPage';



export const API_URL = "https://stackoverflow-node-app.herokuapp.com";

export default function App() {

  const history = useHistory();
  const [mode, setMode] = useState("dark");
const darkTheme = createTheme({
  palette: {
    mode: mode,
  },
});


const [querys, setQuerys] = useState([]);
console.log(querys);

useEffect(()=>{
  fetch(`${API_URL}/stackoverflow`, {method:"GET"})
  .then((data)=>data.json())
  .then((mvs)=>setQuerys(mvs));
}, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={3} style={{borderRadius:"0px",minHeight:"100vh"}}>
    <div className="App">
    <AppBar position="static">
       <Toolbar>
         <Button varient="text" color="inherit" onClick={()=>history.push("/")}>stack overflow</Button>
     
      
       <Button varient="text" color="inherit" style={{marginLeft:"auto" ,marginRight: "0px"}} onClick={()=>setMode(mode==="light"? "dark":"light")}> {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} {mode==="light"? "Dark":"Light"}Mode</Button>
       </Toolbar>
       </AppBar>

       <Switch>
      <Route exact path="/">
          <QueryList />
        </Route>

        <Route path="/askquestion/edit/:id">
          <GiveAnswer />
        </Route>

        <Route path="/askquestion/:id">
          <AnswerPage />
        </Route>

        <Route path="/askquestion">
          <AskQuestion />
        </Route>

        </Switch>

    </div>
    </Paper>
    </ThemeProvider>
  );
}



export function Footer(){
  return(
    <div className='copyright1'>
      <h2 className='copyright'>Stackoverflow | © copyright</h2>
    </div>
  );
}