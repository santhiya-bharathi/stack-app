import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL, Footer } from './App';

export function AskQuestion() {
  const history = useHistory();

  const [qn, setQn] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [answers, setAnswers] = useState("");


  const addQn = () => {
    const newques = { qn, tag1, tag2, tag3, answers };
    console.log(newques);

    fetch(`${API_URL}/stackoverflow`, {
      method: "POST",
      body: JSON.stringify(newques),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => history.push("/"));

  };

  return (
    <div>
      <h2 className="head-qn">Ask a public question</h2>
      <TextareaAutosize
        className="text-area"
        value={qn}
        onChange={(event) => setQn(event.target.value)}
        aria-label="empty textarea"
        placeholder="Type your question"
        style={{ width: 1000, height: 300 }} />
      <div class="ask-tag">
        <TextField value={tag1}
          onChange={(event) => setTag1(event.target.value)} label="enter tag" variant="outlined" />
        <TextField value={tag2}
          onChange={(event) => setTag2(event.target.value)} label="enter tag" variant="outlined" />
        <TextField value={tag3}
          onChange={(event) => setTag3(event.target.value)} label="enter tag" variant="outlined" />

      </div>

      <TextareaAutosize
        className="text-area"
        value={answers}
        onChange={(event) => setAnswers(event.target.value)}
        aria-label="empty textarea"
        placeholder="Type your known answer"
        style={{ width: 1000, height: 300 }} />

      <Button style={{ display: 'flex', margin: 20 }} variant="outlined" color="inherit" onClick={addQn}>Post Questions</Button>
    </div>
  );
}
export function QueryList() {
  const history = useHistory();
  const [querys, setQuerys] = useState([]);
  console.log(querys);

  useEffect(() => {
    fetch(`${API_URL}/stackoverflow`, { method: "GET" })
      .then((data) => data.json())
      .then((mvs) => setQuerys(mvs));
  }, []);
  return (
    <section>
      <div className="home">
        <h2 className="">Top Questions</h2>
        <Button variant="outlined" color="inherit" onClick={() => history.push("/askquestion")}>Ask Questions</Button>
      </div>
      {querys.map(({ qn, tag1, tag2, tag3, id, _id }, index) => (
        <QuestionPage key={_id} qn={qn} tag1={tag1} tag2={tag2} tag3={tag3} id={_id}
          editButton={<IconButton
            style={{ marginLeft: "auto" }}
            aria-label="edit" color="success"
            onClick={() => history.push("/askquestion/edit/" + _id)}>
            <EditIcon />
          </IconButton>} />
      ))}
      <Footer />
    </section>
  );
}
function QuestionPage({ qn, tag1, tag2, tag3, id, editButton }) {
  const history = useHistory();
  const [vote, setVote] = useState(1);
  return (
    <div className="qn-tag">
      <div className="qn-tag-1">
        <div className="votes-views" style={{ marginRight: "auto" }}>
          <div className="votes" onClick={() => setVote(vote + 1)}>
            <p>{vote}</p>
            <p>votes</p>
          </div>
          <div className="votes">
            <p>0</p>
            <p>answer</p>
          </div>
          <div className="votes">
            <p>6</p>
            <p>views</p>
          </div>
        </div>
        <div style={{ marginCenter: "auto" }}>
          <p className="para-qn-style">{qn}</p>
          <div className="tag-but">
            <Button variant="contained" color="primary" disabled>{tag1}</Button>
            <Button variant="contained" color="primary" disabled>{tag2}</Button>
            <Button variant="contained" color="primary" disabled>{tag3}</Button>
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Button variant="contained" color="primary" onClick={() => {
            console.log(id);
            history.push("/askquestion/" + id);
          }}>View Answer</Button>
          {editButton}
        </div>
      </div>
    </div>
  );
}
