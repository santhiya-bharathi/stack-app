import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { API_URL } from './App';

export function AnswerPage() {
  const history = useHistory();
  const { id } = useParams();


  const [qndet, setQndet] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/stackoverflow/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((mv) => setQndet(mv));
  }, [id]);

  return (
    <div>
      <p className="para-qn-style">{qndet.qn}</p>
      <p>ANSWER:   {qndet.answers}</p>
      <Button onClick={() => history.push("/")} variant="outlined"><KeyboardBackspaceIcon />Back</Button>
    </div>
  );
}
export function GiveAnswer() {
  const { id } = useParams();
  const [qndet, setQndet] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/stackoverflow/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((mv) => setQndet(mv));
  }, [id]);
  return qndet ? <GiveAnswertoQuestion qndet={qndet} /> : "";
}
function GiveAnswertoQuestion({ qndet }) {
  const history = useHistory();
  const [qn, setQn] = useState(qndet.qn);
  const [tag1, setTag1] = useState(qndet.tag1);
  const [tag2, setTag2] = useState(qndet.tag2);
  const [tag3, setTag3] = useState(qndet.tag3);
  const [answers, setAnswers] = useState(qndet.answers);

  const editAnswer = () => {

    const updatedAnswer = { qn, tag1, tag2, tag3, answers };
    console.log(updatedAnswer);


    fetch(`${API_URL}/stackoverflow/${qndet._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedAnswer),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => history.push("/"));
  };

  return (
    <div>
      <TextareaAutosize
        className="text-area"
        value={qn}
        onChange={(event) => setQn(event.target.value)}
        aria-label="empty textarea"
        placeholder="Type your question"
        style={{ width: 1500, height: 200 }} />
      <TextareaAutosize
        className="text-area"
        value={answers}
        onChange={(event) => setAnswers(event.target.value)}
        aria-label="empty textarea"
        placeholder="Type your known answer"
        style={{ width: 1500, height: 300 }} />

      <div class="ask-tag">
        <TextField value={tag1}
          onChange={(event) => setTag1(event.target.value)} label="enter tag" variant="outlined" />
        <TextField value={tag2}
          onChange={(event) => setTag2(event.target.value)} label="enter tag" variant="outlined" />
        <TextField value={tag3}
          onChange={(event) => setTag3(event.target.value)} label="enter tag" variant="outlined" />

      </div>
      <div className="saveanswer-button">
        <Button onClick={editAnswer} variant="contained">SaveAnswer</Button>
      </div>

    </div>
  );
}
