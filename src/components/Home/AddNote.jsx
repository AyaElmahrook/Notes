import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function AddNote({getUserNotes}) {
  let token=localStorage.getItem("token");
  let decodedToken=jwtDecode(token);
  const [note, setNote] = useState({ "title": "", "desc": "", "userID": decodedToken._id, token });
  function noteData({ target }) {
    setNote({ ...note, [target.name]: target.value})
  }
  async function addNote(e) {
    e.preventDefault();
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/addNote', note);
    if(data.message === "success")
    {
      /* Close add modal */
      document.getElementById("addNewNote").classList.remove("show");
      document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
      /* Reset modal inputs */
      document.getElementById('frmAddNote').reset();
      /* view the new added note */
      getUserNotes();
    }
    else
    {
      console.log(data);
    }
  }
    
  return (
    <>
      {/* Add button */}
      <button type="button" className="add p-2 btn mt-3 position-fixed top-25" data-bs-toggle="modal" data-bs-target="#addNewNote">
      Add Note <i className="fas fa-plus-circle px-1"></i>
      </button>
      {/* Add model */}
      <div className="modal fade" id="addNewNote" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <form onSubmit={addNote} id="frmAddNote">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">             
                <div className="row">
                  <div className="col-12">
                    <input placeholder="Type Title" onChange={noteData} name="title" className="form-control" type="text" />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control my-2" onChange={noteData} name="desc" placeholder="Type your note" id="txtDesc" cols="30" rows="10"></textarea>
                  </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}
