import axios from 'axios'
import { useEffect, useState } from 'react';
import './style.css';

function App() {

  const [data, setData] = useState();
  const [newComment, setNewComment] = useState({name: '', text: '', img: ''})
  const [changeComment, setChangeComment] = useState({name: '', text: '', img: ''})
  const [changeId, setChangeId] = useState(null);

  const getApi = () => {
    axios.get('http://localhost:5000/comments')
    .then(({data}) => setData(data))
    .catch((error) => console.log(error))
  }

  const postApi = (newCom) => {
    axios.post('http://localhost:5000/comments', newCom)
    .then(() =>{
      getApi()
      setNewComment({name: '', text: ''})
    })
    .catch((error) => console.log(error))
  }

  const deleteApi = (id) => {
    axios.delete(`http://localhost:5000/comments/${id}`)
    .then(() => getApi())
    .catch((error) => console.log(error))
  }

  const patchApi = (id, changeComment) => {
    axios.patch(`http://localhost:5000/comments/${id}`, changeComment)
    .then(() => {getApi()})
    .catch((error) => console.log(error));
  } 

  useEffect(() => {
    getApi();
  }, [])

  return (
    <div className='container'>
      <h1>Коментарии</h1>
      {
        data && 
        data.map((comments) => (
          <div key={comments.id}>
            {changeId === comments.id ? (
              <div className='inputs'>
                <input 
                  type="text" 
                  value={changeComment.name} 
                  onChange={(e) => setChangeComment({...changeComment, name: e.target.value})} 
                />

                <input 
                  type="text" 
                  value={changeComment.text} 
                  onChange={(e) => setChangeComment({...changeComment, text: e.target.value})} 
                />
                <input 
                  type="text" 
                  value={changeComment.img} 
                  onChange={(e) => setChangeComment({...changeComment, img: e.target.value})} 
                />
                <button onClick={() => {
                  patchApi(comments.id, changeComment)
                  setChangeId(null)
                  }}>Access</button>
                <button onClick={() => setChangeId(null)}>Cancel</button>
              </div>
            ) : (
              <div className='container-comment'>
                <div className='item'>
                  <div>
                    <h2>{comments.name}</h2>
                    <p>{comments.text}</p>
                  </div>
                  <img width={300} src={comments.img} alt="" />
                </div>

                <div>
                  <button onClick={() => {
                    setChangeId(comments.id)
                    setChangeComment({name: comments.name, text: comments.text, img: comments.img})
                    }}>Change text</button>
                  <button onClick={() => deleteApi(comments.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))
      }
      <input 
        type="text" 
        value={newComment.name} 
        onChange={(e) => setNewComment({...newComment, name: e.target.value})} 
      />

      <input 
        type="text" 
        value={newComment.text} 
        onChange={(e) => setNewComment({...newComment, text: e.target.value})} 
      />

      <input 
        type="text" 
        value={newComment.img} 
        onChange={(e) => setNewComment({...newComment, img: e.target.value})} 
      />
      <button onClick={() => {postApi(newComment)}}>Send comment</button>
    </div>
  );
}

export default App;
