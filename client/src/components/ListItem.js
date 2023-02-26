import { useState } from "react";
import Progress from "./Progress";
import Modal from "./Modal";

function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li className="list-item">

      <div className="info-container">
        <p className="task-title">{task.title}</p>
        <Progress progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={() => deleteItem()}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
    </li>
  )
}

export default ListItem
