import React,{useEffect, useState,useContext} from 'react'
import { useParams,useNavigate } from 'react-router-dom';

//context
import GoalContext from '../context/goal/GoalContext'

// components
import EditButton from '../components/EditButton.jsx';



function EditGoal() {
 
  //pull the goal context 
  // create  2 useState vars for goalName and goalDescription
  // then load those vars into the form for the users to edit 
  // but before that we need to create a function in the goal context/backend that fetches a singular goal so that we canput that goal data into the goal varible in the goal context

  // context related things
  const {getGoal,goal,loading,updateGoal} = useContext(GoalContext);

//destructure for ease of use
  const {_id,goalName, goalDescription} = goal

  // do not want empty strings in the goals so these states will hold the edits be checked for empty strings then updated
  const [formData, SetFormData] = useState({})

  const {goalNameController, goalDescriptionController} = formData
  //btn will be disabled if any string is empty 

  const [btnDisabled, setBtnDisabled] = useState(false)
  
  //getting the goalId
  const {goalId} = useParams()

  const navigate = useNavigate();
  // gets the current goal and populates the form
  const retrieveAndPopulate =  async (id) => {
    await getGoal(id)
    SetFormData({...formData, goalNameController: goalName, goalDescriptionController: goalDescription})
  }

  useEffect(() => {
    retrieveAndPopulate(goalId)
    },[goalName])
  //cheks to see if any of the form fields are empty. If they are user cannot commit the edit  
  useEffect(() => {
    if(goalNameController && goalDescriptionController){
      if(goalNameController.trim().length === 0 || goalDescriptionController.trim().length === 0){
        setBtnDisabled(true)
      } else {
        setBtnDisabled(false)
      }
    }
     
  })

    

  const onChange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onClick = async () => {
    const updateData = {goalName: goalNameController, goalDescription: goalDescriptionController}
    await updateGoal(_id, updateData)
    navigate('/')
  }

  return ( 
  <div className=''>
    <h1 className='d-flex justify-content-center p-5'>Edit Goal</h1>
   
    <section className='form inputBox d-flex justify-content-center'>
      <form >
      <div className="form-group">
            <label htmlFor="goalname">Goal Name:</label>
            <input
              type="text"
              className="form-control"
              id="goalNameController"
              name="goalNameController"
              value={goalNameController || " "}
              onChange={onChange}
              placeholder="Please enter goal name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="goalDescription">Description:</label>
            <input
              type="text"
              className="form-control"
              id="goalDescriptionController"
              name="goalDescriptionController"
              value={goalDescriptionController || " "}
              onChange={onChange}
              placeholder="Please enter goal name"
              required
            />
      </div>
      </form>
      
    </section>
    <div className='d-flex justify-content-center text-center p-5'>
        <EditButton text={'Edit'} bootStrapClass={'btn btn-success btn-lg btn-block'} isDisabled={!btnDisabled ? false : true} onClick={onClick}></EditButton>
      </div>
      
    </div>
  )
 }

export default EditGoal